import { useRef, useEffect, useState } from "react";
import { QuizQuestion } from "../models/QuizQuestion";
import { QuizAnswer } from "../models/QuizAnswer";
import { decode } from "he";
import { QuestionCard } from "./QuestionCard";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import PuffLoader from "react-spinners/PuffLoader";
import { Score } from "../types/Score";
import { QuizResponseDto } from "../types/QuizResponseDto";
import Confetti from "react-confetti";

export default function Quiz(props: QuizProps) {
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [answersSubmitted, setAnswersSubmitted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: QuizAnswer;
  }>({});
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [score, setScore] = useState<Score>({
    totalQuestions: 0,
    correctAnswers: 0,
    percentage: 0,
  });

  const {
    current: [width, height],
  } = useRef([window.innerWidth, window.innerHeight]);
  const questionsPerPage = 1;
  const hasPreviousPage = currentPage === 0;
  const hasNextPage =
    currentPage === Math.ceil(quizQuestions.length / questionsPerPage) - 1;

  useEffect(() => {
    let isCancelled = false;
    setQuizFromApi(isCancelled);
    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Object.keys(selectedAnswers).length === quizQuestions.length) {
      setAllQuestionsAnswered(true);
    } else {
      setAllQuestionsAnswered(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAnswers, quizQuestions]);

  function handleQuestionCardChange(answer: QuizAnswer) {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [answer.questionId]: answer,
    }));
    setTimeout(() => {
      handleNextPage();
    }, 200);
  }
  const setQuizFromApi = async (isCancelled: boolean) => {
    try {
      if (!isCancelled) {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=${props.numberOfQuestions}${
            props.categoryId === -1 ? "" : `&category=${props.categoryId}`
          }`
        );
        const responseData = await response.json();
        if (responseData.response_code !== 0) {
          throw new Error("Response code is not 0");
        }
        const decodedResults = responseData.results.map(
          (result: QuizResponseDto) => ({
            ...result,
            question: decode(result.question),
            correct_answer: decode(result.correct_answer),
            incorrect_answers: result.incorrect_answers.map((answer: string) =>
              decode(answer)
            ),
          })
        );
        const quizzArray = generateArrayForQuizQuestions(decodedResults);
        setQuizQuestions(quizzArray);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const generateArrayForQuizQuestions = (
    results: QuizResponseDto[]
  ): QuizQuestion[] => {
    const quizQuestions: QuizQuestion[] = [];
    for (let i = 0; i < results.length; i++) {
      const {
        id = nanoid(),
        category,
        type,
        difficulty,
        question,
        correct_answer,
        incorrect_answers,
      } = results[i];
      const answers = combineAnswers(
        id,
        question,
        correct_answer,
        incorrect_answers
      );
      //shuffle the array
      answers.sort(() => Math.random() - 0.5);
      quizQuestions.push(
        new QuizQuestion(id, category, type, difficulty, question, answers)
      );
    }
    return quizQuestions;
  };
  const combineAnswers = (
    questionId: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
  ): QuizAnswer[] => {
    const answers = [];
    answers.push(
      new QuizAnswer(nanoid(), question, questionId, correct_answer, true)
    );
    for (const incorrectAnswer of incorrect_answers) {
      answers.push(
        new QuizAnswer(nanoid(), question, questionId, incorrectAnswer, false)
      );
    }
    return answers;
  };

  const quizElements = quizQuestions

    .map((quizQuestion) => {
      return (
        <div className="quiz-question" key={quizQuestion.id}>
          <QuestionCard
            key={quizQuestion.id}
            type={quizQuestion.type}
            question={quizQuestion.question}
            answers={quizQuestion.answers}
            handleQuestionCardChange={handleQuestionCardChange}
            answersSubmitted={answersSubmitted}
            selectedAnswer={selectedAnswers[quizQuestion.id]}
          />
        </div>
      );
    })
    .slice(
      currentPage * questionsPerPage,
      currentPage * questionsPerPage + questionsPerPage
    );

  const handleNextPage = (): void => {
    if (currentPage < Math.ceil(quizQuestions.length / questionsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = (): void => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  function handleRestart(): void {
    props.handleQuizShow(false);
  }

  function handleSubmitAnswers(): void {
    setAnswersSubmitted(true);
    const correctAnswersCount = Object.values(selectedAnswers).reduce(
      (count, answer) => (answer.isCorrect ? count + 1 : count),
      0
    );
    const totalQuestions = quizQuestions.length;
    const percentage = Math.floor((correctAnswersCount / totalQuestions) * 100);
    setScore({
      totalQuestions,
      correctAnswers: correctAnswersCount,
      percentage,
    });
  }
  console.log(width, height);
  return (
    <div className="quiz-wrapper">
      {score.percentage === 100 && <Confetti width={width} height={height} />}
      {answersSubmitted ? (
        <div className="score-text">
          <p
            className={
              score.correctAnswers === 0 ? "score-zero" : "score-number"
            }
          >
            {score.correctAnswers}
          </p>
          /<p className="score-total">{score.totalQuestions}</p> correct
          answers.
          <p className="score-percent">{score.percentage}%</p>
        </div>
      ) : (
        <button
          className="back-button"
          onClick={() => props.handleQuizShow(false)}
        >
          Restart&nbsp;
          <FontAwesomeIcon icon={faRotateLeft} />
        </button>
      )}
      <div className="quiz-container">
        {quizElements.length === 0 ? (
          <PuffLoader
            color="#39d636"
            cssOverride={{
              margin: "auto",
            }}
            loading
            size={100}
          />
        ) : (
          quizElements
        )}
        <div className="page-number">
          Question: {currentPage + 1} of{" "}
          {Math.ceil(quizQuestions.length / questionsPerPage)}
        </div>
      </div>
      <div className="button-group">
        <button
          className="page-button page-previous"
          onClick={handlePrevPage}
          disabled={hasPreviousPage}
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            size="xl"
            style={{ color: `${hasPreviousPage ? "#bcff0063" : "#bcff00"}` }}
          />
        </button>
        <button
          className="page-button page-next"
          onClick={handleNextPage}
          disabled={hasNextPage}
        >
          <FontAwesomeIcon
            icon={faAngleRight}
            size="xl"
            style={{ color: `${hasNextPage ? "#bcff0063" : "#bcff00"}` }}
          />
        </button>

        {answersSubmitted ? (
          <button className="restart-button" onClick={handleRestart}>
            Play again
          </button>
        ) : (
          <button
            className="submit-button tooltip"
            onClick={handleSubmitAnswers}
            disabled={!allQuestionsAnswered}
          >
            Submit Answers
            {!allQuestionsAnswered && (
              <span className="tooltiptext">
                Answer all questions to submit
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
type QuizProps = {
  handleQuizShow: (show: boolean) => void;
  numberOfQuestions: number;
  categoryId: number;
};

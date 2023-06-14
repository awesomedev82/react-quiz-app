import { QuizAnswer } from "../models/QuizAnswer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";

export const QuestionCard = (props: QuestionCardProps) => {
  const renderAnswers = () => {
    function handleAnswerChange(answer: QuizAnswer): void {
      props.handleQuestionCardChange(answer);
    }
    const getAnswerLabelClasses = (answer: QuizAnswer) => {
      if (props.answersSubmitted && props.selectedAnswer) {
        if (props.selectedAnswer === answer) {
          return `answer-label-wrapper ${
            answer.isCorrect ? "correct-answer" : "wrong-answer"
          }`;
        }
        return `answer-label-wrapper ${
          answer.isCorrect ? "unselected-correct-answer" : ""
        }`;
      }
      return `answer-label-wrapper ${
        props.selectedAnswer === answer ? "selected-answer" : ""
      }`;
    };
    const renderIcon = (answer: QuizAnswer) => {
      if (answer === props.selectedAnswer) {
        return answer.isCorrect ? (
          <FontAwesomeIcon
            icon={faCircleCheck}
            style={{
              color: "#5fe25f",
              margin: "10px 0px 0px 6px",
              position: "absolute",
            }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faCircleXmark}
            style={{
              color: "#ff0000",
              margin: "10px 0px 0px 4px",
              position: "absolute",
            }}
          />
        );
      }
    };
    return (
      <div className="answer-container">
        {props.answers.map((answer) => (
          <div className="answer-wrapper" key={answer.id}>
            <input
              className="answer-input"
              type="radio"
              id={answer.id}
              value={answer.answerText}
              name={props.question}
              onChange={() => handleAnswerChange(answer)}
              disabled={props.answersSubmitted}
            />
            <div className={getAnswerLabelClasses(answer)}>
              <label
                className="answer-label"
                key={answer.id}
                htmlFor={answer.id}
              >
                <span className="answer-text">{answer.answerText}</span>
              </label>
              <div>{props.answersSubmitted && renderIcon(answer)}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="question-card">
      <h4 className="question-title">
        <span className="question-title-text">Q:</span> {props.question}
      </h4>
      {renderAnswers()}
    </div>
  );
};
type QuestionCardProps = {
  type: string;
  question: string;
  answers: QuizAnswer[];
  handleQuestionCardChange: (answer: QuizAnswer) => void;
  answersSubmitted: boolean;
  selectedAnswer: QuizAnswer;
};

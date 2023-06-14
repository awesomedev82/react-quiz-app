import { QuizAnswer } from "./QuizAnswer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
type QuestionCardProps = {
  type: string;
  question: string;
  answers: QuizAnswer[];
  handleQuestionCardChange: (answer: QuizAnswer) => void;
  answersSubmitted: boolean;
  selectedAnswer: QuizAnswer;
};
export const QuestionCard = (props: QuestionCardProps) => {
  const renderAnswers = () => {
    function handleAnswerChange(answer: QuizAnswer): void {
      props.handleQuestionCardChange(answer);
    }
    const getAnswerLabelClasses = (answer: QuizAnswer) => {
      if (props.answersSubmitted && props.selectedAnswer) {
        if (props.selectedAnswer === answer) {
          return `answer-label ${
            answer.isCorrect ? "correct-answer" : "wrong-answer"
          }`;
        }
        return `answer-label ${
          answer.isCorrect ? "unselected-correct-answer" : ""
        }`;
      }
      return `answer-label`;
    };
    const renderIcon = (answer: QuizAnswer) => {
      if (answer === props.selectedAnswer) {
        return answer.isCorrect ? (
          <FontAwesomeIcon
            icon={faCircleCheck}
            style={{
              color: "#5fe25f",
              margin: "2px 0px 0px 4px",
              position: "absolute",
            }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faCircleXmark}
            style={{
              color: "#ff0000",
              margin: "2px 0px 0px 4px",
              position: "absolute",
            }}
          />
        );
      }
    };
    console.log(props.selectedAnswer);
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
            <label
              className={getAnswerLabelClasses(answer)}
              key={answer.id}
              htmlFor={answer.id}
            >
              {answer.answerText}
            </label>
            {props.answersSubmitted && renderIcon(answer)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h4 className="question-title">Question: {props.question}</h4>
      {renderAnswers()}
    </div>
  );
};

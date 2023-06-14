import reactLogo from "../assets/react.svg";
import Categories from "./Categories";
type LandingProps = {
  handleQuizShow: (show: boolean) => void;
  numberOfQuestions: number;
  handleNumberOfQuestions: (numberOfQuestions: number) => void;
  handleCategoryChange: (categoryId: number) => void;
  categoryId: number;
};

export default function Landing(props: LandingProps) {
  const [min, max] = [1, 50];

  return (
    <div className="landing-container">
      <h1 className="landing-title">
        Quizz Site
        <img className="react-logo" src={reactLogo} />
      </h1>
      <h4 className="landing-description">
        Random quizzes from{" "}
        <a
          href="https://opentdb.com/"
          target="_blank"
          style={{ fontSize: "1.1rem" }}
        >
          Open trivia DB
        </a>
      </h4>
      <label htmlFor="no-of-questions" className="landing-label">
        <div className="landing-label-heading">Number of questions</div>
        <input
          type="number"
          id="no-of-questions"
          name="numberOfQuestions"
          min={min}
          max={max}
          value={props.numberOfQuestions}
          onChange={(e) =>
            props.handleNumberOfQuestions(Number(e.target.value))
          }
        />
        <small>
          min({min}) - max({max})
        </small>
      </label>
      <Categories
        handleCategoryChange={props.handleCategoryChange}
        categoryId={props.categoryId}
      />
      <button
        className="start-button"
        onClick={() => props.handleQuizShow(true)}
      >
        Start Quizz
      </button>
    </div>
  );
}

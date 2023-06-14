import reactLogo from "../assets/react.svg";
type LandingProps = {
  handleQuizShow: (show: boolean) => void;
  numberOfQuestions: number;
  handleNumberOfQuestions: (numberOfQuestions: number) => void;
};

export default function Landing(props: LandingProps) {
  const [min, max] = [1, 50];
  return (
    <div className="landing-container">
      <h1 className="landing-title">
        React
        <img className="react-logo" src={reactLogo} /> <br />
        Quizz Site
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
        Number of questions:
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

      <button
        className="start-button"
        onClick={() => props.handleQuizShow(true)}
      >
        Start Quizz
      </button>
    </div>
  );
}

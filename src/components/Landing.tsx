import { Player } from "@lottiefiles/react-lottie-player";
import reactLogo from "../assets/react.svg";
import Categories from "./Categories";

export default function Landing(props: LandingProps) {
  const [min, max] = [1, 50];

  return (
    <div className="landing-container">
      <h1 className="landing-title">
        Quizz Site
        <img className="react-logo" src={reactLogo} />
      </h1>
      <Player
        autoplay
        loop
        src="https://assets5.lottiefiles.com/private_files/lf30_6ocpfdil.json"
        style={{
          height: "300px",
          width: "300px",
          position: "fixed",
          zIndex: "-1",
          top: "-4.5rem",
          left: "2.3rem",
          margin: "auto",
        }}
      ></Player>
      <h4 className="landing-description">
        Q & A from{" "}
        <a
          href="https://opentdb.com/"
          target="_blank"
          style={{ fontSize: "1.1rem" }}
        >
          Open Trivia Database
        </a>
      </h4>

      <div className="landing-input-container">
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
      </div>
      <button
        className="start-button"
        onClick={() => props.handleQuizShow(true)}
      >
        Start Quizz
      </button>
    </div>
  );
}
type LandingProps = {
  handleQuizShow: (show: boolean) => void;
  numberOfQuestions: number;
  handleNumberOfQuestions: (numberOfQuestions: number) => void;
  handleCategoryChange: (categoryId: number) => void;
  categoryId: number;
};

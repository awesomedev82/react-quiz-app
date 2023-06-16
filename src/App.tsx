import { useState } from "react";
import LandingPage from "./components/Landing";
import Quiz from "./components/Quiz";
import topBlob from "./assets/svgs/topBlob.svg";
import bottomBlob from "./assets/svgs/bottomBlob.svg";
import "./App.css";

function App() {
  const [isShowingQuiz, setIsShowingQuiz] = useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [categoryId, setCategoryId] = useState(-1);
  const [difficulty, setDifficulty] = useState("any");
  const handleQuizShow = (show: boolean) => {
    setIsShowingQuiz(show);
  };
  const handleNumberOfQuestions = (num: number) => {
    setNumberOfQuestions(num);
  };
  const handleCategoryChange = (categoryId: number) => {
    setCategoryId(categoryId);
  };
  const handleDifficultyChange = (difficulty: string) => {
    setDifficulty(difficulty);
  };
  return (
    <>
      <main>
        {isShowingQuiz ? (
          <Quiz
            handleQuizShow={handleQuizShow}
            numberOfQuestions={numberOfQuestions}
            categoryId={categoryId}
            difficulty={difficulty}
          />
        ) : (
          <LandingPage
            handleQuizShow={handleQuizShow}
            numberOfQuestions={numberOfQuestions}
            handleNumberOfQuestions={handleNumberOfQuestions}
            handleCategoryChange={handleCategoryChange}
            categoryId={categoryId}
            difficulty={difficulty}
            handleDifficultyChange={handleDifficultyChange}
          />
        )}
        <div className="svg-logo-container">
          <img src={topBlob} alt="blob-right" className="blob-logo-top-right" />
          <img
            src={bottomBlob}
            alt="blob-left"
            className="blob-logo-top-left "
          />
        </div>
      </main>
    </>
  );
}

export default App;

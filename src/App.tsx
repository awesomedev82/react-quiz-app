import { useState } from "react";
import LandingPage from "./components/Landing";
import Quiz from "./components/Quiz";
import topBlob from "./assets/svgs/topBlob.svg";
import bottomBlob from "./assets/svgs/bottomBlob.svg";
import wavesLayer from "./assets/svgs/wavesLayer.svg";
import "./App.css";

function App() {
  const [isShowingQuiz, setIsShowingQuiz] = useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [categoryId, setCategoryId] = useState(-1);
  const handleQuizShow = (show: boolean) => {
    setIsShowingQuiz(show);
  };
  const handleNumberOfQuestions = (num: number) => {
    setNumberOfQuestions(num);
  };
  const handleCategoryChange = (categoryId: number) => {
    setCategoryId(categoryId);
  };
  return (
    <>
      <main>
        {isShowingQuiz ? (
          <Quiz
            handleQuizShow={handleQuizShow}
            numberOfQuestions={numberOfQuestions}
            categoryId={categoryId}
          />
        ) : (
          <LandingPage
            handleQuizShow={handleQuizShow}
            numberOfQuestions={numberOfQuestions}
            handleNumberOfQuestions={handleNumberOfQuestions}
            handleCategoryChange={handleCategoryChange}
            categoryId={categoryId}
          />
        )}
        <div className="svg-logo-container">
          <img src={wavesLayer} alt="top-wave" className="blog-logo-top-wave" />
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

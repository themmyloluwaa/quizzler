import React from "react";
import "./App.css";
import QuestionCard from "./components/QuestionCard";
const App = () => {
  const startTrivia = async () => {};

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};

  const nextQuestion = () => {};
  return (
    <div className="App">
      <h1>Der Quizzler</h1>
      <button className="start" onClick={startTrivia}>
        Play Now!
      </button>
      <p className="score">Your Score is:</p>
      <p>Loading Questions ...</p>
      <QuestionCard />
      <button className="next">Next Question</button>
    </div>
  );
};

export default App;

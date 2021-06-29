import React, { useState } from "react";
import { fetchQuizQuestions, Difficulty } from "./API";
import "./App.css";
import QuestionCard from "./components/QuestionCard";

const TOTAL_QUESTIONS = 10;
const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(fetchQuizQuestions(10, Difficulty.EASY));
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
      {/* <QuestionCard
        questionNo={currentNumber + 1}
        totalQuestion={TOTAL_QUESTIONS}
        answers={questions[currentNumber].answers}
        callback={checkAnswer}
        question={questions[currentNumber].question}
        isAnswered={false}
        userAnswer={userAnswers ? userAnswers[currentNumber] : undefined}
      /> */}
      <button className="next">Next Question</button>
    </div>
  );
};

export default App;

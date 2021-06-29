import React, { useState } from "react";
import { fetchQuizQuestions, Difficulty, QuestionState } from "./API";
import "./App.css";
import { GlobalStyle, Wrapper } from "./App.styles";
import QuestionCard from "./components/QuestionCard";

// styles
const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const resetGame = (): void => {
    setScore(0);
    setUserAnswers([]);
    setCurrentNumber(0);
  };

  const startTrivia = async () => {
    try {
      setLoading(true);
      setGameOver(false);

      const newQuestions = await fetchQuizQuestions(
        TOTAL_QUESTIONS,
        Difficulty.EASY
      );

      setQuestions(newQuestions);
      resetGame();
    } catch (e) {
      window.alert("An error has occured");
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;

      const correct = questions[currentNumber].correct_answer === answer;

      if (correct) {
        setScore(score + 1);
      }
      const answerObject = {
        correct,
        answer,
        question: questions[currentNumber].question,
        correctAnswer: questions[currentNumber].correct_answer,
      };

      setUserAnswers([...userAnswers, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestionIndex = currentNumber + 1;

    if (nextQuestionIndex === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setCurrentNumber(nextQuestionIndex);
    }
  };
  return (
    <>
      <GlobalStyle />
      <Wrapper className="App">
        <h1>Der Quizzler</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startTrivia}>
            Play!
          </button>
        ) : null}
        {!gameOver && <p className="score">Your Score is:{score}</p>}
        {loading && <p>Loading Questions ...</p>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNo={currentNumber + 1}
            totalQuestion={TOTAL_QUESTIONS}
            answers={questions[currentNumber].answers}
            callback={checkAnswer}
            question={questions[currentNumber].question}
            userAnswer={userAnswers ? userAnswers[currentNumber] : undefined}
          />
        )}
        {!gameOver &&
          !loading &&
          userAnswers.length === currentNumber + 1 &&
          currentNumber + 1 !== TOTAL_QUESTIONS && (
            <button className="next" onClick={nextQuestion}>
              Next Question
            </button>
          )}
      </Wrapper>
    </>
  );
};

export default App;

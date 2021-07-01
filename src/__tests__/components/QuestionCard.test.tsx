import React from "react";
import { render } from "@testing-library/react";
import QuestionCard from "../../components/QuestionCard";

const userAnswer = {
  question:
    "Half-Life by Valve uses the GoldSrc game engine, which is a highly modified version of what engine?",
  correct: true,
  correctAnswer: "Quake Engine",
  answer: "Quake Engine",
};

const props = {
  userAnswer,
  question:
    "Half-Life by Valve uses the GoldSrc game engine, which is a highly modified version of what engine?",
  answers: ["Doom Engine", "id Engine", "Source Engine", "Quake Engine"],
  callback: jest.fn(),
};

// Basic tests, this doesn't exhaust all that can be tested for this application.
// More would be added as time goes on.
describe("QuestionCard Tests", () => {
  it("renders", () => {
    expect(
      render(
        <QuestionCard
          question={props.question}
          answers={props.answers}
          callback={props.callback}
          questionNo={0}
          totalQuestion={10}
          userAnswer={props.userAnswer}
        />
      )
    ).toMatchSnapshot();
  });
});

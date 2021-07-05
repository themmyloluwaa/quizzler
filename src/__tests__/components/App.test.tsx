import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "../../App";

describe("Application Tests", () => {
  it("renders", () => {
    expect(render(<App />)).toMatchSnapshot();
  });

  it("loads the questions", () => {
    const { getByText } = render(<App />);

    const playBtn = getByText("Play!");
    fireEvent.click(playBtn);
    const scoreText = getByText("Your Score is:0");

    expect(scoreText).toBeVisible();
  });

  // it("goes to the next question", async () => {
  //   const { getByText, findAllByTestId, findByText } = render(<App />);

  //   const playBtn = getByText("Play!");
  //   fireEvent.click(playBtn);
  //   const scoreText = getByText("Your Score is:0");
  //   expect(scoreText.innerHTML).toEqual("Your Score is:0");
  //   const optionsButton = await findAllByTestId("optionsButton");

  //   fireEvent.click(optionsButton[0]);

  //   const nextBtn = await findByText("Next Question");
  //   expect(nextBtn).toBeDefined();

  //   fireEvent.click(nextBtn);
  //   expect(getByText("Question: 2 / 10")).toBeInTheDocument();
  // });
});

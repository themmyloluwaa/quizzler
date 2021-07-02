import styled, { createGlobalStyle } from "styled-components";

// @ts-ignore
import BGImageThree from "./images/bridge.jpeg";

export const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  font-family: "Roboto Mono", monospace;

}
html {
  height: 100%;
}

body {
  background-image: url(${BGImageThree});
  background-size: cover;
  margin:0;
  padding:0 20px;
  display: flex;
  justify-content:center;
}
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    color: #fff;
  }

  .score {
    color: #fff;
    font-size: 2rem;
    margin: 0;
  }

  h1 {
    font-family: "Lobster", cursive;
    font-size: 80px;
    background-image: linear-gradient(180deg, #fff, #ffeb3b);
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    filter: drop-shadow(2px 2px #008ga3);
    text-align: center;
    margin: 20px;
    font-weight: 400;
    -webkit-box-reflect: below -120px linear-gradient(transparent, #0001);
    text-shadow: 0 0 10px #ff8c3b, 0 0 40px #ff8c3b, 0 0 80px #ff8c3b,
      0 0 160px #ff8c3b, 0 0 240px #ff8c3b;
  }

  .start,
  .next {
    cursor: pointer;
    background: linear-gradient(180deg, #fff, #ffcc91);
    border: 2px solid #d38558;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    height: 40px;
    margin: 20px 0;
    padding: 0 40px;
  }

  .start {
    max-width: 200px;
  }
`;

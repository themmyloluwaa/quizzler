import styled, { createGlobalStyle } from "styled-components";

// @ts-ignore
import BGImageOne from "./images/one.jpeg";
// @ts-ignore
import BGImageTwo from "./images/two.jpeg";
// @ts-ignore
import BGImageThree from "./images/three.jpeg";

export const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  font-family: 'Lobster', cursive;
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
    font-family: "Roboto Mono", monospace;
    font-size: 80px;
    background-image: linear-gradient(180deg, #fff, #87f1ff);
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

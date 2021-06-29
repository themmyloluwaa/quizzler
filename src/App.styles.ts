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
  font-family: 'Roboto Mono', monospace;
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

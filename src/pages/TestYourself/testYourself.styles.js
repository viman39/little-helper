import { css } from "@emotion/css";

export const questionsView = css`
  margin-left: 10vw;
  margin-top: 7vh;
`;

export const questionDescription = css`
  font-size: 28px;
  margin-bottom: 2vh;
`;

export const answerDescription = css`
  font-size: 20px;

  div {
    margin-bottom: 3px;
  }
`;

export const questionsFooter = css`
  margin-top: 4vh;
  margin-left: 10vw;
  font-size: 16px;

  span:nth-child(2) {
    margin-left: 10vw;
  }

  span:nth-child(3) {
    margin-left: 3vw;
  }
`;

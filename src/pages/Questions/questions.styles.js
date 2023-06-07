import { css } from "@emotion/css";

export const questionsStyles = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  margin-top: 5vh;
  min-width: 100vw;
  @media (min-width: 768px) {
    min-width: 30vw;
  }
`;

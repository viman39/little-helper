import { css } from "@emotion/css";

export const examStyles = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  min-width: 100vw;
  @media (min-width: 768px) {
    min-width: 30vw;
  }
`;

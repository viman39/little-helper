import { css } from "@emotion/css";

export const navBarStyles = css`
  padding-top: 10px;
  padding-bottom: 10px;
  ul {
    list-style: none;
    display: flex;
    justify-content: flex-start;
    padding: 0;
    margin: 0;
  }
  li {
    margin-right: 10px;
  }
  a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
  }
`;

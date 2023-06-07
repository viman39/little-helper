import { css } from "@emotion/css";

const Input = (props) => {
  const inputStyles = css`
    height: 23px;
    padding: 3px 7px;
    line-height: normal;
    border: 1px solid #a6a6a6;
    border-top-color: #949494;
    border-radius: 3px;
    box-shadow: rgba(213, 217, 217, 0.5) 0 2px 5px 0;
    outline: 0;
    font-size: 13px;
    &:focus {
      border-color: #e77600;
      box-shadow: 0 0 3px 2px rgb(228 121 17 / 50%);
    }
  `;

  return <input className={inputStyles} {...props}></input>;
};

export default Input;

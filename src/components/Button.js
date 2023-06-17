import { css } from "@emotion/css";

const Button = (props) => {
  const buttonStyles = css`
    border: 1px solid #a6a6a6;
    border-top-color: #949494;
    border-radius: 8px;
    box-shadow: rgba(213, 217, 217, 0.5) 0 2px 5px 0;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-block;
    font-size: ${props.fontSize ? props.fontSize : "13px"};
    line-height: 29px;
    padding: 0 10px 0 11px;
    position: relative;
    text-align: center;
    vertical-align: middle;
    &:focus {
      border-color: #e77600;
      box-shadow: 0 0 3px 2px rgb(228 121 17 / 50%);
    }
  `;

  return (
    <button className={`${buttonStyles} `} {...props}>
      {props.children}
    </button>
  );
};

export default Button;

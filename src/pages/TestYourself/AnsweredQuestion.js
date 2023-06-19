import { useState } from "react";

const AnsweredQuestion = ({ question, index }) => {
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <div>
      <div key={index} onClick={() => setShowAnswers((old) => !old)}>{`${
        index + 1
      }. ${question.description}`}</div>
      {showAnswers && (
        <div style={{ marginBottom: "7px" }}>
          {question.answers.map((answer) => (
            <div key={answer.id}>
              <input
                type="checkbox"
                onChange={(e) => {
                  e.target.value = !e.target.value;
                }}
                checked={answer.isSelected}
              ></input>
              <span style={{ color: answer.isCorrect ? "green" : "red" }}>
                {answer.description}
              </span>
              <br />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnsweredQuestion;

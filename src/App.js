import { useState, useRef } from "react";

function Fixed() {
  const [questions, setQuestions] = useState([]);
  const [p, setP] = useState("");
  const inputRef = useRef();

  const submitValue = () => {
    try {
      const parsed = JSON.parse(p);
      let questions = [];

      parsed.questionExams.forEach((question) => {
        if (!questions.find((q) => q.id === question.id)) {
          questions.push({
            id: question.id,
            description: question.question.description,
            answers: question.answerExams.map(({ isChecked, answer }) => ({
              id: answer.id,
              description: answer.description,
              isChecked,
              isCorrect: answer.isCorrect,
            })),
          });
        }
      });

      setQuestions(questions);
    } catch (e) {
      setQuestions(["nu ai copiat ce trebuie"]);
    }
    setP("");
  };

  return (
    <>
      <input
        type="text"
        ref={inputRef}
        value={p}
        onChange={(e) => setP(e.target.value)}
        placeholder="Ctrl+A Ctrl+C Ctrl+V"
      ></input>
      <button onClick={submitValue}>TEST</button>
      {questions.length > 1
        ? questions.map(({ id, description, answers }) => (
            <p key={id}>
              <div>{description}</div>
              {answers.map(({ id, description, isChecked, isCorrect }) => {
                const styles = { color: isCorrect ? "green" : "red" };
                return (
                  <div key={id} style={styles}>
                    {isChecked && <b style={{ marginRight: "3px" }}>V</b>}
                    {description}
                  </div>
                );
              })}
            </p>
          ))
        : questions[0]
        ? questions[0]
        : ""}
    </>
  );
}

export default Fixed;

import { useState, useRef } from "react";

function App() {
  const [questions, setQuestions] = useState([]);
  const inputRef = useRef();

  const addQuestions = () => {
    const questionsJSON = JSON.parse(inputRef.current.value);
    const questionsParsed = questionsJSON.map(
      ({ id, description, answers }) => ({
        id,
        description,
        answers: answers.map(({ id, description }) => ({
          id,
          description,
          isCorrect: null,
        })),
      })
    );
    console.log(questionsParsed);
    setQuestions(questionsParsed);
  };

  const addAnswers = () => {
    const answersJSON = JSON.parse(inputRef.current.value);
    const qs = [...questions];

    answersJSON.questionExams.forEach((question) => {
      question.question.answers.forEach((answer) => {
        const questionIndex = qs.findIndex(
          (el) => el.id == question.question.id
        );
        const answerIndex = qs[questionIndex].answers.findIndex(
          (el) => el.id == answer.id
        );
        console.log(
          question.question.id,
          answer.id,
          questionIndex,
          answerIndex
        );
        if (answerIndex != 0 && questionIndex != 0) {
          qs[questionIndex].answers[answerIndex].isCorrect = answer.isCorrect;
        }
      });
    });

    setQuestions((oldQuestions) => qs);
  };

  return (
    <>
      {questions.length === 0 && (
        <>
          <input type="text" ref={inputRef}></input>
          <button onClick={addQuestions}>QUESTIONS</button>
        </>
      )}
      {questions.length !== 0 && (
        <>
          <div style={{ margin: "25px" }}>
            <input type="text" ref={inputRef}></input>
            <button onClick={addAnswers}>ANSWERS</button>
          </div>

          <div style={{ margin: "25px" }}>
            {questions.map(({ id, description, answers }) => (
              <div key={id} style={{ marginTop: "13px" }}>
                <div>{description}</div>
                {answers.map(({ id, description, isCorrect }) => (
                  <div
                    key={id}
                    style={{
                      color:
                        isCorrect != null
                          ? isCorrect
                            ? "green"
                            : "red"
                          : "grey",
                    }}
                  >
                    {description}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default App;

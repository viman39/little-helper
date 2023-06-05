import { useState, useRef } from "react";

function App() {
  const [questions, setQuestions] = useState({});
  const questionsKeys = Object.keys(questions);
  const inputRef = useRef();

  const addQuestions = () => {
    const questionsJSON = JSON.parse(inputRef.current.value);
    const questionsParsed = questionsJSON.reduce(
      (prev, { id, description, answers }) => ({
        ...prev,
        [id]: {
          description,
          answers: answers.reduce(
            (prev, { id, description }) => ({
              ...prev,
              [id]: {
                description,
                isCorrect: null,
              },
            }),
            {}
          ),
        },
      }),
      {}
    );

    setQuestions(questionsParsed);
    console.log(questionsParsed);
  };

  const addAnswers = () => {
    const answersJSON = JSON.parse(inputRef.current.value);
    console.log(answersJSON);
    answersJSON.questionExams.forEach((question) => {
      question.question.answers.forEach((answer) => {
        questions[question.id].answers[answer.id].isCorrect = answer.isCorrect;
      });
    });

    setQuestions((oldQuestions) => questions);
  };

  return (
    <>
      {questionsKeys.length === 0 && (
        <>
          <input type="text" ref={inputRef}></input>
          <button onClick={addQuestions}>QUESTIONS</button>
        </>
      )}
      {questionsKeys.length !== 0 && (
        <>
          <div style={{ margin: "25px" }}>
            <input type="text" ref={inputRef}></input>
            <button onClick={addAnswers}>ANSWERS</button>
          </div>

          <div style={{ margin: "25px" }}>
            {questionsKeys.map((questionKey) => {
              const { description, answers } = questions[questionKey];
              const answerKeys = Object.keys(answers);

              return (
                <div key={questionKey} style={{ marginTop: "13px" }}>
                  <div>{description}</div>
                  {answerKeys.map((answerKey) => (
                    <div
                      key={answerKey}
                      style={{
                        color:
                          answers[answerKey].isCorrect != null
                            ? answers[answerKey].isCorrect
                              ? "green"
                              : "red"
                            : "grey",
                      }}
                    >
                      {answers[answerKey].description}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default App;

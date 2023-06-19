import { useState } from "react";
import Button from "../../components/Button";
import {
  answerDescription,
  questionDescription,
  questionsView,
  questionsFooter,
} from "./testYourself.styles";

const Questions = ({ randomQuestion, questionsCount }) => {
  const [question, setQuestion] = useState(randomQuestion.next().value);
  const [answers, setAnswers] = useState(question.answers);
  const [showAnswers, setShowAnswers] = useState(false);
  const [questionsCounter, setQuestionsCounter] = useState(1);
  const [correctAnswered, setCorrectAnswered] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);

  const percentageCorrect =
    correctAnswered === 0
      ? 0
      : parseInt((correctAnswered * 100) / totalAnswered);
  const percentageColor =
    percentageCorrect === 0
      ? "black"
      : percentageCorrect < 40
      ? "red"
      : percentageCorrect < 70
      ? "#DAA520"
      : "green";

  const checkAnswerHandler = (answerIndex) => {
    if (showAnswers) return;

    setAnswers((oldAnswers) => {
      oldAnswers[answerIndex].isSelected = !oldAnswers[answerIndex].isSelected;

      return [...oldAnswers];
    });
  };

  const testYourselfHandler = () => {
    setShowAnswers(false);

    const currentCorrectAnswered = answers.filter(
      (answer) => answer.isSelected === answer.isCorrect
    ).length;
    setCorrectAnswered(
      (oldCorrectAnswered) => oldCorrectAnswered + currentCorrectAnswered
    );
    setTotalAnswered((oldTotalAnswered) => oldTotalAnswered + answers.length);

    const nextQuestion = randomQuestion.next().value;
    setQuestion(nextQuestion);
    setAnswers(nextQuestion.answers);

    setQuestionsCounter((old) => old + 1);
  };

  return (
    <div className={questionsView}>
      <div className={questionDescription}>{question?.description}</div>
      <div className={answerDescription}>
        {answers.map((answer, index) => (
          <div
            key={index}
            onClick={() => {
              checkAnswerHandler(index);
            }}
          >
            <input
              type="checkbox"
              checked={answer.isSelected !== undefined && answer.isSelected}
              onChange={() => {}}
            />
            <>
              <span
                style={{
                  color: showAnswers
                    ? answer.isCorrect
                      ? "green"
                      : "red"
                    : "black",
                }}
              >
                {answer.description}
              </span>
              {showAnswers && (
                <>
                  {answer?.notes &&
                    answer?.notes.map((note) => <div>{note}</div>)}
                </>
              )}
            </>
          </div>
        ))}
      </div>
      <div className={questionsFooter}>
        {!showAnswers && (
          <Button
            fontSize="16px"
            onClick={() => {
              setShowAnswers(true);
            }}
          >
            Verifica
          </Button>
        )}
        {showAnswers && (
          <Button fontSize="16px" onClick={testYourselfHandler}>
            Next
          </Button>
        )}
        <span>{`${questionsCounter}/${questionsCount}`}</span>
        <span
          style={{ color: percentageColor, fontWeight: "bold" }}
        >{`${percentageCorrect}%`}</span>
      </div>
    </div>
  );
};

export default Questions;

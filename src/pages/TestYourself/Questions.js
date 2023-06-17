import { useState } from "react";
import Button from "../../components/Button";
import {
  answerDescription,
  questionDescription,
  questionsView,
  questionsFooter,
} from "./testYourself.styles";

const Questions = ({ randomQuestion }) => {
  const [question, setQuestion] = useState(randomQuestion.next().value);
  const [answers, setAnswers] = useState(question.answers);
  const [showAnswers, setShowAnswers] = useState(false);

  const checkAnswerHandler = (answerIndex) => {
    if (showAnswers) return;

    setAnswers((oldAnswers) => {
      oldAnswers[answerIndex].isSelected =
        oldAnswers[answerIndex].isSelected !== undefined
          ? !oldAnswers[answerIndex].isSelected
          : true;
      console.log(oldAnswers);
      return [...oldAnswers];
    });
  };

  const testYourselfHandler = () => {
    setShowAnswers(false);
    const nextQuestion = randomQuestion.next().value;
    setQuestion(nextQuestion);
    setAnswers(nextQuestion.answers);
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
      </div>
    </div>
  );
};

export default Questions;

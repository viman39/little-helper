import { useState } from "react";
import Button from "../../components/Button";
import {
  answerDescription,
  questionDescription,
  questionsView,
  questionsFooter,
} from "./testYourself.styles";
import AnsweredQuestion from "./AnsweredQuestion";
import Tooltip from "../../components/Tooltip/Tooltip";
import Confetti from "../../components/Confetti";

const Questions = ({ randomQuestion, questionsCount }) => {
  const [question, setQuestion] = useState(randomQuestion.next().value);
  const [answers, setAnswers] = useState(question.answers);
  const [showAnswers, setShowAnswers] = useState(false);
  const [questionsCounter, setQuestionsCounter] = useState(1);
  const [correctAnswered, setCorrectAnswered] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [showAnsweredQuestions, setShowAnsweredQuestions] = useState(false);
  const [displayConffeti, setDisplayConffeti] = useState(false);

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

  const showAnswersHandler = () => {
    const correctAnswers = answers.filter(
      (answer) => answer.isSelected === answer.isCorrect
    ).length;

    setDisplayConffeti(correctAnswers === answers.length);
    setShowAnswers(true);
  };

  const nextQuestionHandler = () => {
    setShowAnswers(false);
    setDisplayConffeti(false);

    const currentCorrectAnswered = answers.filter(
      (answer) => answer.isSelected === answer.isCorrect
    ).length;
    setCorrectAnswered(
      (oldCorrectAnswered) => oldCorrectAnswered + currentCorrectAnswered
    );
    setTotalAnswered((oldTotalAnswered) => oldTotalAnswered + answers.length);

    setAnsweredQuestions((oldAnsweredQuestions) => [
      ...oldAnsweredQuestions,
      { ...question, answers: answers },
    ]);

    const nextQuestion = randomQuestion.next().value;
    setQuestion(nextQuestion);
    setAnswers(nextQuestion.answers);

    setQuestionsCounter((old) => old + 1);
  };

  return (
    <div className={questionsView}>
      {displayConffeti && <Confetti />}
      <div className={questionDescription}>{question?.description}</div>
      <div className={answerDescription}>
        {answers.length > 0 ? (
          answers.map((answer, index) => (
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
          ))
        ) : (
          <div>
            Nu sunt raspunsuri inregistrate pentru intrebarea asta. Sunt afisate
            doar raspunsurile inregistrate.
          </div>
        )}
      </div>
      <div className={questionsFooter}>
        {!showAnswers && (
          <Button fontSize="16px" onClick={showAnswersHandler}>
            Verifica
          </Button>
        )}
        {showAnswers && (
          <Button fontSize="16px" onClick={nextQuestionHandler}>
            Next
          </Button>
        )}
        <Button onClick={() => setShowAnsweredQuestions((old) => !old)}>
          {showAnsweredQuestions
            ? "Ascunde intrebari raspunse"
            : "Vezi intrebari raspunse"}
        </Button>
        <span>{`${questionsCounter}/${questionsCount}`}</span>
        <Tooltip text="Procentajul este calculat in functie de cate raspunsuri corecte ai dat. Un raspuns este considerat corect daca este marcat cu rosu si nu l-ai checkuit sau este marcat cu verde si l-ai checkuit">
          <span
            style={{ color: percentageColor, fontWeight: "bold" }}
          >{`${percentageCorrect}%`}</span>
        </Tooltip>
      </div>
      {showAnsweredQuestions && (
        <div>
          {answeredQuestions.map((question, index) => (
            <AnsweredQuestion question={question} index={index} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Questions;

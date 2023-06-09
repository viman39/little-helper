import { useContext, useState } from "react";
import { CustomError } from "../../utils/error";
import { Link } from "react-router-dom";
import { getExam, getExamQuestions, updateExam } from "./questions.utils";
import Button from "../../components/Button";
import { questionsStyles } from "./questions.styles";
import { AuthContext } from "../../context/AuthContextProvider";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [examResult, setExamResult] = useState("");
  const [examMessage, setExamMessage] = useState("");
  const [examId, setExamId] = useState(0);
  const { user } = useContext(AuthContext);

  const submitExam = async () => {
    try {
      const examQuestions = JSON.parse(examResult);
      const examId = examQuestions.exam.pkDiscipline + "";

      const exam = await getExam(examId);

      const questions = getExamQuestions(examQuestions.questionExams);

      if (exam === null) {
        setExamMessage(`Nu a fost gasit examen cu id-ul ${examId}`);
      } else {
        await updateExam(questions, exam, user.email);
      }

      setQuestions(questions);
      setExamId(exam.uid);
      setExamMessage(`Examenul ${exam.data.name} updatat`);
    } catch (e) {
      if (e instanceof CustomError) {
        setError(e.message);
      } else {
        setError(e.message);
      }
      console.log(e);
    }

    setExamResult("");
  };

  return (
    <div className={questionsStyles}>
      <div>
        <textarea
          type="text"
          value={examResult}
          onChange={(e) => {
            setExamResult(e.target.value);
            setError("");
            setQuestions([]);
          }}
          placeholder="Ctrl+A Ctrl+C Ctrl+V"
        />
      </div>
      <div>
        <Button onClick={submitExam}>VEZI REZULTATE</Button>
      </div>
      {examMessage && (
        <div style={{ marginTop: "11px", marginBottom: "11px" }}>
          {examMessage}
          <Link to={`/exam/${examId}`}>Vezi tot examenul</Link>
        </div>
      )}
      {error && (
        <div style={{ marginTop: "11px", marginBottom: "11px" }}>{error}</div>
      )}
      <div>
        {!error && questions.length > 0 && (
          <>
            {questions.map(({ id, description, answers }) => (
              <div key={id}>
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
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Questions;

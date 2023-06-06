import { useState } from "react";
import { CustomError } from "../../utils/error";
import { db } from "../../utils/firebase";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
  doc,
} from "firebase/firestore";
import useAuth from "../../utils/useAuth";
import { Link } from "react-router-dom";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [examResult, setExamResult] = useState("");
  const [examMessage, setExamMessage] = useState("");
  const [examId, setExamId] = useState(0);
  const { user } = useAuth();

  const submitExam = async () => {
    try {
      const examQuestions = JSON.parse(examResult);
      const examId = examQuestions.exam.pkDiscipline + "";

      const collectionRef = query(
        collection(db, "exams"),
        where("id", "==", examId)
      );
      const querySnapshot = await getDocs(collectionRef);

      const exams = querySnapshot.docs.map((doc) => ({
        uid: doc.id,
        data: doc.data(),
      }));

      const exam = exams.length > 0 ? exams[0] : null;

      let questions = [];

      examQuestions.questionExams.forEach((question) => {
        if (!questions.find((q) => q.id === question.question.id)) {
          questions.push({
            id: question.question.id,
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

      if (exam === null) {
        setExamMessage(`Nu a fost gasit examen cu id-ul ${examId}`);
      } else {
        questions.forEach(({ id, answers }) => {
          const examQuestionIndex = exam.data.questions.findIndex(
            (el) => el.id === id
          );

          answers.forEach(({ id, isCorrect }) => {
            const examAnswerIndex = exam.data.questions[
              examQuestionIndex
            ].answers.findIndex((el) => el.id === id);

            exam.data.questions[examQuestionIndex].answers[
              examAnswerIndex
            ].isCorrect = isCorrect;
            exam.data.questions[examQuestionIndex].answers[
              examAnswerIndex
            ].lastUpdated = `${user.email}: ${new Date().toString()}`;
          });
        });

        const { answers, filledAnswers } = exam.data.questions.reduce(
          ({ answers, filledAnswers }, question) => {
            return {
              answers: answers + question.answers.length,
              filledAnswers:
                filledAnswers +
                question.answers.filter((answer) => answer.isCorrect != null)
                  .length,
            };
          },
          { answers: 0, filledAnswers: 0 }
        );

        await updateDoc(doc(db, "exams", exam.uid), {
          ...exam.data,
          percentageFilled: Math.round((filledAnswers / answers) * 100),
        });
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
    <>
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
      <button onClick={submitExam}>VEZI REZULTATE</button>
      {examMessage && (
        <div style={{ marginTop: "11px", marginBottom: "11px" }}>
          {examMessage}
          <Link to={`/exam/${examId}`}>Vezi tot examenul</Link>
        </div>
      )}
      {error && (
        <div style={{ marginTop: "11px", marginBottom: "11px" }}>{error}</div>
      )}
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
    </>
  );
};

export default Questions;

import { useState } from "react";
import { CustomError } from "../../utils/error";
import { useAddDocument } from "../../utils/useFirebase";
import useAuth from "../../utils/useAuth";
import { useNavigate } from "react-router-dom";

const Exam = () => {
  const [idDiscipline, setIdDiscipline] = useState("");
  const [name, setName] = useState("");
  const [examObject, setExamObject] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuth();
  const { addDocument, setLoading, loading } = useAddDocument("exams");
  const navigate = useNavigate();

  const addExamObject = () => {
    setLoading(true);
    try {
      if (!/^\d+$/.test(idDiscipline)) {
        throw new CustomError("ID Discipline trebuie sa fie numar");
      }
      if (name === "") {
        throw new CustomError("Numele nu e definit");
      }
      if (examObject === "") {
        throw new CustomError("Exam Object nu e bun");
      }

      const examQuestions = JSON.parse(examObject);

      addDocument({
        id: idDiscipline,
        name,
        questions: examQuestions.map(({ id, description, answers }) => ({
          id,
          description,
          answers: answers.map(({ id, description }) => ({
            id,
            description,
            isCorrect: null,
            lastUpdated: "",
          })),
        })),
        addedBy: user?.uid,
        percentageFilled: 0,
      });
      navigate("/");
    } catch (e) {
      if (e instanceof CustomError) {
        setError(e.message);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="ID Disciplina"
        onChange={(e) => {
          setIdDiscipline(e.target.value);
          setError("");
        }}
      />
      <input
        type="text"
        placeholder="Nume"
        onChange={(e) => {
          setName(e.target.value);
          setError("");
        }}
      />
      <textarea
        type="text"
        placeholder="Exam Object"
        onChange={(e) => {
          setExamObject(e.target.value);
          setError("");
        }}
      />
      <button onClick={addExamObject} disabled={loading}>
        Add Exam
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};

export default Exam;

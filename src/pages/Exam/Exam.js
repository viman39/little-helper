import { useContext, useState } from "react";
import { CustomError } from "../../utils/error";
import { useAddDocument } from "../../utils/useFirebase";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { examStyles } from "./exam.styles";
import { AuthContext } from "../../context/AuthContextProvider";

const Exam = () => {
  const [idDiscipline, setIdDiscipline] = useState("");
  const [name, setName] = useState("");
  const [examObject, setExamObject] = useState("");
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
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
            lastUpdated: [],
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
    <div className={examStyles}>
      <div>
        <Input
          type="text"
          placeholder="ID Disciplina"
          onChange={(e) => {
            setIdDiscipline(e.target.value);
            setError("");
          }}
          style={{ marginRight: "4px" }}
        />
        <Input
          type="text"
          placeholder="Nume"
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
        />
      </div>
      <div style={{ marginTop: "11px" }}>
        <textarea
          type="text"
          placeholder="Exam Object"
          onChange={(e) => {
            setExamObject(e.target.value);
            setError("");
          }}
        />
      </div>
      <div style={{ marginTop: "11px" }}>
        <Button
          onClick={addExamObject}
          disabled={loading}
          title="Adauga Exam"
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Exam;

import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../utils/useFirebase";
import Input from "../../components/Input";
import { floatTopRight } from "./examDetails.styles";
import { filteredExamQuestions, getUpdater } from "./examDetails.utils";
import Answer from "./Answer";
import Button from "../../components/Button";
import { AuthContext } from "../../context/AuthContextProvider";

const ExamDetails = () => {
  const { examId } = useParams();
  const { document: exam, loading } = useFetchDocument("exams", examId);
  const [search, setSearch] = useState("");
  const [showAllNotes, setShowAllNotes] = useState(false);
  const { user } = useContext(AuthContext);

  const examUpdater = getUpdater(examId);
  const examQuestions = loading
    ? []
    : filteredExamQuestions(exam.questions, search);

  return (
    <>
      {loading && <div>loading exam {examId}</div>}
      {!loading &&
        (exam ? (
          <>
            <div>{`${exam.name} - COMPLETAT ${exam.percentageFilled}%`}</div>
            <div className={floatTopRight}>
              <Input
                type="text"
                placeholder="Search (min. 3 caractere)"
                onChange={(e) => {
                  setSearch(e.target.value.length >= 3 ? e.target.value : "");
                }}
                style={{ width: "15vw" }}
              />
              <Button
                title={showAllNotes ? "Ascunde Notite" : "Vezi Notite"}
                onClick={() => setShowAllNotes((old) => !old)}
              />
            </div>
            {examQuestions.map(
              ({ id, description, answers, isCompleted }, index) => (
                <div style={{ marginTop: "19px" }} key={id}>
                  <div style={{ marginBottom: "7px" }}>{`${
                    isCompleted ? "*" : ""
                  } ${index + 1}. ${description}`}</div>
                  {answers.map(
                    (
                      { description, isCorrect, id, lastUpdated, notes },
                      indexAnswer
                    ) => {
                      return (
                        <Answer
                          description={description}
                          lastUpdated={lastUpdated}
                          isCorrect={isCorrect}
                          key={id}
                          indexAnswer={indexAnswer}
                          indexQuestion={index}
                          exam={exam}
                          showNotesDefault={false}
                          notes={notes}
                          examUpdater={examUpdater}
                          showAllNotes={showAllNotes}
                          userEmail={user.email}
                        />
                      );
                    }
                  )}
                </div>
              )
            )}
          </>
        ) : (
          <div>Id-ul nu exista</div>
        ))}
    </>
  );
};

export default ExamDetails;

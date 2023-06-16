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
  const [fontSize, setFontSize] = useState(16);
  const { user } = useContext(AuthContext);

  const examUpdater = loading
    ? (...args) => {
        console.log(args);
      }
    : getUpdater(examId, exam.questions);

  const examQuestions = loading
    ? []
    : filteredExamQuestions(exam.questions, search);

  return (
    <>
      {loading && <div>loading exam {examId}</div>}
      {!loading &&
        (exam ? (
          <div style={{ marginLeft: "7px" }}>
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
                style={{ marginLeft: "3px" }}
              />
              <Button
                title="-"
                onClick={() =>
                  setFontSize((oldFontSize) =>
                    oldFontSize <= 16 ? 16 : oldFontSize - 4
                  )
                }
                style={{ marginLeft: "3px" }}
              />
              <Button
                title="+"
                onClick={() => setFontSize((oldFontSize) => oldFontSize + 4)}
              />
            </div>
            {examQuestions.map(({ id, description, answers }, index) => (
              <div
                style={{ marginTop: "19px", fontSize: `${fontSize}px` }}
                key={id}
              >
                <div style={{ marginBottom: "7px" }}>{`${
                  index + 1
                }. ${description}`}</div>
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
                        notes={notes}
                        showNotesDefault={false}
                        showAllNotes={showAllNotes}
                        indexAnswer={indexAnswer}
                        indexQuestion={index}
                        examUpdater={examUpdater}
                        userEmail={user.email}
                        key={id}
                      />
                    );
                  }
                )}
              </div>
            ))}
          </div>
        ) : (
          <div>Id-ul nu exista</div>
        ))}
    </>
  );
};

export default ExamDetails;

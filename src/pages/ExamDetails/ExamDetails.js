import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../utils/useFirebase";
import Input from "../../components/Input";
import { floatTopRight } from "./examDetails.styles";
import { filteredExamQuestions } from "./examDetails.utils";
import Tooltip from "../../components/Tooltip/Tooltip";

const ExamDetails = () => {
  const { examId } = useParams();
  const { document: exam, loading } = useFetchDocument("exams", examId);
  const [search, setSearch] = useState("");

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
                style={{ width: "20vw" }}
              />
            </div>
            {examQuestions.map(
              ({ id, description, answers, isCompleted }, index) => (
                <div style={{ marginTop: "11px" }} key={id}>
                  <div>{`${isCompleted ? "*" : ""} ${
                    index + 1
                  }. ${description}`}</div>
                  {answers.map(
                    ({ description, isCorrect, id, lastUpdated }) => {
                      const color =
                        isCorrect === null
                          ? "grey"
                          : isCorrect
                          ? "green"
                          : "red";

                      return (
                        <div style={{ color: color }} key={id}>
                          <span style={{ marginRight: "3px" }}>
                            {lastUpdated.length > 0 ? (
                              <Tooltip text={lastUpdated.toString()}>
                                <>- </>
                              </Tooltip>
                            ) : (
                              <>- </>
                            )}
                          </span>
                          {description}
                        </div>
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

import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../utils/useFirebase";

const ExamDetails = () => {
  const { examId } = useParams();
  const { document: exam, loading } = useFetchDocument("exams", examId);

  return (
    <>
      {loading && <div>loading exam {examId}</div>}
      {!loading &&
        (exam ? (
          <>
            <div>{`${exam.name} - COMPLETAT ${exam.percentageFilled}%`}</div>
            {exam.questions.map(
              ({ id, description, answers, isCompleted }, index) => (
                <div style={{ marginTop: "11px" }} key={id}>
                  <div>{`${isCompleted ? "*" : ""} ${
                    index + 1
                  }. ${description}`}</div>
                  {answers.map(({ description, isCorrect, id }) => {
                    const color =
                      isCorrect === null ? "grey" : isCorrect ? "green" : "red";

                    return (
                      <div style={{ color: color }} key={id}>
                        -{description}
                      </div>
                    );
                  })}
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

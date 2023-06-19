import { useParams } from "react-router-dom";
import Questions from "./Questions";
import { useFetchDocument } from "../../utils/useFirebase";
import { getRandomQuestion } from "./testYourself.utils";
import { useEffect } from "react";

const TestYourself = () => {
  const { examUid } = useParams();
  const { document: exam, loading } = useFetchDocument("exams", examUid);
  const randomQuestion = getRandomQuestion(
    exam?.questions ? exam.questions : []
  );

  useEffect(() => {
    return () => {
      randomQuestion.return();
    };
  }, []);

  return (
    <>
      {loading && <div>loading</div>}
      {!loading && (
        <Questions
          randomQuestion={randomQuestion}
          questionsCount={exam.questions.length}
        />
      )}
    </>
  );
};

export default TestYourself;

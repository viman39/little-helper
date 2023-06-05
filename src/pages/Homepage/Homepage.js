import { useFetchCollection } from "../../utils/useFirebase";

const Homepage = () => {
  const { data: exams, loading } = useFetchCollection("exams");

  return (
    <>
      {loading && <div>loading</div>}
      {!loading &&
        (exams.length === 0 ? (
          <div>No exams added yet</div>
        ) : (
          <div>you have {exams.length} exams</div>
        ))}
    </>
  );
};

export default Homepage;

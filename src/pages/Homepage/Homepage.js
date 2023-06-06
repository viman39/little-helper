import { Link } from "react-router-dom";
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
          exams.map(({ uid, name, percentageFilled }) => (
            <div key={uid}>
              <Link to={`exam/${uid}`}>{`${name} (${percentageFilled}%)`}</Link>
            </div>
          ))
        ))}
    </>
  );
};

export default Homepage;

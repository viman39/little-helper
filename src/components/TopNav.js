import { Link } from "react-router-dom";

const TopNav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Homepage</Link>
        </li>
        <li>
          <Link to="/exam">Exam</Link>
        </li>
        <li>
          <Link to="/questions">Test Questions</Link>
        </li>
      </ul>
    </nav>
  );
};

export default TopNav;

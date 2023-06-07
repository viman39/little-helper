import { Link } from "react-router-dom";
import { navBarStyles } from "./topNav.styles";

const TopNav = () => {
  return (
    <nav className={navBarStyles}>
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

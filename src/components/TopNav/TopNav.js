import { Link } from "react-router-dom";
import { navBarStyles } from "./topNav.styles";
import useAuth from "../../utils/useAuth";

const TopNav = ({ userEmail }) => {
  const { logout } = useAuth();

  return (
    <nav className={navBarStyles}>
      <ul>
        <li>{userEmail}</li>
        <li>
          <Link to="/">Homepage</Link>
        </li>
        <li>
          <Link to="/exam">Exam</Link>
        </li>
        <li>
          <Link to="/questions">Test Questions</Link>
        </li>
        <li>
          <Link onClick={() => logout()}>Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default TopNav;

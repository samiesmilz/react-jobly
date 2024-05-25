import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import AuthContext from "./AuthContext";
import { useContext } from "react";

const NavBar = () => {
  const { user, setUser, setLocalUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    setUser(null);
    setLocalUser(null);
    navigate("/");
  };

  return (
    <nav className="NavBar">
      <div className="NavBar-brand">
        <Link to="/">
          <button className="brand"> Jobly </button>
        </Link>
      </div>
      <div className="NavBar-links">
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}

        {user && (
          <>
            <Link to="/companies">Companies</Link>
            <Link to="/jobs">Jobs</Link>
            <Link to="/profile">Profile</Link>
            <button className="NavBar-logout" onClick={handleClick}>
              Sign out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
export default NavBar;

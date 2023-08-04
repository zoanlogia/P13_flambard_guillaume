import argentBankLogo from "../../assets/img/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice.js";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(logout());
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {user ? (
          <>
            <Link className="main-nav-item" to={`/profile`}>
              <FontAwesomeIcon icon={faUserCircle} />
              {user.firstName} {user.lastName}
            </Link>
            <Link className="main-nav-item" onClick={handleSignOut} to={`/`}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              Sign Out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to={`/sign-in`}>
            <FontAwesomeIcon icon={faUserCircle} />
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/argentBankLogo.png";
import { useDispatch, useSelector } from "react-redux";

const Nav = ({ links }) => {
  const userConnected = useSelector((state) => state.userConnected);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "logout" });
    navigate("/", { replace: true });
  };

  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      <div>
        {userConnected ? (
          <div onClick={handleLogout}>logout</div>
        ) : (
          links.map((link, index) => (
            <Link className="main-nav-item" to={link.link} key={index}>
              <i className={link.icon}></i>
              {link.text}
            </Link>
          ))
        )}
      </div>
    </nav>
  );
};

export default Nav;

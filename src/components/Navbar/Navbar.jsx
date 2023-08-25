import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/argentBankLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Nav = ({ links }) => {
  const token = useSelector((state) => state.token);
  const [userDetails, setUserDetails] = useState({ firstName: "", lastName: "" });
  const userConnected = useSelector((state) => state.userConnected);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "X-Requested-Width": "xmlhttprequest",
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:3001/api/v1/user/profile", {
          method: "POST",
          headers
        });

        if (response.ok) {
          const data = await response.json();
          if (data.status === 200) {
            setUserDetails({
              firstName: data.body.firstName,
              lastName: data.body.lastName
            });
            
          }
        }
      } catch (error) {
        console.error(error);
      }
    })();
  });

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
        <>
          <Link className="main-nav-item" to="/profile">
            <i className="fa fa-user-circle"></i>
            {`${userDetails.firstName}`}
          </Link>
          <Link onClick={handleLogout}>logout</Link>
        </>
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

Nav.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Nav;

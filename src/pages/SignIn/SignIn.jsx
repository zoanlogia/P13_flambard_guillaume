import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {  loginAPI } from "../../tools/FetchApi.js";
import { loginSuccess, loginFail } from "../../features/auth/authSlice.js";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = await loginAPI(email, password);

    if (userData && userData.body && userData.body.token) {
      if (rememberMe) {
        localStorage.setItem("token", userData.body.token);
      }
      dispatch(loginSuccess(userData));
      setEmail("");
      setPassword("");
      navigate("/profile");
    } else {
      const errorMsg = userData && userData.message ? userData.message : "Authentication failed.";
      dispatch(loginFail(errorMsg));
      console.error(errorMsg);
    }
  };

  const handleUsername = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  return (
    <>
      <Navbar />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <FontAwesomeIcon icon={faUserCircle} className={`sign-in-icon`} />
          <h1>Sign In</h1>

          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input type="email" id="username" onChange={handleUsername} />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" onChange={handlePassword} />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" onChange={handleRememberMe} />
              <label htmlFor="remember-me">Remember me</label>
            </div>

            <button type="submit" className="sign-in-button">
              sign in
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SignIn;

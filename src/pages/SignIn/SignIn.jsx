// SignIn/SignIn.jsx

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, loginUser } from "../../features/auth/authSlice.js";
import { useNavigate } from "react-router-dom";



const SignIn = () => {
  const [email, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
const navigate = useNavigate();

const status = useSelector((state) => state.auth.status);
const token = useSelector((state) => state.auth.token);

const handleSubmit = (event) => {
  event.preventDefault();
  dispatch(loginUser({ email, password }));
}

useEffect(() => {
  if (status === "succeeded") {
    dispatch(fetchUserProfile(token));
  }
}, [status, dispatch, token]);

// Redirect the user to profile page once user profile is loaded
useEffect(() => {
  if (status === "succeeded") {
    navigate("/profile");
  }
}, [status, navigate]);


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
              <input
                value={email}
                type="email"
                id="username"
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>

            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SignIn;

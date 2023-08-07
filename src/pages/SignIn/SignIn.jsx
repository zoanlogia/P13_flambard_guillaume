// SignIn/SignIn.jsx

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"; // Importez useDispatch
import { useNavigate } from "react-router-dom";
import {   setCredentials } from "../../features/auth/authSlice.js";
import { useRef } from "react";
import { useLoginMutation } from "../../features/auth/authApiSlice.js";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const userRef = useRef()
  
  const [errMsg, setErrMsg] = useState('')

  const [login, { isLoading }] = useLoginMutation()


  useEffect(() => {
    userRef.current.focus()
}, [])

useEffect(() => {
    setErrMsg('')
}, [email, password])


  const handleSubmit = async (e) => {
    e.preventDefault()


    try {
        const userData = await login({ email, password }).unwrap()
        dispatch(setCredentials({ ...userData, email }))
        setEmail('')
        setPassword('')
        navigate('/profile')
    } catch (err) {
        if (!err?.originalStatus) {
            // isLoading: true until timeout occurs
            setErrMsg('No Server Response');
        } else if (err.originalStatus === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.originalStatus === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Login Failed');
        }
    }
}


  return (
    <>
      <Navbar />
      {errMsg && <div className="error-message" >{errMsg}</div>}
      {isLoading && <div className="loading-message">Loading...</div>}
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
                onChange={(e) => setEmail(e.target.value)}
                ref={userRef}
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

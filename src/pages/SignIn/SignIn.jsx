// SignIn/SignIn.jsx

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"; // Importez useDispatch
import { useNavigate } from "react-router-dom";
import { loginAPI} from "../../tools/FetchApi.js";
import { createLogin, login } from "../../features/auth/authSlice.js";

const SignIn = () => {
  const [email, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState(null);


  useEffect(() => {
    if (token) {
      dispatch(login({email, password, token}));
      navigate("/profile");
    }
  }, [token, dispatch, navigate, email, password]);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await loginAPI(email, password);
    if (result) {
      const token = result;
      dispatch(createLogin(email, password, token));
      navigate("/profile");
    } else {
      console.error(result.error);
    }
}

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

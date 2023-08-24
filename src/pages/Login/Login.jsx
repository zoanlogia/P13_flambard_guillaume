import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { validateEmail } from "../../tools/tools.js";

const Login = () => {
  const [inputEmail, setInputEmail] = useState('');
  
  const [inputPassword, setInputPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [inputError, setInputError] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);

  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchData = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (validateEmail(inputEmail) !== false) {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-Width': 'xmlhttprequest'
        },
        body: JSON.stringify({
          email: inputEmail,
          password: inputPassword
        })
      });
      if (response.ok) {            
        const responseData = await response.json();
        if (responseData.status === 200) {
          setInputError(false);
          dispatch({ type: "login", token: responseData.body.token, rememberUser: rememberMe });
          navigate('/profile', { replace: true });
        }
      } else {
        setInputError(true);
      }
    }
  };

  const links= [
    {
      text: "Sign In",
      icon:"fa fa-user-circle",
      link:"/login"
    }
  ]

  return (
    <>
      <Navbar  links={links}/>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <FontAwesomeIcon icon={faUserCircle} className={`sign-in-icon`} />
          <h1>Sign In</h1>

          <form onSubmit={fetchData}>
          <div className={formSubmitted && validateEmail(inputEmail) === false ? 'input-wrapper inputError' : 'input-wrapper'}>
              <label htmlFor="username">Username</label>
              <input type="email" id="username" onChange={e => setInputEmail(e.target.value)} />
              <p className={formSubmitted && validateEmail(inputEmail) === false ? 'invalidMail' : 'hidden'}>Email invalide, veuillez entrer un email valide</p>

            </div>
            <div className={formSubmitted && inputError ? 'input-wrapper inputError' : 'input-wrapper'}>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" onChange={e => setInputPassword(e.target.value)} />
            </div>
            <p className={formSubmitted && inputError ? 'errorInput' : 'hidden'}>L&apos;email ou le mot de passe n&apos;est pas valide, veuillez entrer un mot de passe et un email valide</p>

            <div className="input-remember">
              <input type="checkbox" id="remember-me" onChange={e => setRememberMe(e.target.value)} />
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

export default Login;

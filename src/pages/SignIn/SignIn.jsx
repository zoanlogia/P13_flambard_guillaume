import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
// import fetchUserData from "../../tools/FetchApi.js";
import { useEffect, useState } from "react";

const SignIn = () => {
  const [users, setUsers] = useState([])

  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");


  const fetchUser = () => {
    fetch("http://localhost:3001/api/v1/user/signup")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setUsers(data)
      })
  }
  useEffect(() => {
    fetchUser()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();

  };

  return (
    <>
      <Navbar />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <FontAwesomeIcon icon={faUserCircle} className={`sign-in-icon`} />
          <h1>Sign In</h1>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input value={userName} type="text" id="username" onChange={(e) => setUserName(e.target.value)}/>
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input value={password} type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
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

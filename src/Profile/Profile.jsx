import { useSelector } from "react-redux";
import Footer from "../components/Footer/Footer.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import { useState, useEffect } from "react";
import Account from "../components/Account/Account.jsx";

const Profile = ({data}) => {
  
  const token = useSelector((state) => state.token);
  const [succeed, setSucceed] = useState(false);
  const [response, setResponse] = useState(0);
  const [user, setUser] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "X-Requested-Width": "xmlhttprequest",
          },
        }
      );

      if (response.ok) {            
        response.json()
        .then(response => {
          if (response.status === 200) {
            console.log(response)
          setUser(response.body.firstName + " " + response.body.lastName)
          setSucceed(true)
          setResponse(0)
          } 
        else {
          setSucceed(false)
          setResponse(1)
        }
        })
        .catch(error => console.error(error))
    } 
    };
    fetchData();
  }, [token]);

  const linksContent= [
    {
      text: "Sign Out",
      icon:"fa fa-sign-out",
      link:"/"
    }
  ]


  if (succeed) {
    return (
      <>
        <Navbar links={linksContent} />
        <main className="main bg-dark">
          <div className="header">
            <h1>
              Welcome back, {user}
              <br />
            </h1>
            <button className="edit-button">Edit Name</button>
          </div>
          <h2 className="sr-only">Accounts</h2>

          {data.map((item, index) => (
            <Account data={item} key={index} />
          ))}
        </main>
        <Footer />
      </>
    );
  }
};

export default Profile;

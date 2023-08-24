import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import Account from "../components/Account/Account.jsx";
import NameEdit from "../components/forms/NameEdit.jsx";
import Footer from "../components/Footer/Footer.jsx";

const Profile = ({ data }) => {
  const token = useSelector((state) => state.token);
  const [userDetails, setUserDetails] = useState({ firstName: "", lastName: "" });
  const [showEdit, setShowEdit] = useState(false);
  const [fetchStatus, setFetchStatus] = useState(null);  // null: loading, true: success, false: failed

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
            setFetchStatus(true);
          } else {
            setFetchStatus(false);
          }
        }
      } catch (error) {
        console.error(error);
        setFetchStatus(false);
      }
    })();
  });

  const handleNameEditSubmit = async (e) => {
    e.preventDefault();
    const [newFirstName, newLastName] = e.target;
    
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PUT",
        headers,
        body: JSON.stringify({
          firstName: newFirstName.value,
          lastName: newLastName.value
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === 200) {
          setUserDetails({ firstName: newFirstName.value, lastName: newLastName.value });
          setShowEdit(false);
        } else {
          console.error("Server error during name update");
        }
      } else {
        console.error("HTTP request error during name update");
      }
    } catch (error) {
      console.error("Error sending the request:", error);
    }
  };

  if (fetchStatus) {
    return (
      <>
        <Navbar links={[{ text: "Sign Out", icon: "fa fa-sign-out", link: "/" }]} />
        <main className="main bg-dark">
          <div className="header">
            <h1>Welcome back,<br />{userDetails.firstName} {userDetails.lastName}</h1>
            {showEdit ? (
              <NameEdit
                firstName={userDetails.firstName}
                lastName={userDetails.lastName}
                handleSubmit={handleNameEditSubmit}
                close={() => setShowEdit(false)}
              />
            ) : (
              <button className="edit-button" onClick={() => setShowEdit(true)}>
                Edit Name
              </button>
            )}
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

  return "Loading...";
};

Profile.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Profile;

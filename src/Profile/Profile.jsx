  import Footer from "../components/Footer/Footer.jsx";
  import Navbar from "../components/Navbar/Navbar.jsx";
  import { useEffect, useState } from "react";
  import { getProfile } from "../tools/FetchApi.js";
  import { useSelector } from "react-redux";
  import HeaderProfile from "../components/HeaderProfile/HeaderProfile.jsx";
  import AccountSection from "../components/AccountSection/AccountSection.jsx";

  const Profile = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const token = useSelector((state) => state.auth.token);

  useEffect(() => {
      getProfile(token)
        .then((data) => {
          const { firstName, lastName } = data.body;
          setFirstName(firstName);
          setLastName(lastName);
        })
    }, [token]);

    return (
      <>
        <Navbar />
        <main className="main bg-dark">
          <HeaderProfile firstName={firstName} lastName={lastName} />
          <h2 className="sr-only">Accounts</h2>

          <AccountSection title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance" />
          <AccountSection title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance" />
          <AccountSection title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance" />
        </main>
        <Footer />
      </>
    );
  };

  export default Profile;

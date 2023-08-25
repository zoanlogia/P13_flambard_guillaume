import Navbar from "../../components/Navbar/Navbar.jsx";
import Hero from "../../components/Hero/Hero.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { useSelector } from "react-redux";

const Home = () => {

  const userConnected = useSelector(state => state.userConnected);

  const links = userConnected ? [
    {
      text: "Sign Out",
      icon: "fa fa-sign-out",
      link: "/"
    },
    // Vous pouvez ajouter d'autres liens pour les utilisateurs connectés ici
  ] : [
    {
      text: "Sign In",
      icon: "fa fa-user-circle",
      link: "/login"
    }
  ];


  return (
    <>
      <Navbar links={links}/>
      <Hero />
      <Footer />
    </>
  );
}

export default Home;

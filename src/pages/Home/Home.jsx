import Navbar from "../../components/Navbar/Navbar.jsx";
import Hero from "../../components/Hero/Hero.jsx";
import Footer from "../../components/Footer/Footer.jsx";

const Home = () => {

const links= [
  {
    text: "Sign In",
    icon:"fa fa-user-circle",
    link:"/login"
  }
]

  return (
    <>
      <Navbar links={links}/>
      <Hero />
      <Footer />
    </>
  );
}

export default Home;

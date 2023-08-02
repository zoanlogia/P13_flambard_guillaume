import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home.jsx";
import SignIn from "../pages/SignIn/SignIn.jsx";
import Profile from "../Profile/Profile.jsx";


const Router = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/profile" element={<Profile />} />
            {/* <Route path="*" element={<Error />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;

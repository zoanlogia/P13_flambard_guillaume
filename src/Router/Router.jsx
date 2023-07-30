import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home.jsx";
import User from "../pages/User/User.jsx";
import SignIn from "../pages/SignIn/SignIn.jsx";

const Router = () => {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path={`/api/v1/user/signup`} element={<User />} />
            {/* <Route path="*" element={<Error />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;

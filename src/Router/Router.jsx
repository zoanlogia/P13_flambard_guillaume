import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home.jsx";
import SignIn from "../pages/SignIn/SignIn.jsx";
import Profile from "../Profile/Profile.jsx";
import { data } from "../__MOCKS__/account.js";
import Transactions from "../pages/Transactions/Transactions.jsx";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/profile" element={<Profile data={data} />} />
          {data.map((account) => {
            return (
              <Route
                key={account.id}
                path={`/${account.id}`}
                element={<Transactions account={account} />}
              />
            );
          })}
          {/* <Route path="*" element={<Error />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;

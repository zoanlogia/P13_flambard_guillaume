import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Transaction from "../../components/Transaction/Transaction";
import { data } from "../../__MOCKS__/transactions.js";

const Transactions = ({ account }) => {
  const links = [
    {
      text: "Profil",
      icon: "fa fa-user-circle",
      link: "/profile",
    },
    {
      text: "Sign Out",
      icon: "fa fa-sign-out",
      link: "/",
    },
  ];

  return (
    <div className="user">
      <Navbar links={links} />
      <header className="transactions__header">
        <h2>{account.title}</h2>
        <h1>{account.amount}</h1>
        <h3>{account.description}</h3>
      </header>
      <main className="main transactions">
        <div className="titles-wrapper">
          <h4>DATE</h4>
          <h4>DESCRIPTION</h4>
          <h4>AMOUNT</h4>
          <h4>BALANCE</h4>
        </div>
        {data.map((data, idx) => (
          <Transaction data={data} key={idx} />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default Transactions;

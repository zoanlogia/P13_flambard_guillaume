import { useNavigate } from "react-router";
import PropTypes from "prop-types";

const Account = ({data}) => {
  const navigate = useNavigate();

  const handleClick = (data) => {
    navigate(`/${data.id}`);
  };

  return (
    <section id={data.id} className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{data.title}</h3>
        <p className="account-amount">{data.amount}</p>
        <p className="account-amount-description">{data.description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button
          className="transaction-button"
          onClick={() => handleClick(data)}
        >
          View transactions
        </button>
      </div>
    </section>
  );
};

Account.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    credit: PropTypes.string,
    title: PropTypes.string,
    amount: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default Account;

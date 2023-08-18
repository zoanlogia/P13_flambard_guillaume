import { useState } from "react";
import PropTypes from "prop-types";

const Transaction = ({ data }) => {
    console.log(data);
  const [selectedTransaction, setSelectedTransaction] = useState(false);
  const [updateCategory, setUpdateCategory] = useState(false);
  const [updateNotes, setUpdateNotes] = useState(false);

  const toogleTransaction = () => {
    setSelectedTransaction(!selectedTransaction);
  };
  const toogleCategory = () => {
    setUpdateCategory(!updateCategory);
  };
  const toogleNotes = () => {
    setUpdateNotes(!updateNotes);
  };

  return (
    <div className="transaction" onClick={toogleTransaction}>
      <i
        className={
          selectedTransaction ? "fa fa-chevron-up" : "fa fa-chevron-down"
        }
      ></i>
      <div className="transaction-content-wrapper">
        <p className="transaction-date">{data.date}</p>
        <div
          className={
            selectedTransaction ? "transaction-type-wrapper" : "hidden"
          }
        >
          <p>Transaction type:</p>
          <p>{data.type}</p>
        </div>
        <div
          className={
            selectedTransaction ? "transaction-category-wrapper" : "hidden"
          }
        >
          <label htmlFor="category-select">Category:</label>
          <p className="transaction-category">{data.category}</p>
          <i className="fa fa-pencil" onClick={toogleCategory}></i>
          <select
            name="category"
            id="category-select"
            className={updateCategory ? "show" : "hidden"}
          >
            <option value="">--Sélectionnez une catégorie--</option>
            <option value="alimentation">Alimentation</option>
            <option value="services">Services</option>
            <option value="transports">Transports</option>
            <option value="loisirs">Loisirs</option>
            <option value="communications">Communications</option>
            <option value="finances">Finances</option>
          </select>
        </div>
        <div
          className={
            selectedTransaction ? "transaction-notes-wrapper" : "hidden"
          }
        >
          <label htmlFor="category">Notes:</label>
          <p className="transaction-notes">{data.notes}</p>
          <i
            className={updateNotes ? "hidden" : "fa fa-pencil"}
            onClick={toogleNotes}
          ></i>
          <input
            type="text"
            className={updateNotes ? "show" : "hidden"}
            id="notes"
            name="notes"
          />
        </div>
      </div>
      <div className="transaction-body-wrapper">
        <p className="transaction-description">{data.description}</p>
        <p className="transaction-amount">{data.amount}</p>
        <p className="transaction-balance">{data.balance}</p>
      </div>
    </div>
  );
};

Transaction.propTypes = {
    data: PropTypes.shape({
        date: PropTypes.string,
        type: PropTypes.string,
        category: PropTypes.string,
        notes: PropTypes.string,
        description: PropTypes.string,
        amount: PropTypes.string,
        balance: PropTypes.string,
    }),
};

export default Transaction;

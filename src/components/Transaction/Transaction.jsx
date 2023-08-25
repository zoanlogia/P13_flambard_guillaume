import { useState } from "react";
import PropTypes from "prop-types";

const Transaction = ({ data }) => {
  const [selectedTransaction, setSelectedTransaction] = useState(false);
  const [editableField, setEditableField] = useState(null); // 'category', 'notes', or null

  const toggleTransaction = () => {
    setSelectedTransaction((prevState) => !prevState);
  };

  const toggleEdit = (field) => {
    if (editableField === field) {
      setEditableField(null);
    } else {
      setEditableField(field);
    }
  };

  const handleCategoryChange = (e) => {
    // Update the category. This is just a placeholder.
    console.log("New category:", e.target.value);
  };

  const handleNotesChange = (e) => {
    // Update the notes. This is just a placeholder.
    console.log("New notes:", e.target.value);
  };

  return (
    <div className="transaction">
      <i onClick={toggleTransaction}
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
          <i
            className="fa fa-pencil"
            onClick={() => toggleEdit("category")}
          ></i>
          <select
            name="category"
            id="category-select"
            className={editableField === "category" ? "show" : "hidden"}
            onChange={handleCategoryChange}
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
            className={editableField === 'notes' ? "hidden" : "fa fa-pencil"}
            onClick={() => toggleEdit('notes')}
          ></i>
          <input
            type="text"
            className={editableField === 'notes' ? "show" : "hidden"}
            id="notes"
            name="notes"
            onChange={handleNotesChange}
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

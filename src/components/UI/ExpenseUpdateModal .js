import React, { useState } from "react";
import axios from "axios";
import "./ExpenseUpdateModal.css";

const ExpenseUpdateForm = (props) => {
  const [updatedTitle, setUpdatedTitle] = useState(props.title);
  const [updatedAmount, setUpdatedAmount] = useState(props.amount);
  const [updatedDate, setUpdatedDate] = useState(
    props.date.toISOString().split("T")[0]
  );

  const handleTitleChange = (event) => {
    setUpdatedTitle(event.target.value);
  };

  const handleAmountChange = (event) => {
    setUpdatedAmount(event.target.value);
  };

  const handleDateChange = (event) => {
    setUpdatedDate(event.target.value);
  };
  const updatedTitleIsValid = updatedTitle.trim() !== "";
  const updatedAmountIsValid = updatedAmount !== "";
  const updatedDateIsValid = updatedDate.trim() !== "";

  let updateButtonIsValid = false;
  if (updatedTitleIsValid && updatedAmountIsValid && updatedDateIsValid) {
    updateButtonIsValid = true;
  }

  const handleCancel = () => {
    props.onCancel();
  };

  const handleUpdate = () => {
    const updatedExpense = {
      title: updatedTitle,
      amount: updatedAmount,
      date: updatedDate,
    };

    axios.put(
      `https://expense-tracker-t2v6.onrender.com/updateExpense/${props.id}`,
      updatedExpense
    );
    props.onCancel();
  };

  return (
    <div className="modal-overlay">
      <div className="confirmation-modal">
        <div className="update-expense__controls">
          <div className="new-expense__control">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={updatedTitle}
              onChange={handleTitleChange}
            />
          </div>
          <div className="new-expense__control">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              type="number"
              value={updatedAmount}
              onChange={handleAmountChange}
            />
          </div>
          <div className="new-expense__control">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={updatedDate}
              onChange={handleDateChange}
            />
          </div>
          <div className="modal-buttons">
            <button onClick={handleCancel}>Cancel</button>
            <button disabled={!updateButtonIsValid} onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseUpdateForm;

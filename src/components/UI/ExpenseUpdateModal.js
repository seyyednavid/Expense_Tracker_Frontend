import React, { useState } from "react";
import axios from "axios";
import "./ExpenseUpdateModal.css";

const ExpenseUpdateModal = (props) => {
  const { id, title, amount, date, onCancel, expense, setExpense, onMessage } =
    props;

  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedAmount, setUpdatedAmount] = useState(amount);
  const [updatedDate, setUpdatedDate] = useState(
    date.toISOString().split("T")[0]
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
    onCancel();
  };

  const handleUpdate = () => {
    const updatedExpense = {
      id,
      title: updatedTitle,
      amount: updatedAmount,
      date: new Date(updatedDate),
    };

    axios
      .put(`https://expense-tracker-t2v6.onrender.com/updateExpense/${id}`, updatedExpense)
      .then((response) => {
        if (response.status === 200) {
          const expenseAfterUpdate = expense.map((item) => {
            if (item.id === id) {
              return { ...item, ...updatedExpense };
            } else {
              return item;
            }
          });
          setExpense(expenseAfterUpdate);
          onMessage(response.data.message);
        } else {
          alert(response.data.message, response.status);
        }
      })
      .catch((error) => {
        if (error.response.data.error) {
          onMessage(error.response.data.errors);
        } else if (error.response.data.message) {
          onMessage(error.response.data.message);
        } else {
          onMessage(error.message);
        }
      });
    onCancel();
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

export default ExpenseUpdateModal;

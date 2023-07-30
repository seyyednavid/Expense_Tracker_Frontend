import React, { useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import "./ExpenseItem.css";
import axios from "axios";
import ConfirmationModal from "../UI/deleteConfirmationModal";
import ExpenseUpdateModal from "../UI/ExpenseUpdateModal";

const ExpenseItem = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const { id, title, amount, date, onMessage, expense, setExpense } = props;

  const expenseDeleteHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };
  const toggleUpdateForm = () => {
    setShowUpdateForm((prevShowUpdateForm) => !prevShowUpdateForm);
  };

  const updateMessage = (updateMessageFromBackend) => {
    onMessage(updateMessageFromBackend);
  };

  const confirmDeleteHandler = () => {
    axios
      .delete(`https://expense-tracker-t2v6.onrender.com/deleteExpense/${id}`)
      .then((response) => {
        if (response.status === 200) {
          const expenseAfterDelete = expense.filter((item) => item.id !== id);
          setExpense(expenseAfterDelete);
          onMessage(response.data.message);
          setShowModal(false);
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
  };

  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate date={date} />
        <div className="expense-item__description">
          <h2>{title}</h2>
          <div className="expense-item__price">${amount} </div>
          <div className="expense-item__actions">
            <FaTrashAlt
              className="custom-icon"
              onClick={expenseDeleteHandler}
            />
            <FaEdit className="custom-icon" onClick={toggleUpdateForm} />
          </div>
        </div>
      </Card>
      {showModal && (
        <ConfirmationModal
          onCancel={closeModalHandler}
          onConfirm={confirmDeleteHandler}
        />
      )}
      {showUpdateForm && (
        <ExpenseUpdateModal
          id={id}
          title={title}
          amount={amount}
          date={date}
          onCancel={toggleUpdateForm}
          expense={expense}
          setExpense={setExpense}
          onMessage={updateMessage}
        />
      )}
    </li>
  );
};

export default ExpenseItem;

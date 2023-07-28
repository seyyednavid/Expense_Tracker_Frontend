import React, { useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import "./ExpenseItem.css";
import axios from "axios";
import ConfirmationModal from "../UI/deleteConfirmationModal";
import ExpenseUpdateForm from "../UI/ExpenseUpdateModal ";

const ExpenseItem = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const expenseDeleteHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };
  const toggleUpdateForm = () => {
    setShowUpdateForm((prevShowUpdateForm) => !prevShowUpdateForm);
  };

  const confirmDeleteHandler = () => {
    axios
      .delete(
        `https://expense-tracker-t2v6.onrender.com/deleteExpense/${props.id}`
      )
      .then((response) => {
        props.onMessage(response.data.message);
        setShowModal(false);
      })
      .catch((error) => {
        if (error.response.data.error) {
          props.onMessage(error.response.data.errors);
        } else if (error.response.data.message) {
          props.onMessage(error.response.data.message);
        } else {
          props.onMessage(error.message);
        }
      });
  };

  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate date={props.date} />
        <div className="expense-item__description">
          <h2>{props.title}</h2>
          <div className="expense-item__price">${props.amount} </div>
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
        <ExpenseUpdateForm
          id={props.id}
          title={props.title}
          amount={props.amount}
          date={props.date}
          onCancel={toggleUpdateForm}
        />
      )}
    </li>
  );
};

export default ExpenseItem;

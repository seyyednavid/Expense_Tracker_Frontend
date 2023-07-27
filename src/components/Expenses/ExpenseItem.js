import React, { useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import "./ExpenseItem.css";
import axios from "axios";
import ConfirmationModal from "../UI/ConfirmationModal";

const ExpenseItem = (props) => {
  const [showModal, setShowModal] = useState(false);
  const expenseDeleteHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const confirmDeleteHandler = () => {
    axios
      .delete(`http://localhost:3030/deleteExpense/${props.id}`)
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
            <FaEdit className="custom-icon" />
          </div>
        </div>
      </Card>
      {showModal && (
        <ConfirmationModal
          onCancel={closeModalHandler}
          onConfirm={confirmDeleteHandler}
        />
      )}
    </li>
  );
};

export default ExpenseItem;

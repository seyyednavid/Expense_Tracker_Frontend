import React, { useState } from "react";
import ExpenseItem from "./ExpenseItem";
import "./ExpenseList.css";

const ExpenseList = (props) => {
  const [backendDeletedMessage, setBackendDeletedMessage] = useState("");
  if (props.items.length === 0) {
    return <h2 className="expenses-list__fallback">Found no expenses</h2>;
  }
  const deleteMessageHandler = (messageForBackendMessage) => {
    setBackendDeletedMessage(messageForBackendMessage);
    setTimeout(() => {
      setBackendDeletedMessage("");
    }, 3000);
  };

  return (
    <ul className="expenses-list">
      {backendDeletedMessage && (
        <div className="back_message">{backendDeletedMessage}</div>
      )}
      {props.items.map((expense) => (
        <ExpenseItem
          id={expense.id}
          key={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
          onMessage={deleteMessageHandler}
        />
      ))}
    </ul>
  );
};

export default ExpenseList;

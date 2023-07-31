import React, { useState, Fragment } from "react";
import ExpenseItem from "./ExpenseItem";
import "./ExpenseList.css";

const ExpenseList = (props) => {
  const [backendDeletedMessage, setBackendDeletedMessage] = useState("");
  const { items, expense, setExpense } = props;
  if (items.length === 0) {
    return <h2 className="expenses-list__fallback">Found no expenses</h2>;
  }
  const MessageHandler = (messageFormBackend) => {
    setBackendDeletedMessage(messageFormBackend);
    setTimeout(() => {
      setBackendDeletedMessage("");
    }, 3000);
  };

  return (
    <Fragment>
      {backendDeletedMessage && (
        <div className="back_message">{backendDeletedMessage}</div>
      )}
      <ul className="expenses-list">
        {items.map((item) => (
          <ExpenseItem
            id={item._id}
            key={item._id}
            title={item.title}
            amount={item.amount}
            date={item.date}
            onMessage={MessageHandler}
            expense={expense}
            setExpense={setExpense}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default ExpenseList;

import React, { useState } from "react";

import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredTitleIsTouched, setEnteredTitleIsTouched] = useState(false);

  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const enteredTitleIsValid = enteredTitle.trim() !== "";
  const titleIsInValid = !enteredTitleIsValid && enteredTitleIsTouched;

  let formIsValid = false;

  if (enteredTitleIsValid) {
    formIsValid = true;
  }

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const titleBlurHandler = (event) => {
    setEnteredTitleIsTouched(true);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setEnteredTitleIsTouched(true);
    if (!enteredTitleIsValid) {
      return;
    }
    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
    };

    props.onSaveExpenseData(expenseData);
    setEnteredTitle("");
    setEnteredTitleIsTouched(false);
    setEnteredAmount("");
    setEnteredDate("");
  };

  const titleInputClasses = titleIsInValid
    ? "new-expense__control invalid"
    : "new-expense__control";

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className={titleInputClasses}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
          />
          {titleIsInValid && (
            <p className="error-text">Title must not be empty</p>
          )}
        </div>
        <div className="new-expense__control">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button disabled={!formIsValid} type="submit">
          Add Expense
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;

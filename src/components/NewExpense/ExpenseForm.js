import React, { useState } from "react";

import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredTitleIsTouched, setEnteredTitleIsTouched] = useState(false);

  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredAmountIsTouched, setEnteredAmountIsTouched] = useState(false);

  const [enteredDate, setEnteredDate] = useState("");
  const [enteredDateIsTouched, setEnteredDateIsTouched] = useState("");

  const enteredTitleIsValid = enteredTitle.trim() !== "";
  const titleIsInValid = !enteredTitleIsValid && enteredTitleIsTouched;

  const enteredAmountIsValid = enteredAmount.trim() !== "";
  const enteredAmountIsInvalid =
    !enteredAmountIsValid && enteredAmountIsTouched;

  const enteredDateIsValid = enteredDate.trim() !== "";
  const enteredDateIsInvalid = !enteredDateIsValid && enteredDateIsTouched;

  let formIsValid = false;
  // Form is valid when all inputs become valid
  if (enteredTitleIsValid && enteredAmountIsValid && enteredDateIsValid) {
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
  const amountBlurHandler = (event) => {
    setEnteredAmountIsTouched(true);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };
  const dateBlurHandler = (event) => {
    setEnteredDateIsTouched(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setEnteredTitleIsTouched(true);
    setEnteredAmountIsTouched(true);
    setEnteredDateIsTouched(true);
    if (!enteredTitleIsValid || !enteredAmountIsValid) {
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
    setEnteredAmountIsTouched(false);
    setEnteredDate("");
    setEnteredDateIsTouched(false);
  };

  const titleInputClasses = titleIsInValid
    ? "new-expense__control invalid"
    : "new-expense__control";
  const amountInputClasses = enteredAmountIsInvalid
    ? "new-expense__control invalid"
    : "new-expense__control";
  const DateInputClasses = enteredDateIsInvalid
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
            <p className="error-text">Title must not be empty!</p>
          )}
        </div>
        <div className={amountInputClasses}>
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={amountChangeHandler}
            onBlur={amountBlurHandler}
          />
          {enteredAmountIsInvalid && (
            <p className="error-text">Amount must not be empty!</p>
          )}
        </div>
        <div className={DateInputClasses}>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            value={enteredDate}
            onChange={dateChangeHandler}
            onBlur={dateBlurHandler}
          />
          {enteredDateIsInvalid && (
            <p className="error-text">Date must not be empty!</p>
          )}
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

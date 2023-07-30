import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import "./newExpenses.css";

const NewExpense = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const { expense, setExpense } = props;
  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  return (
    <div className="new-expense">
      {!isEditing && (
        <button onClick={startEditingHandler}>Add New Expense</button>
      )}
      {isEditing && (
        <ExpenseForm
          onCancel={stopEditingHandler}
          expense={expense}
          setExpense={setExpense}
        />
      )}
    </div>
  );
};

export default NewExpense;

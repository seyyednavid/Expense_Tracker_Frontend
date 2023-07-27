import React, { useState, useEffect } from "react";
import axios from "axios";
import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";

const App = () => {
  const [expense, setExpense] = useState([]);

  function parseISODate(dateString) {
    return new Date(dateString);
  }

  useEffect(() => {
    axios
      .get("http://localhost:3030/")
      .then((response) => {
        // Parse date strings to Date objects
        const expensesWithDates = response.data.data.map((expense) => ({
          ...expense,
          date: parseISODate(expense.date),
        }));
        setExpense(expensesWithDates);
      })
      .catch((error) => console.error("Error fetching data:", error));
  });

  const addExpenseData = (expense) => {
    setExpense((prevState) => {
      return [expense, ...prevState];
    });
  };

  return (
    <div>
      <NewExpense onAddExpenseData={addExpenseData} />
      <Expenses items={expense} />
    </div>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";
import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const App = () => {
  let [expense, setExpense] = useState([]);

  function parseISODate(dateString) {
    return new Date(dateString);
  }

  useEffect(() => {
    axios
      .get("https://expense-tracker-t2v6.onrender.com/")

      .then((response) => {
        // Parse date strings to Date objects
        const expensesWithDates = response.data.data.map((expense) => ({
          ...expense,
          date: parseISODate(expense.date),
        }));
        setExpense(expensesWithDates);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return expense.length ? (
    <div>
      <NewExpense expense={expense} setExpense={setExpense} />
      <Expenses expense={expense} setExpense={setExpense} />
    </div>
  ) : (
    <div style={{ textAlign: "center", fontWeight: "bolder", color: "white", marginTop: "2rem" }}>
      <FontAwesomeIcon icon={faSpinner} spin />
      <p>Loading...</p>
    </div>
  );
};

export default App;

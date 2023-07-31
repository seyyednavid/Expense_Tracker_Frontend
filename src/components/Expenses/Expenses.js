import React, { useState } from "react";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesChart from "./ExpensesChart";
import ExpenseList from "./ExpenseList";
import "./Expenses.css";
import Card from "../UI/Card";

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState("2022");
  const { expense, setExpense } = props;

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };
  const filteredExpenses = expense.filter((item) => {
    return item.date.getFullYear() === Number(filteredYear);
  });
  return (
    expense.length && (
      <div>
        <Card className="expenses">
          <ExpensesFilter
            selected={filteredYear}
            onChangeFilter={filterChangeHandler}
          />
          <ExpensesChart expenses={filteredExpenses} />
          <ExpenseList
            items={filteredExpenses}
            expense={expense}
            setExpense={setExpense}
          />
        </Card>
      </div>
    )
  );
};

export default Expenses;

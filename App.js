import { useState } from "react";

const categories = [
  "Petrol", "Toll", "Installment", "Latitude (BNPL)", "NIB (Insurance)",
  "Optus", "Comsec Investments", "Subscriptions", "Rego", "Whoop",
  "Groceries", "Eating Out", "Shopping", "Gifts", "Credit Card Payment",
  "Friend Loan Payment", "Emergency Savings", "Flex / Buffer"
];

const initialBudget = {
  "Petrol": 500,
  "Toll": 500,
  "Installment": 950,
  "Latitude (BNPL)": 150,
  "NIB (Insurance)": 160,
  "Optus": 110,
  "Comsec Investments": 500,
  "Subscriptions": 136,
  "Rego": 67,
  "Whoop": 44,
  "Groceries": 800,
  "Eating Out": 300,
  "Shopping": 200,
  "Gifts": 150,
  "Credit Card Payment": 1200,
  "Friend Loan Payment": 600,
  "Emergency Savings": 500,
  "Flex / Buffer": 415
};

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ category: "Petrol", amount: "", description: "" });
  const [budget, setBudget] = useState(initialBudget);

  const handleAddExpense = () => {
    if (!newExpense.amount || isNaN(newExpense.amount)) return;
    setExpenses([...expenses, { ...newExpense, amount: parseFloat(newExpense.amount), date: new Date().toLocaleDateString() }]);
    setNewExpense({ ...newExpense, amount: "", description: "" });
  };

  const getTotalSpent = (category) => {
    return expenses.filter(e => e.category === category).reduce((acc, curr) => acc + curr.amount, 0);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Sharun’s Budget Tracker</h1>
      <div style={{ marginBottom: 20 }}>
        <select
          value={newExpense.category}
          onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
          style={{ marginLeft: 10 }}
        />
        <input
          type="text"
          placeholder="Description"
          value={newExpense.description}
          onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
          style={{ marginLeft: 10 }}
        />
        <button onClick={handleAddExpense} style={{ marginLeft: 10 }}>Add Expense</button>
      </div>

      <h2>Summary</h2>
      {categories.map((category) => {
        const spent = getTotalSpent(category);
        const limit = budget[category];
        const isOver = spent > limit;
        return (
          <div key={category} style={{ padding: 10, backgroundColor: isOver ? "#f8d7da" : "#d4edda", marginBottom: 5 }}>
            <strong>{category}</strong>: ${spent.toFixed(2)} / ${limit} {isOver && "(Over Budget!)"}
          </div>
        );
      })}

      <h2>Expenses</h2>
      {expenses.map((expense, index) => (
        <div key={index} style={{ borderBottom: "1px solid #ccc", padding: 5 }}>
          <strong>{expense.category}</strong>: ${expense.amount} — {expense.description} ({expense.date})
        </div>
      ))}
    </div>
  );
}

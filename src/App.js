import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'https://6873896dc75558e273547c2b.mockapi.io/expenseapi/v1/ExpenseTracker';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ title: '', amount: '' });

  // Fetch all expenses
   const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB');
  const fetchExpenses = async () => {
    try {
      const res = await axios.get(API_URL);
      setExpenses(res.data);
    } catch (err) {
      console.error('Error fetching expenses:', err);
    }
  };

  // Add new expense
  const addExpense = async () => {
    if (!form.title || !form.amount) return alert('Please enter title and amount');
    try {
      await axios.post(API_URL, {
      ...form,
      date: formattedDate,
    });
      setForm({ title: '', amount: '' });
      fetchExpenses();
    } catch (err) {
      console.error('Error adding expense:', err);
    }
  };

  // Delete expense
  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchExpenses();
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Enter Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Enter Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
        <button onClick={addExpense}>Add</button>
      </div>

      <div className="list">
        <h2>Expenses</h2>
        <ul>
          {expenses.map((item) => (
            <li key={item.id}>
              <span>{item.title || item.details} - ₹{item.amount}
                <br />
              <small style={{ color: 'gray' }}>📅 {item.date}</small>
              </span>
              <button onClick={() => deleteExpense(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const Transactions = () => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    type: 'income',
    date: '',
    description: ''
  });
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
        const response = await axios.get('http://localhost:3000/transactions', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error.message);
      }
    };
    fetchTransactions();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const deleteTransaction = async (id) => {
    try {
      const token = localStorage.getItem('token');
      console.log("Deleting transaction ID:", id);
  
      const response = await axios.delete(
        `http://localhost:3000/transactions/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
  
      console.log("Delete response:", response.data);
  
      setTransactions((prev) =>
        prev.filter((transaction) => transaction.id !== id)
      );
    } catch (err) {
      console.error("Error deleting transaction:", err.response?.data || err.message);
    }
  }; 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
      const response = await axios.post(
        'http://localhost:3000/transactions',
        {
          amount: parseFloat(formData.amount),
          category: formData.category,
          type: formData.type,
          date: formData.date,
          description: formData.description
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTransactions([...transactions, response.data]);
      setFormData({
        amount: '',
        category: '',
        type: 'income',
        date: '',
        description: ''
      });
    } catch (error) {
      console.error('Error adding transaction:', error.message);
    }
  };

  const colors = [
    '#FF6B6B', '#4ECDC4', '#FFD166', '#45B7D1', '#96CEB4', '#FFEEAD'
  ];

  const expenseData = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

    const incomeData = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

    const expensePieChartData = {
      labels: Object.keys(expenseData),
      datasets: [
        {
          label: 'Expenses by Category',
          data: Object.values(expenseData),
          backgroundColor: Object.keys(expenseData).map((_, i) => colors[i % colors.length]),
          borderColor: Object.keys(expenseData).map((_, i) => colors[i % colors.length]),
          borderWidth: 1
        }
      ]
    };
  
    const incomePieChartData = {
      labels: Object.keys(incomeData),
      datasets: [
        {
          label: 'Income by Category',
          data: Object.values(incomeData),
          backgroundColor: Object.keys(incomeData).map((_, i) => colors[i % colors.length]),
          borderColor: Object.keys(incomeData).map((_, i) => colors[i % colors.length]),
          borderWidth: 1
        }
      ]
    };

  const pieChartOptions = {
    plugins: {
      legend: { position: 'top' },
      tooltip: { enabled: true }
    }
  };

  const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
  let balance = 0;
  const balanceData = sortedTransactions.map((t) => {
    const amt = Number(t.amount);
    balance += t.type === 'income' ? amt : -amt;
    return balance;
  });
  

  const lineChartData = {
    labels: sortedTransactions.map((t) => new Date(t.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Balance Over Time',
        data: balanceData,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        tension: 0.1
      }
    ]
  };

  const lineChartOptions = {
    plugins: {
      legend: { position: 'top' },
      tooltip: { enabled: true }
    },
    scales: {
      x: { title: { display: true, text: 'Date' } },
      y: { title: { display: true, text: 'Balance ($)' }, beginAtZero: false }
    }
  };

  const totalIncome = transactions
  .filter((t) => t.type === 'income')
  .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalExpenses = transactions
  .filter((t) => t.type === 'expense')
  .reduce((sum, t) => sum + parseFloat(t.amount), 0);


  const income = transactions.filter((t) => t.type === 'income');
  const expenses = transactions.filter((t) => t.type === 'expense');

  return (
    <div className="pa4 sans-serif">
    <h2 className="f2 mb4 tc">Transactions</h2>

    <div className="flex flex-wrap justify-center items-start mb5">
      {/* Summary */}
      <div className="w-100 w-50-ns ph2 mb4">
        <h3 className="f3 mb3">Summary</h3>
        <p>Total Income: ${totalIncome.toFixed(2)}</p>
        <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
        <p>Net Balance: ${(totalIncome - totalExpenses).toFixed(2)}</p>
      </div>
  
        {/* Charts in row */}
      <div className="w-100 flex flex-column flex-row-ns justify-center items-start">
        {/* Income Chart */}
        <div className="w-100 w-50-ns ph2 mb4 bg-washed-green pa3 br2 shadow-1">
          <h3 className="f3 mb3">Income by Category</h3>
          {Object.keys(incomeData).length > 0 ? (
            <Pie data={incomePieChartData} options={pieChartOptions} className='grow' />
          ) : (
            <p className="gray i">No income data yet. Try adding an income transaction.</p>
          )}
        </div>
  
        {/* Expense Chart */}
        <div className="w-100 w-50-ns ph2 mb4 bg-washed-red pa3 br2 shadow-1">
          <h3 className="f3 mb3">Expenses by Category</h3>
          {Object.keys(expenseData).length > 0 ? (
            <Pie data={expensePieChartData} options={pieChartOptions} className='grow' />
          ) : (
            <p className="gray i">No expense data to display.</p>
          )}
        </div>
      </div>
  
        {/* Line Chart below the two pie charts */}
      <div className="w-100 ph2 mb5 bg-washed-yellow pa3 br2 shadow-1">
        <h3 className="f3 mb3 tc">Balance Over Time</h3>
        {sortedTransactions.length > 0 ? (
          <Line data={lineChartData} options={lineChartOptions} />
        ) : (
          <p className="gray i tc">No transactions to display.</p>
        )}
      </div>
    </div>
  
      {/* Add Transaction Form */}
      <div className="mb5">
        <h3 className="f3 mb3">Add Transaction</h3>
        <form className="flex flex-column gap3" onSubmit={handleSubmit}>
          <div className="mb3">
            <label className="db mb2">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="input-reset ba b--black-20 pa2 w-100"
            />
          </div>
  
          <div className="mb3">
            <label className="db mb2">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="input-reset ba b--black-20 pa2 w-100"
            />
          </div>
  
          <fieldset className="mb3 bn">
            <legend className="db mb2">Type</legend>
            <label className="mr3">
              <input
                type="radio"
                name="type"
                value="income"
                checked={formData.type === 'income'}
                onChange={handleChange}
                className="mr1"
              />
              Income
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="expense"
                checked={formData.type === 'expense'}
                onChange={handleChange}
                className="mr1"
              />
              Expense
            </label>
          </fieldset>
  
          <div className="mb3">
            <label className="db mb2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="input-reset ba b--black-20 pa2 w-100"
            />
          </div>
  
          <div className="mb3">
            <label className="db mb2">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input-reset ba b--black-20 pa2 w-100"
            />
          </div>
  
          <button
            type="submit"
            className="bg-blue white pa2 br2 pointer dim w-100"
          >
            Add Transaction
          </button>
        </form>
      </div>
  
      {/* Income Table */}
      <div className="mb5">
        <h3 className="f3 mb3">Income</h3>
        <table className="collapse ba br2 b--black-10 pv2 ph3 w-100">
          <thead>
            <tr className="striped--light-gray">
              <th className="pv2 ph3 tl">Amount</th>
              <th className="pv2 ph3 tl">Type</th>
              <th className="pv2 ph3 tl">Category</th>
              <th className="pv2 ph3 tl">Date</th>
              <th className="pv2 ph3 tl">Description</th>
            </tr>
          </thead>
          <tbody>
            {income.map((t) => (
              <tr key={t.id} className="striped--light-gray">
                <td className="pv2 ph3">${t.amount}</td>
                <td className="pv2 ph3">{t.type}</td>
                <td className="pv2 ph3">{t.category}</td>
                <td className="pv2 ph3">{t.date}</td>
                <td className="pv2 ph3">
                  {t.description || 'N/A'}
                  <button
                    onClick={() => deleteTransaction(t.id)}
                    className="ml2 bg-red white pa1 br1 pointer dim"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      {/* Expense Table */}
      <div className="mb5">
        <h3 className="f3 mb3">Expenses</h3>
        <table className="collapse ba br2 b--black-10 pv2 ph3 w-100">
          <thead>
            <tr className="striped--light-gray">
              <th className="pv2 ph3 tl">Amount</th>
              <th className="pv2 ph3 tl">Type</th>
              <th className="pv2 ph3 tl">Category</th>
              <th className="pv2 ph3 tl">Date</th>
              <th className="pv2 ph3 tl">Description</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((t) => (
              <tr key={t.id} className="striped--light-gray">
                <td className="pv2 ph3">${t.amount}</td>
                <td className="pv2 ph3">{t.type}</td>
                <td className="pv2 ph3">{t.category}</td>
                <td className="pv2 ph3">{t.date}</td>
                <td className="pv2 ph3">
                  {t.description || 'N/A'}
                  <button
                    onClick={() => deleteTransaction(t.id)}
                    className="ml2 bg-red white pa1 br1 pointer dim"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  ;}

export default Transactions;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import AllMonths from "./AllMonths";
import IncomeChart from '../ChartGroup/IncomeChart';
import ExpensesChart from '../ChartGroup/ExpensesChart';
import BalanceChart from '../ChartGroup/BalanceChart';
import IncomeTable from '../Tables/IncomeTable';
import ExpenseTable from '../Tables/ExpenseTable';
import AddTransactionsTable from '../Tables/AddTransactionsTable';

ChartJS.register(ArcElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);
const apiUrl = import.meta.env.VITE_API_URL;

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
        const response = await axios.get(`${apiUrl}/transactions`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTransactions(response.data);
        console.log('Fetched transactions:', response.data);

      } catch (error) {
        console.error('Error fetching transactions:', error.message);
      }
    };
    fetchTransactions();
  }, []);

  const totalIncome = transactions
  .filter((t) => t.type === 'income')
  .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalExpenses = transactions
  .filter((t) => t.type === 'expense')
  .reduce((sum, t) => sum + parseFloat(t.amount), 0);


  return (
    <div className="p-8 font-sans bg-gray-50 min-h-screen text-gray-800">
  <h2 className="text-4xl font-semibold text-center mb-10 text-gray-900">Transactions</h2>

  <div className="flex flex-col gap-6 lg:flex-row lg:flex-wrap mb-10">
    <div className="flex-1 min-w-[300px] bg-white p-6 rounded-2xl shadow-md">
      <h3 className="text-2xl font-bold mb-4 text-emerald-600">Summary</h3>
      <p className="text-lg mb-2">Total Income: <span className="font-semibold text-green-500">${totalIncome.toFixed(2)}</span></p>
      <p className="text-lg mb-2">Total Expenses: <span className="font-semibold text-red-500">${totalExpenses.toFixed(2)}</span></p>
      <p className="text-lg">Net Balance: 
        <span className={`font-semibold ml-2 ${totalIncome - totalExpenses >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          ${(totalIncome - totalExpenses).toFixed(2)}
        </span>
      </p>
    </div>

    <div className="flex-1 min-w-[300px] bg-white p-6 rounded-2xl shadow-md">
      <AllMonths transactions={transactions} />
    </div>

    <div className="w-full flex flex-col lg:flex-row gap-6">
      <div className="flex-1 bg-white p-6 rounded-2xl shadow-md">
        <IncomeChart transactions={transactions} />
      </div>
      <div className="flex-1 bg-white p-6 rounded-2xl shadow-md">
        <ExpensesChart transactions={transactions} />
      </div>
    </div>

    <div className="w-full bg-gradient-to-br from-green-300 to-emerald-500 p-6 rounded-2xl shadow-md">
      <BalanceChart transactions={transactions} />
    </div>
  </div>

  <div className="space-y-10">
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <AddTransactionsTable transactions={transactions} setTransactions={setTransactions} />
    </div>
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <IncomeTable transactions={transactions} setTransactions={setTransactions} />
    </div>
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <ExpenseTable transactions={transactions} setTransactions={setTransactions} />
    </div>
  </div>
</div>
  );
  }

export default Transactions;
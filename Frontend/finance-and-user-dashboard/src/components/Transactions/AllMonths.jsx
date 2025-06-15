import React, { useEffect, useState } from 'react';
import MonthlyCard from "./MonthlyCard";
import axios from 'axios';
;
const AllMonths = () => {
    const [monthlyData, setMonthlyData] = useState({});

    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchTransactions = async () => {
          try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');

            const response = await axios.get(`${apiUrl}/transactions`, {
              headers: { Authorization: `Bearer ${token}` }
            });

            const result = {};

            response.data.forEach(money => {
              const month = money.date.slice(0, 7); // 'YYYY-MM'

              if (!result[month]) {
                result[month] = {
                  income: 0,
                  expense: 0,
                  transactions: []
                };
              }

              const amount = parseFloat(money.amount);

              result[month].transactions.push(money);
              result[month][money.type] += amount;
            });

            setMonthlyData(result); // Set after processing is complete
          } catch (error) {
            console.error('Error fetching transactions:', error.message);
          }
        };

        fetchTransactions();
      }, [monthlyData]);

  return (
    <div className='all-months pb-15'>
        <h1>Budget total per month</h1>
      {Object.entries(monthlyData).map(([month, data]) => (
        <MonthlyCard key={month} month={month} data={data} />
      ))}
    </div>
  );
};

export default AllMonths
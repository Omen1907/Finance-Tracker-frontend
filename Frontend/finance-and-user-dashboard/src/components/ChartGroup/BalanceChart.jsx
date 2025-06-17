import React from 'react';
import { Line } from 'react-chartjs-2';

const BalanceChart = ({ transactions }) => {

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
        borderColor: 'rgb(245, 147, 81)',
        backgroundColor: 'rgb(240, 128, 30)',
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

  return (
    <div>
      <h3 className="f3 mb3 tc">Balance Over Time</h3>
        {sortedTransactions.length > 0 ? (
          <Line data={lineChartData} options={lineChartOptions} />
        ) : (
          <p className="gray i tc">No transactions to display.</p>
        )}
    </div>
  )
}

export default BalanceChart
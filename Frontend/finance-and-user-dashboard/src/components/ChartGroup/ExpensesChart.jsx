import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensesChart = ({ transactions }) => {
  const colors = [
    '#F87171', '#FCA5A5','#FDBA74','#FCD34D','#E5B700','#DC2626'
  ];
  
  const expenseData = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + parseFloat(t.amount);
      return acc;
    }, {});

  const expensePieChartData = {
    labels: Object.keys(expenseData),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(expenseData),
        backgroundColor: Object.keys(expenseData).map((_, i) => colors[i % colors.length]),
        borderColor: '#ffffff',
        borderWidth: 2
      }
    ]
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          color: '#374151',
          font: {
            size: 12,
            weight: '500'
          }
        }
      },
      tooltip: {
        enabled: true
      }
    },
    hover: {
      mode: 'nearest',         
      intersect: true          
    },
    interaction: {
      mode: 'nearest',
      intersect: true
    }
  };
  

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full h-[400px]">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Expenses by Category</h3>
      {Object.keys(expenseData).length > 0 ? (
        <div className='relative h-[300px]'>
          <Pie data={expensePieChartData} options={pieChartOptions} className="grow" />
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic">No expense data to display.</p>
      )}
    </div>
  );
};

export default ExpensesChart;

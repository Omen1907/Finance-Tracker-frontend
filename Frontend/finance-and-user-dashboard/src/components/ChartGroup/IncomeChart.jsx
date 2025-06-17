import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const IncomeChart = ({ transactions }) => {
  const colors = [
    '#10B981', '#6EE7B7', '#34D399', '#059669', '#A7F3D0', '#065F46'
  ];

  const incomeData = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + parseFloat(t.amount);
      return acc;
    }, {});

  const incomePieChartData = {
    labels: Object.keys(incomeData),
    datasets: [
      {
        label: 'Income by Category',
        data: Object.values(incomeData),
        backgroundColor: Object.keys(incomeData).map((_, i) => colors[i % colors.length]),
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
    <div className="bg-white rounded-2xl shadow-md p-6 w-full h-[400px] ">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Income by Category</h3>
      {Object.keys(incomeData).length > 0 ? (
        <div className="relative h-[300px]">
          <Pie data={incomePieChartData} options={pieChartOptions} className="grow" />
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic">No income data yet. Try adding an income transaction.</p>
      )}
    </div>
  );
};

export default IncomeChart;

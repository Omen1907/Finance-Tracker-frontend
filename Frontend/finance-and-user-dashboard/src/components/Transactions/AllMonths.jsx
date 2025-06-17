import React, { useMemo } from 'react';
import MonthlyCard from './MonthlyCard';

const AllMonths = ({ transactions }) => {
  const monthlyData = useMemo(() => {
    const result = {};
    transactions.forEach(money => {
      const month = money.date.slice(0, 7); // 'YYYY-MM'
      if (!result[month]) {
        result[month] = { income: 0, expense: 0, transactions: [] };
      }
      const amount = parseFloat(money.amount);
      result[month].transactions.push(money);
      result[month][money.type] += amount;
    });
    return result;
  }, [transactions]);

  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Budget Total per Month</h2>

      <div className="flex gap-4 overflow-x-auto whitespace-nowrap pb-2">
        {Object.entries(monthlyData).map(([month, data]) => (
          <MonthlyCard key={month} month={month} data={data} />
        ))}
      </div>
    </div>
  );
};

export default AllMonths;

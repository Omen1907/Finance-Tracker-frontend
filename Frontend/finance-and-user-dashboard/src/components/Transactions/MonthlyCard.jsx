import React from 'react';

const MonthlyCard = ({ month, data }) => {
  const formattedMonth = new Date(`${month}-01`).toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  const net = data.income - data.expense;
  const isPositive = net >= 0;

  return (
    <div
      className={`
        min-w-[130px] px-4 py-3 rounded-2xl shadow-md text-center
        ${isPositive ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}
        hover:scale-105 transition-transform duration-200 cursor-pointer select-none
      `}
      title={`${formattedMonth} — Net: $${net.toFixed(2)}`}
    >
      <h2 className="text-sm font-semibold tracking-wide">{formattedMonth}</h2>
      <p className="text-lg font-bold mt-1">${net.toFixed(2)}</p>
    </div>
  );
};

export default MonthlyCard;

import React from 'react';

const Monthly = ({ month, data }) => {
  const formattedMonth = new Date(`${month}-01`).toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  const net = data.income - data.expense;

  return (
    <div className='month-card'>
      <h1 className='month'>{formattedMonth}</h1>
      <p>Income: ${data.income.toFixed(2)}</p>
      <p>Expenses: ${data.expense.toFixed(2)}</p>
      <p>Net: ${net.toFixed(2)}</p>
    </div>
  );
};

export default Monthly;

{/* Add filters by year, type, or category

Animate the cards (Framer Motion, maybe) */}
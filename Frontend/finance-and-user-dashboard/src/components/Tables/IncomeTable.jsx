import React from 'react'
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;


const IncomeTable = ({ transactions, setTransactions }) => {

    console.log('IncomeTable received transactions:', transactions);


    const deleteTransaction = async (id) => {
        try {
          const token = localStorage.getItem('token');
          console.log("Deleting transaction ID:", id);
      
          const response = await axios.delete(
            `${apiUrl}/transactions/${id}`,
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

    const income = transactions.filter((t) => t.type.toLowerCase() === 'income');

    console.log('Filtered income:', income);

  return (
    <div style={{ border: '5px solid red' }}>
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
                <td className="pv2 ph3 text-black">${t.amount}</td>
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
  )
}

export default IncomeTable
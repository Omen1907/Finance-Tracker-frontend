import React, { useState } from 'react'
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;


const AddTransactionsTable = ({ transactions, setTransactions}) => {
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        type: 'income',
        date: '',
        description: ''
      });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const token = localStorage.getItem('token');
          if (!token) throw new Error('No token found');
          const response = await axios.post(
            `${apiUrl}/transactions`,
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
      
  return (
    <div>
        <h3 className="f3 b mb3">Add Transaction</h3>
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
            className="bg-orange-500 white pa2 br2 pointer dim w-100"
          >
            Add Transaction
          </button>
        </form>
    </div>
  )
}

export default AddTransactionsTable
import React, { useState } from 'react';
import "tailwindcss";
import AuthPage from '../AuthPage/AuthPage';

const Register = ({ loadUser, onRouteChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL;

  const onEmailChange = (event) => {
    setEmail(event.target.value);
    setError('');
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
    setError('');
  };

  const onSubmitRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/register`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
      const data = await response.json();
      if (response.ok) {
        loadUser(data.user);
        onRouteChange('home');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Failed to connect to server', err);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600"></div>
      <div className="w-1/2 flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-center text-2xl font-semibold mb-6 text-gray-800">Register</h2>
          <form onSubmit={onSubmitRegister} className="flex flex-col space-y-4">
            <div>
              <label htmlFor="email-address" className="block mb-2 font-medium text-gray-700">
                Email
              </label>
              <input
                id="email-address"
                type="email"
                value={email}
                onChange={onEmailChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={onPasswordChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-400 text-white font-medium rounded-md hover:bg-blue-500 transition duration-200 cursor-pointer"
            >
              Register
            </button>
          </form>
          <p className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{' '}
            <span
              onClick={() => onRouteChange('signin')}
              className="text-blue-400 underline cursor-pointer hover:text-blue-500"
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
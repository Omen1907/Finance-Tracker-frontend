import React, { useState } from 'react';

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
    <div className="flex justify-center items-center vh-100 bg-light-gray">
      <div className="w-90 w-50-m w-30-l pa4 br3 shadow-1 bg-white">
        <h2 className="tc f3 mb4">Register</h2>
        <form onSubmit={onSubmitRegister} className="flex flex-column">
          <div className="mb3">
            <label htmlFor="email-address" className="db mb2 fw6">
              Email
            </label>
            <input
              id="email-address"
              type="email"
              value={email}
              onChange={onEmailChange}
              required
              className="pa2 input-reset ba bg-transparent w-100 br2"
            />
          </div>
          <div className="mb3">
            <label htmlFor="password" className="db mb2 fw6">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={onPasswordChange}
              required
              className="pa2 input-reset ba bg-transparent w-100 br2"
            />
          </div>
          {error && <p className="red f6 mb3">{error}</p>}
          <button
            type="submit"
            className="b ph3 pv2 input-reset ba b--black bg-dark-green white grow pointer br2"
          >
            Register
          </button>
        </form>
        <p className="tc mt3 f6">
          Already have an account?{' '}
          <span
            onClick={() => onRouteChange('signin')}
            className="blue underline pointer"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;

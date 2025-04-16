import { useState, useEffect } from 'react';
import Register from './components/Register/Register';
import Signin from './components/Signin/Signin';
import Transactions from './components/Transactions/Transactions';
import 'tachyons/css/tachyons.min.css';


function App() {
  const [route, setRoute] = useState('signin');
  const [user, setUser] = useState({
    id: '',
    email: ''
  });

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/api/something`)
      .then(res => res.json())
      .then(data => console.log(data));
  }, [apiUrl]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setRoute('home');
    }
  }, []);

  const loadUser = (data) => {
    setUser({
      id: data.id,
      email: data.email
    });
    setRoute('home');
  };

  const onRouteChange = (route) => {
    if (route === 'signout') {
      setUser({ id: '', email: '' });
      localStorage.removeItem('token');
      setRoute('signin');
    } else {
      setRoute(route);
    }
  };

  return (
    <div className="min-vh-100 bg-light-gray flex flex-column items-center pa4">
      {route === 'signin' ? (
        <div className="w-100 w-90-m w-60-l center">
          <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
        </div>
      ) : route === 'register' ? (
        <div className="w-100 w-90-m w-60-l center">
          <Register loadUser={loadUser} onRouteChange={onRouteChange} />
        </div>
      ) : (
        <div className="w-100 w-100-m w-70-l center bg-white br3 pa4">
          <div className="flex justify-between items-center mb4">
            <h1 className="f3 fw4 dark-gray">Dashboard</h1>
            <button
              className="f6 link dim ba bw1 ph3 pv2 mb2 dib dark-red br2 pointer"
              onClick={() => onRouteChange('signout')}
            >
              Sign Out
            </button>
          </div>
          <Transactions />
        </div>
      )}
    </div>
  );
}

export default App;

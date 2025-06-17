import { useState, useEffect } from 'react';
import Register from './components/Register/Register';
import Signin from './components/Signin/Signin';
import Transactions from './components/Transactions/Transactions';
import 'tachyons/css/tachyons.min.css';
import "./App.css"
import Navbar from './components/NavBar/Navbar';

const apiUrl = import.meta.env.VITE_API_URL;

function App() {
  const [route, setRoute] = useState('signin');
  const [user, setUser] = useState({
    id: '',
    email: ''
  });

  console.log('API URL:', apiUrl);

  useEffect(() => {
    if (!apiUrl) {
      console.error('VITE_API_URL is not defined');
      return;
    }
    if (route !== 'home') return; // Only fetch when on home route
  
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
  
    const controller = new AbortController();
    fetch(`${apiUrl}/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('Transactions:', data); // Update state instead in real app
      })
      .catch(error => {
        if (error.name === 'AbortError') return;
        console.error('Fetch error:', error);
      });
  
    return () => controller.abort();
  }, [apiUrl, route]);

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
    <div className="flex min-h-screen">
      {/* Left sidebar */}
      <div className="w-1/4 bg-light-gray">
        <Navbar />
      </div>
  
      {/* Right main content */}
      <div className="flex-grow bg-white p-4">
        {route === 'signin' ? (
          <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
        ) : route === 'register' ? (
          <Register loadUser={loadUser} onRouteChange={onRouteChange} />
        ) : (
          <div className="bg-white br3 pa4">
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
    </div>
  );  
}

export default App;

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { username, password });
      localStorage.setItem('token', response.data.token);
      login(username);  
      navigate('/protected');  
    } catch (error) {
      setError('Invalid login credentials. Please try again.');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center bg-gray-100 min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <p className="text-center mb-4 text-gray-600">
            Welcome back! Please login to continue.
          </p>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-6 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <div><Link className='flex items-center justify-center font-bold text-xl' to="/">Go To Register Page</Link></div>
      <div><Link className='flex items-center justify-center font-bold text-xl' to="/protected">Go To Protected Page</Link></div>
    </div>
  );
}

export default Login;

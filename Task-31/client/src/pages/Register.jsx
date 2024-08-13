import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import { Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/auth/register`, { username, password });
      alert('Registration successful');
    } catch (error) {
      setError('Registration unsuccessful. User may already exist.');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center bg-gray-100 min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
          <p className="text-center mb-4 text-gray-600">
            Create an account to access the protected content.
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
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Register
            </button>
          </form>
        </div>
      </div>
      <div><Link className='flex items-center justify-center font-bold text-xl' to="/login">Go To Login Page</Link></div>
      <div><Link className='flex items-center justify-center font-bold text-xl' to="/protected">Go To Protected Page</Link></div>
    </div>
  );
}

export default Register;

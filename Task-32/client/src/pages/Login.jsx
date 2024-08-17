import { useState } from 'react';
import axios from 'axios';
import { HOST_URL } from '../config';

const Login = ({ setToken, setRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const response = await axios.post(`${HOST_URL}/login`, {
        email,
        password,
      });
      setToken(response.data.token);
      setRole(response.data.role);  
      alert('Login successful');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          className="p-2 rounded bg-gray-800 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          placeholder="Password"
          className="p-2 rounded bg-gray-800 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={login} className="p-2 bg-green-600 rounded">
        Login
      </button>
    </div>
  );
};

export default Login;

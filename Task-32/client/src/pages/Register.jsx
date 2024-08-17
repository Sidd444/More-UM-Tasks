import { useState } from 'react';
import axios from 'axios';
import { HOST_URL } from '../config';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState('user');
  const [password, setPassword] = useState('');

  const register = async () => {
    try {
      const response = await axios.post(`${HOST_URL}/register`, {
        name,
        email,
        age,
        role,
        password,
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      {/* Input fields for registration */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          className="p-2 rounded bg-gray-800 text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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
          type="number"
          placeholder="Age"
          className="p-2 rounded bg-gray-800 text-white"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <select
          className="p-2 rounded bg-gray-800 text-white"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
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
      <button onClick={register} className="p-2 bg-blue-600 rounded">
        Register
      </button>
    </div>
  );
};

export default Register;

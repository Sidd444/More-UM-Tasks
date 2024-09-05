import React, { useState } from 'react';
import axios from 'axios';
import SERVER_URL from './url';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: ''
  });
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${SERVER_URL}`, formData);
      setMessage(response.data.message);
      setFormData({ name: '', email: '', phoneNumber: '' });
    } catch (error) {
      setMessage('Error submitting form');
      console.error(error);
    }
  };


  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-2 gap-10 w-4/5">
        <div className="bg-white shadow-lg rounded-lg p-6 w-[40vw] h-[80vh]">
          <h4 className="text-center text-xl font-semibold mb-6">User Registration</h4>
          {message && <div className="bg-blue-100 text-blue-700 p-3 rounded mb-4">{message}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700">Name</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit</button>
          </form>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 w-[40vw] h-[80vh]">
          <h4 className="text-center text-xl font-semibold mb-6">Users List</h4>
          <button onClick={fetchUsers} className="w-full bg-gray-500 text-white p-2 rounded mb-4">
            Fetch Users From Database
          </button>
          <div className="overflow-y-auto h-64 border border-gray-300 p-4">
            {users.length > 0 ? (
              <ul className="space-y-2">
                {users.map((user) => (
                  <li key={user._id} className="bg-gray-100 p-2 rounded">
                    <strong>Name:</strong> {user.name} <br />
                    <strong>Email:</strong> {user.email} <br />
                    <strong>Phone:</strong> {user.phoneNumber}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No users available</p>
            )}
          </div>
        </div>
      </div>
    </div>


  );
};

export default App;

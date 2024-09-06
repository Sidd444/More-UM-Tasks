import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import SERVER_URL from '../server_url'

const DataForm = (props) => {
  const [formData, setFormData] = useState({ name: '', value: '', category: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${SERVER_URL}/api/data`, formData);
      toast.success('Data added successfully');
      props.setAddToDB(props.addToDB+1);
    } catch {
      toast.error('Failed to add data');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded">
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="border p-2 mb-2 w-full"/>
      <input type="number" name="value" placeholder="Value" value={formData.value} onChange={handleChange} className="border p-2 mb-2 w-full"/>
      <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="border p-2 mb-2 w-full"/>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
};

export default DataForm;

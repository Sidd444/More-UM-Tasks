import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({ name: '', value: '', category: '' });
  const [data, setData] = useState([]);
  const [aggregatedData, setAggregatedData] = useState([]);

  const fetchAggregatedData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/aggregate');
      setAggregatedData(res.data);
    } catch (err) {
      console.error('Error fetching aggregated data', err);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/data');
      setData(res.data);
    } catch (err) {
      console.error('Error fetching data', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/data', formData);
      setFormData({ name: '', value: '', category: '' });
      fetchData();
      fetchAggregatedData();
    } catch (err) {
      console.error('Error submitting data', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/data/${id}`);
      fetchData();
    } catch (err) {
      console.error('Error deleting data', err);
    }
  };

  useEffect(() => {
    fetchAggregatedData();
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-5">
      <h1 className="text-3xl mb-6">Data Aggregator</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4 w-96">
        <input
          className="w-full p-2 rounded bg-gray-700"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          className="w-full p-2 rounded bg-gray-700"
          type="number"
          placeholder="Value"
          value={formData.value}
          onChange={(e) => setFormData({ ...formData, value: e.target.value })}
        />
        <input
          className="w-full p-2 rounded bg-gray-700"
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        />
        <button type="submit" className="w-full p-2 bg-blue-600 rounded">Submit</button>
      </form>

      <div className="w-96 mb-6">
        <h2 className="text-2xl mb-4">Aggregated Data</h2>
        <pre>{JSON.stringify(aggregatedData, null, 2)}</pre>
      </div>

      <div className="w-96">
        <h2 className="text-2xl mb-4">All Data</h2>
        <ul>
          {data.map((item) => (
            <li key={item._id} className="flex justify-between mb-2">
              <span>{item.name} - {item.value} ({item.category})</span>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-600 p-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import { HOST_URL } from '../config';

const Protected = ({ token }) => {
  const [role, setRole] = useState('');
  const [data, setData] = useState('');

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setRole(decodedToken.role);
        console.log('Role:', decodedToken.role);  
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [token]);

  const saveData = async () => {
    try {
      const response = await axios.post(`${HOST_URL}/save`, { data: "Sample Data" }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const readData = async () => {
    try {
      const response = await axios.get(`${HOST_URL}/read`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(JSON.stringify(response.data, null, 2));
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  if (!token) {
    return <div className="text-center text-2xl">Login first</div>;
  }

  if (role !== 'admin') {
    return <div className="text-center text-2xlnode">Only admin has permission </div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="mb-4">
        {/* <button onClick={saveData} className="p-2 bg-yellow-600 rounded">
          Save Data
        </button> */}
        <button onClick={readData} className="p-2 bg-purple-600 rounded">
          Read Data
        </button>
      </div>
      {data && (
        <pre className="bg-gray-800 p-2 rounded w-80 text-left">
          {data}
        </pre>
      )}
    </div>
  );
};

export default Protected;

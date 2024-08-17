import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Protected from './pages/Protected';
import * as jwtDecode from 'jwt-decode';


const App = () => {
  const [token, setToken] = useState('');

  const [role, setRole] = useState('');

  const login = async () => {
    try {
      const response = await axios.post(`${HOST_URL}/login`, { username, password });
      const { token } = response.data;
      setToken(token);

      
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;
      setRole(userRole);

      alert('Login successful');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<div className="text-white p-4">Home</div>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setToken={setToken} setRole={setRole} />} />
        <Route path="/protected" element={<Protected token={token} role={role} />} />
      </Routes>
    </Router>
  );
};

export default App;

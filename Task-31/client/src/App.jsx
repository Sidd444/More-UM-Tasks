import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Protected from './pages/Protected';
import Navbar from './components/Navbar';
import Authorize from './pages/Authorize';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/protected" element={<Protected />} />
          <Route path="/authorize" element={<Authorize />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

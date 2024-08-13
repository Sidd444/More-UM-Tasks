import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { auth, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <div className="flex space-x-4">
          <Link to="/register" className="hover:bg-gray-700 p-2 rounded">
            Register
          </Link>
          <Link to="/login" className="hover:bg-gray-700 p-2 rounded">
            Login
          </Link>
          <Link to="/protected" className="hover:bg-gray-700 p-2 rounded">
            Protected
          </Link>
          <Link to="/authorize" className="hover:bg-gray-700 p-2 rounded">
            Authorize
          </Link>
        </div>
        <div className="flex space-x-4">
          {auth.email ? (
            <>
              <span className="font-bold">{auth.email}</span>
              <button onClick={logout} className="hover:bg-red-600 p-2 rounded">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:bg-gray-700 p-2 rounded">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

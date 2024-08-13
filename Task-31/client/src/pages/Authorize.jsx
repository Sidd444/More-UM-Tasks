import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Authorize() {
  const { auth, authorize } = useContext(AuthContext);

  const handleAuthorize = () => {
    authorize();  
  };

  return (
    <div>
      <div className="flex items-center justify-center bg-gray-100 min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center mb-6">
            {auth.email ? 'Authorize Access' : 'Unauthorized Access'}
          </h2>
          <p className="text-center mb-4 text-gray-600">
            {auth.email ? `Authorize your email (${auth.email}) to access protected content.` : 'Please log in to authorize access.'}
          </p>
          {auth.email && (
            <button
              onClick={handleAuthorize}
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Authorize
            </button>
          )}
        </div>
      </div>
      <div><Link className='flex items-center justify-center font-bold text-xl' to="/protected">Go To Protected Page</Link></div>
    </div>
  );
}

export default Authorize;

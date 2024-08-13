import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Protected() {
  const { auth } = useContext(AuthContext);

  return (
    <div>
      <div className="flex items-center justify-center bg-gray-100 min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center mb-6">Protected Page</h2>
          <p className="text-center mb-4 text-gray-600">
            {!auth.email
              ? 'Please log in to view this page.'
              : auth.isAuthorized
              ? `Welcome, ${auth.email}! You have access to this protected content.`
              : 'Your email is not authorized to view this content.'}
          </p>
        </div>
      </div>
      <div><Link className='flex items-center justify-center font-bold text-xl' to="/">Go To Home Page</Link></div>
      <div><Link className='flex items-center justify-center font-bold text-xl' to="/authorize">Go To Authorize Page</Link></div>
    </div>
  );
}

export default Protected;

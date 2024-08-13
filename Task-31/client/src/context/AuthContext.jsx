import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    email: null,
    isAuthorized: false,
  });

  const login = (email) => {
    setAuth({ email, isAuthorized: false });
  };

  const authorize = () => {
    setAuth((prevAuth) => ({ ...prevAuth, isAuthorized: true }));
  };

  const logout = () => {
    setAuth({ email: null, isAuthorized: false });
  };

  return (
    <AuthContext.Provider value={{ auth, login, authorize, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

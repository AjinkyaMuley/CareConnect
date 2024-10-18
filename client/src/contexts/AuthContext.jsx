// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const loginStatus = localStorage.getItem('user_login') === 'true';
    setIsLoggedIn(loginStatus);
    if (loginStatus) {
      setUserEmail(localStorage.getItem('user') || '');
    }
  }, []);

  const login = (email) => {
    localStorage.setItem('user_login', 'true');
    localStorage.setItem('user', email);
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const logout = () => {
    localStorage.removeItem('user_login');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserEmail('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
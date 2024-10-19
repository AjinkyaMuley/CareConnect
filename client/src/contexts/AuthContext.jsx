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

  const login = (email,isWorker,id) => {
    localStorage.setItem('user_login', 'true');
    localStorage.setItem('user', email);
    localStorage.setItem('isWorker',isWorker);
    localStorage.setItem('user_id',id)
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const logout = () => {
    localStorage.removeItem('user_login');
    localStorage.removeItem('user');
    localStorage.removeItem('isWorker');
    localStorage.removeItem('user_id')
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
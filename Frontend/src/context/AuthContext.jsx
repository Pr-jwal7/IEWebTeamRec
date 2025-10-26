import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// 1. Create the Context
const AuthContext = createContext();

// Backend API URL (use the port your backend is running on)
const API_URL = 'http://localhost:5000/api/users/';

export const AuthProvider = ({ children }) => {
  // Initialize user state from localStorage for persistence
  const [user, setUser] = useState(() => {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  });

 
  // Login function - handles API call and persistence
  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        `${API_URL}login`,
        { email, password }
      );
      
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      
      throw error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    }
  };

  // Logout function

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
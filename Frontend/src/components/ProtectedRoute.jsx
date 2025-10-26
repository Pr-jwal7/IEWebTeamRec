import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// This component checks if the user is authenticated.
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  // If authenticated (user is in state), render the nested component (Outlet)
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
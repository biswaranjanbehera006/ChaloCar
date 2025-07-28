import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a small delay to allow context to read localStorage
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100); // Delay can be tuned

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return null; // or a loading spinner

  // Not logged in
  if (!user) return <Navigate to="/login" replace />;

  // Role mismatch
  if (role && user.role !== role) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;

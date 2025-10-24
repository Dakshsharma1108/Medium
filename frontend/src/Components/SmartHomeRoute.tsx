import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthProtection } from '../hooks/useAuthProtection';
import { Home } from '../Pages/Home';
import { MediumLoader } from './Loader';

export const SmartHomeRoute: React.FC = () => {
  const { isAuthenticated, loading } = useAuthProtection();

  // Show loading while checking auth status
  if (loading) {
    return <MediumLoader />;
  }

  // If authenticated, redirect to blogs
  if (isAuthenticated) {
    return <Navigate to="/blogs" replace />;
  }

  // If not authenticated, show home page
  return <Home />;
};
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthProtection } from '../hooks/useAuthProtection';
import { LoadingSpinner } from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/signin' 
}) => {
  const { isAuthenticated, loading } = useAuthProtection();
  const location = useLocation();

  // Show loading spinner while checking auth status
  if (loading) {
    return <LoadingSpinner />;
  }

  // If not authenticated, redirect to signin with current location
  if (!isAuthenticated) {
    return (
      <Navigate 
        to={redirectTo} 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  // If authenticated, render the protected component
  return <>{children}</>;
};

// Higher-order component version for class components (if needed)
export const withProtection = <P extends object>(
  Component: React.ComponentType<P>,
  redirectTo: string = '/signin'
) => {
  return (props: P) => (
    <ProtectedRoute redirectTo={redirectTo}>
      <Component {...props} />
    </ProtectedRoute>
  );
};
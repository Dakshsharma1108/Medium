import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Api } from '../config';
import { useAlert } from '../Components/Alerts';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

export const useAuthProtection = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
  });
  
  const navigate = useNavigate();
  const location = useLocation();
  const { showError, showInfo } = useAlert();

  // Check if user is authenticated on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false,
      });
      return false;
    }

    try {
      // Verify token with backend
      const response = await axios.get(`${Api}/auth/me`, {
        headers: {
          Authorization: token,
        },
      });

      if (response.data.success) {
        setAuthState({
          isAuthenticated: true,
          user: response.data.user,
          loading: false,
        });
        return true;
      } else {
        // Invalid token, remove it
        localStorage.removeItem('token');
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false,
        });
        return false;
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      showError('Session expired. Please login again.', 'Session Expired');
      // Remove invalid token
      localStorage.removeItem('token');
      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false,
      });
      return false;
    }
  };

  const login = (token: string, user: User) => {
    localStorage.setItem('token', token);
    setAuthState({
      isAuthenticated: true,
      user,
      loading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
    });
    showInfo('You have been logged out successfully.', 'Logged Out');
    navigate('/signin');
  };

  const requireAuth = () => {
    if (!authState.loading && !authState.isAuthenticated) {
      // Save the attempted location for redirect after login
      navigate('/signin', { 
        state: { from: location.pathname },
        replace: true 
      });
    }
  };

  return {
    ...authState,
    checkAuthStatus,
    login,
    logout,
    requireAuth,
  };
};
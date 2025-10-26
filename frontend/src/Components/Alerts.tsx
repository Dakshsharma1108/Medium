import React, { useState, useEffect } from 'react';

export interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number;
  onClose?: () => void;
  closable?: boolean;
}

export const Alert: React.FC<AlertProps> = ({
  type,
  title,
  message,
  duration = 5000,
  onClose,
  closable = true,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 300); // Wait for animation to complete
  };

  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      case 'warning':
        return 'text-yellow-600';
      case 'info':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'info':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-md w-full transform transition-all duration-300 ease-in-out ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
      <div className={`border rounded-lg p-4 shadow-lg ${getAlertStyles()}`}>
        <div className="flex items-start">
          <div className={`flex-shrink-0 ${getIconColor()}`}>
            {getIcon()}
          </div>
          <div className="ml-3 flex-1">
            {title && (
              <h3 className="text-sm font-semibold mb-1">
                {title}
              </h3>
            )}
            <p className="text-sm">
              {message}
            </p>
          </div>
          {closable && (
            <div className="ml-auto pl-3">
              <button
                onClick={handleClose}
                className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${getIconColor()} hover:bg-opacity-20 hover:bg-current`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Alert Context for global alert management
interface AlertContextType {
  showAlert: (alert: Omit<AlertProps, 'onClose'>) => void;
  showSuccess: (message: string, title?: string) => void;
  showError: (message: string, title?: string) => void;
  showWarning: (message: string, title?: string) => void;
  showInfo: (message: string, title?: string) => void;
}

const AlertContext = React.createContext<AlertContextType | null>(null);

export const useAlert = () => {
  const context = React.useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

interface AlertState extends AlertProps {
  id: string;
}

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertState[]>([]);

  const showAlert = (alert: Omit<AlertProps, 'onClose'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newAlert: AlertState = {
      ...alert,
      id,
      onClose: () => removeAlert(id),
    };
    setAlerts(prev => [...prev, newAlert]);
  };

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const showSuccess = (message: string, title?: string) => {
    showAlert({ type: 'success', message, title });
  };

  const showError = (message: string, title?: string) => {
    showAlert({ type: 'error', message, title });
  };

  const showWarning = (message: string, title?: string) => {
    showAlert({ type: 'warning', message, title });
  };

  const showInfo = (message: string, title?: string) => {
    showAlert({ type: 'info', message, title });
  };

  return (
    <AlertContext.Provider value={{ showAlert, showSuccess, showError, showWarning, showInfo }}>
      {children}
      {alerts.map(alert => (
        <Alert key={alert.id} {...alert} />
      ))}
    </AlertContext.Provider>
  );
};

// Utility functions for direct use without context
export const createAlert = {
  success: (message: string, title?: string, duration?: number) => ({
    type: 'success' as const,
    message,
    title,
    duration,
  }),
  error: (message: string, title?: string, duration?: number) => ({
    type: 'error' as const,
    message,
    title,
    duration,
  }),
  warning: (message: string, title?: string, duration?: number) => ({
    type: 'warning' as const,
    message,
    title,
    duration,
  }),
  info: (message: string, title?: string, duration?: number) => ({
    type: 'info' as const,
    message,
    title,
    duration,
  }),
};

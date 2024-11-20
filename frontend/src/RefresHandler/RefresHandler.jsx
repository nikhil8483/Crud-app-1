import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function RefresHandler({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      
      // Redirect to dashboard if on public routes
      if (['/', '/login', '/signup'].includes(location.pathname)) {
        navigate('/dashboard', { replace: false });
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [navigate, setIsAuthenticated, location]);

  return null; // No UI rendering
}

export default RefresHandler;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const TokenLogic = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const hasToken = !localStorage.getItem("token");

    if (hasToken) {
      // Redirect to the '/login' route if token is not present
      navigate('/login');
    }
  }, [navigate]);

  return children;
};

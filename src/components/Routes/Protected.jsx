import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function Protected({ children }) {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (token) {
        try {
          // Authorize from backend
          const response = await fetch(`${import.meta.env.VITE_AUTH_URL}/api/v1/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // If response status not 200, redirect to /login
          if (response.status !== 200) {
            localStorage.removeItem('token');
            navigate('/login');
          }
        } catch (error) {
          if (error.response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
          }
        }
      }
    })();
  }, [token, navigate]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default Protected;

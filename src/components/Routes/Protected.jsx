import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setUser } from '@/features/user/userSlice';

function Protected({ children }) {
  const token = useSelector((state) => state.user.token);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (token) {
        try {
          // Authorize from backend
          const response = await fetch(`${import.meta.env.VITE_AUTH_URL}api/v1/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const result = await response.status;
          // If response status not 200, redirect to /login
          if (result !== 200) {
            localStorage.removeItem('token');
            dispatch(setUser({ email: null, name: null }));
            navigate('/login');
          }
        } catch (error) {
          if (error) {
            localStorage.removeItem('token');
            dispatch(setUser({ email: null, name: null }));
            navigate('/login');
          }
        }
      }
    })();
  }, [token]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default Protected;

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setUser } from '@/features/user/userSlice';

const token = localStorage.getItem('token');

const navigate = useNavigate();
const dispatch = useDispatch();

/**
 * Check if user token is valid or not. That's it.
 */
const isValidToken = async () => {
  const response = await fetch(`${import.meta.env.VITE_AUTH_URL}api/v1/auth/me`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  });
  const verifyResult = await response.status;
  if (verifyResult === 401) {
    localStorage.removeItem('token');
    dispatch(setUser({ name: null, email: null }));
  }
  if (verifyResult === 200) {
    navigate('/');
  }
};

export default isValidToken;

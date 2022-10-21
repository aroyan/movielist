import React from 'react';
import { Button, Center, Text } from '@chakra-ui/react';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Google from './Icons/Google';
import { setUser } from '@/features/user/userSlice';

export default function GoogleButton({ type }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleAuth = useGoogleLogin({
    onSuccess: async (res) => {
      const data = {
        access_token: res.access_token,
      };

      try {
        const response = await fetch(`${import.meta.env.VITE_AUTH_URL}api/v1/auth/google`, {
          headers: {
            'Content-type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(data),
        });
        const result = await response.json();
        try {
          const verify = await fetch(`${import.meta.env.VITE_AUTH_URL}api/v1/auth/me`, {
            headers: {
              Authorization: `Bearer ${result.token}`,
            },
          });

          const verifyData = await verify.json();
          const verifyStatus = verify.status;

          if (verifyStatus === 200 || verifyStatus === 201) {
            localStorage.setItem('token', result.token);
            dispatch(setUser({ name: verifyData.name, email: verifyData.email }));
            navigate('/');
          }
        } catch (error) {
          localStorage.removeItem('token');
          dispatch(setUser({ name: null, email: '' }));
          return error;
        }
      } catch (error) {
        localStorage.removeItem('token');
        dispatch(setUser({ name: null, email: '' }));
        return error;
      }
      return '';
    },
    onError: (error) => {
      localStorage.removeItem('token');
      dispatch(setUser({ name: null, email: '' }));
      return error;
    },
  });

  return (
    <Button variant="outline" leftIcon={<Google />} onClick={handleGoogleAuth}>
      <Center>
        <Text>{type} with Google</Text>
      </Center>
    </Button>
  );
}

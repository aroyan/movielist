/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Button, Center, Text } from '@chakra-ui/react';
import { useGoogleLogin } from '@react-oauth/google';

import Google from './Icons/Google';

export default function GoogleButton({ type }) {
  const handleGoogleAuth = useGoogleLogin({
    onSuccess: async (res) => {
      const data = {
        access_token: res.access_token,
      };

      try {
        const response = await fetch(`${import.meta.env.VITE_AUTH_URL}/api/v1/auth/google`, {
          headers: {
            'Content-type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(data),
        });
        const result = await response.json();
        return localStorage.setItem('token', JSON.stringify(result));
      } catch (error) {
        return error;
      }
    },
    onError: (error) => error,
  });

  return (
    <Button variant="outline" leftIcon={<Google />} onClick={handleGoogleAuth}>
      <Center>
        <Text>{type} with Google</Text>
      </Center>
    </Button>
  );
}

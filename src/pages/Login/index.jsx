import React, { useEffect, useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormHelperText,
  useToast,
} from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import LoginWithGoogle from '@/components/LoginWithGoogle';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/utils/regex';
import { setUser } from '@/features/user/userSlice';

const baseUrl = import.meta.env.VITE_AUTH_URL;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const data = {
    email,
    password,
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    const response = await fetch(`${baseUrl}api/v1/auth/login`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    });
    const result = await response.json();

    try {
      if (response.status === 200) {
        const verifyToken = await fetch(`${baseUrl}api/v1/auth/me`, {
          headers: {
            Authorization: `Bearer ${result.token}`,
          },
        });
        const verifyResult = await verifyToken.json();
        if (verifyToken.status === 200) {
          localStorage.setItem('token', result.token);
          dispatch(setUser({ email: verifyResult.email, name: verifyResult.name }));
          navigate('/');
        }
      }
      if (response.status === 500) {
        localStorage.removeItem('token');
        dispatch(setUser({ email: null, name: null }));
        toast({
          title: response.statusText,
          description: 'Internal server error',
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'bottom-right',
        });
      }
      if (response.status === 400) {
        localStorage.removeItem('token');
        dispatch(setUser({ email: null, name: null }));
        toast({
          title: response.statusText,
          description: 'email or password is incorrect',
          status: 'warning',
          duration: 2000,
          isClosable: true,
          position: 'bottom-right',
        });
      }
      if (response.status === 401) {
        localStorage.removeItem('token');
        dispatch(setUser({ email: null, name: null }));
        toast({
          title: response.statusText,
          description: 'email or password is incorrect',
          status: 'warning',
          duration: 2000,
          isClosable: true,
          position: 'bottom-right',
        });
      }
    } catch (e) {
      localStorage.removeItem('token');
      dispatch(setUser({ email: null, name: null }));
      return e;
    }
    return '';
  };

  const token = localStorage.getItem('token');

  // Verify on first open if token is valid or not
  useEffect(() => {
    (async () => {
      const response = await fetch(`${baseUrl}api/v1/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const verifyResult = await response.status;
      if (verifyResult === 401) {
        localStorage.removeItem('token');
        dispatch(setUser({ name: null, email: null }));
        navigate('/login');
      }
      if (verifyResult === 200) {
        navigate('/');
      }
    })();
  }, []);

  return (
    <Flex minH="100vh" align="center" justify="center" bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Login</Heading>
        </Stack>
        <Box rounded="lg" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={email} onChange={handleEmail} isRequired />
              <FormHelperText
                color="orange.400"
                display={EMAIL_REGEX.test(email) || email.length < 3 ? 'none' : 'block'}
                w="290px"
              >
                Please enter valid email
              </FormHelperText>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={handlePassword} isRequired />
              <FormHelperText
                color="orange.400"
                display={PASSWORD_REGEX.test(password) || password.length < 8 ? 'none' : 'block'}
                w="290px"
              >
                Password min 8 characters long, contain uppercase, lowercase, & special characters
              </FormHelperText>
            </FormControl>
            <Button
              bg="blue.400"
              color="white"
              _hover={{
                bg: 'blue.500',
              }}
              disabled={!EMAIL_REGEX.test(email) || !PASSWORD_REGEX.test(password)}
              onClick={handleLogin}
            >
              Login
            </Button>
            <LoginWithGoogle type="Login" />
            <Text my="4">
              Don&apos;t have an account yet?{' '}
              <Link to="/register" as={NavLink} color="blue.700" fontWeight="semibold">
                Register here
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Login;

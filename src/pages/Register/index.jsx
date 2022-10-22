import React, { useEffect, useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import LoginWithGoogle from '@/components/LoginWithGoogle';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/utils/regex';
import { setUser } from '@/features/user/userSlice';

const baseUrl = import.meta.env.VITE_AUTH_URL;

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const data = {
    name: `${firstName} ${lastName}`,
    email,
    password,
  };

  // 201 created
  // 401 email not valid
  // 400 email is used

  const handleRegister = async () => {
    const response = await fetch(`${baseUrl}api/v1/auth/register`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    });
    const result = await response.json();
    try {
      if (response.status === 201) {
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
      if (response.status === 400) {
        localStorage.removeItem('token');
        dispatch(setUser({ email: null, name: null }));
        toast({
          title: 'Message',
          description: 'Email is taken or enter valid email',
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
          title: 'Message',
          description: 'Please enter valid email',
          status: 'info',
          duration: 2000,
          isClosable: true,
          position: 'bottom-right',
        });
      }
    } catch (e) {
      localStorage.removeItem('token');
      dispatch(setUser({ email: null, name: null }));
      toast({
        title: 'Warning',
        description: e.message,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }
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
          <Heading fontSize="4xl" textAlign="center">
            Register
          </Heading>
        </Stack>
        <Box rounded="lg" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" value={firstName} onChange={handleFirstName} placeholder="First name" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" value={lastName} onChange={handleLastName} placeholder="Last name" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={email} onChange={handleEmail} placeholder="example@mail.com" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePassword}
                  placeholder="Password"
                />
                <InputRightElement h="full">
                  <Button variant="ghost" onClick={() => setShowPassword(() => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="confirm-password" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={handleConfirmPassword}
                  placeholder="Confirm password"
                />
                <InputRightElement h="full">
                  <Button variant="ghost" onClick={() => setShowPassword(() => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={4} pt={2}>
              <Button
                loadingText="Submitting"
                bg="blue.400"
                color="white"
                _hover={{
                  bg: 'blue.500',
                }}
                disabled={!EMAIL_REGEX.test(email) || !PASSWORD_REGEX.test(password) || !firstName}
                onClick={handleRegister}
              >
                Register
              </Button>
              <LoginWithGoogle type="Register" />
            </Stack>
            <Stack pt={6}>
              <Text align="center">
                Already have an account?{' '}
                <Link color="blue.700" to="/login" fontWeight="semibold" as={NavLink}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

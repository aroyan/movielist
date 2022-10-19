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
  useToast,
} from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';

import LoginWithGoogle from '@/components/LoginWithGoogle';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/utils/regex';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const toast = useToast();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, []);

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Login</Heading>
        </Stack>
        <Box rounded="lg" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={email} onChange={handleEmail} isRequired />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={handlePassword} isRequired />
            </FormControl>
            <Button
              bg="blue.400"
              color="white"
              _hover={{
                bg: 'blue.500',
              }}
              disabled={!EMAIL_REGEX.test(email) || !PASSWORD_REGEX.test(password)}
              onClick={() => {
                toast({
                  title: 'Informesyen',
                  description: 'Not implemented yet',
                  status: 'info',
                  duration: 2000,
                  isClosable: true,
                });
              }}
            >
              Login
            </Button>
            <LoginWithGoogle
              type="Login"
              onClick={() => {
                toast({
                  title: 'Informesyen',
                  description: 'Not implemented yet',
                  status: 'info',
                  duration: 2000,
                  isClosable: true,
                });
              }}
            />
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

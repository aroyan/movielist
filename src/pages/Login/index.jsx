import React from 'react';
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
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

function Login() {
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
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Button
              bg="blue.400"
              color="white"
              _hover={{
                bg: 'blue.500',
              }}
            >
              Login
            </Button>
            <Text my="4">
              Don&apos;t have an account yet?{' '}
              <Link
                to="/register"
                as={NavLink}
                color="blue.700"
                fontWeight="semibold"
              >
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

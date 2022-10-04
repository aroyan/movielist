import React from 'react';
import { Link } from 'react-router-dom';
import { Center, Text } from '@chakra-ui/react';

function NotFound() {
  return (
    <Center width="100vw" height="100vh" flexDir="column">
      <Text>404 Not Found</Text>
      <Link to="/">Home</Link>
    </Center>
  );
}

export default NotFound;

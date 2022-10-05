import React from 'react';
import { NavLink } from 'react-router-dom';
import { Center, Link, Text } from '@chakra-ui/react';

function NotFound() {
  return (
    <Center width="100vw" height="100vh" flexDir="column">
      <Text>404 Not Found</Text>
      <Link
        as={NavLink}
        to="/"
        background="blue.500"
        p="2"
        rounded="md"
        color="white"
        fontWeight="bold"
        width="80px"
        textAlign="center"
        _hover={{
          textDecor: 'none',
          background: 'blue.600',
        }}
      >
        Home
      </Link>
    </Center>
  );
}

export default NotFound;

import React from 'react';
import { Center, Spinner, Text } from '@chakra-ui/react';

function Loading() {
  return (
    <Center width="100vw" height="100vh" alignItems="center" flexDir="column">
      <Text>Loading...</Text>
      <Spinner />
    </Center>
  );
}

export default Loading;

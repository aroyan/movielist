'use client';
import { Box, Flex, Heading } from '@chakra-ui/react';

import Layout from '@/components/Layout';

export default function Home() {
  return (
    <Layout>
      <Box as="article" my="2rem" mx="1rem">
        <Flex align="center" justify="space-between">
          <Heading as="h2">Popular Movie</Heading>
        </Flex>
      </Box>
      <Box as="article" my="2rem" mx="1rem">
        <Flex align="center" justify="space-between">
          <Heading as="h2">Popular TV</Heading>
        </Flex>
      </Box>
    </Layout>
  );
}

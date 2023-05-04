'use client';
import React from 'react';
import { Box } from '@chakra-ui/react';
import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <Box as="main">
      <Navbar />
      {children}
    </Box>
  );
}

export default Layout;

import React, { useState } from 'react';
import {
  Box,
  Flex,
  Input,
  IconButton,
  Button,
  useDisclosure,
  InputGroup,
  InputRightElement,
  FormControl,
  Heading,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, SearchIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  return (
    <Box
      background="rgba(71, 71, 71, 0.6)"
      px={4}
      as="nav"
      left="0"
      top="0"
      position="fixed"
      zIndex="20"
      color="white"
      width="100%"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          colorScheme="red"
        />

        <Heading color="red" as="h1" fontSize="3xl" letterSpacing="-2px">
          <Link to="/">MOVIELIST</Link>
        </Heading>
        <FormControl
          as="form"
          display={{ base: 'none', md: 'block' }}
          onSubmit={(e) => {
            e.preventDefault();
            navigate(`/search?q=${query}`);
          }}
          maxW="300px"
        >
          <InputGroup>
            <InputRightElement>
              <SearchIcon color="gray.400" />
            </InputRightElement>
            <Input
              placeholder="Search movie/ tv show ..."
              borderColor="red"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            />
          </InputGroup>
        </FormControl>

        <Box>
          <Button
            variant="outline"
            colorScheme="red"
            size="sm"
            mr={4}
            rounded="full"
            display={{ base: 'none', md: 'inline-block' }}
            w="75px"
          >
            <Link to="/login">Login</Link>
          </Button>
          <Button variant="solid" colorScheme="red" size="sm" rounded="full">
            <Link to="/register">Register</Link>
          </Button>
        </Box>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <FormControl
            as="form"
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/search?q=${query}`);
            }}
          >
            <InputGroup>
              <InputRightElement>
                <SearchIcon color="gray.400" />
              </InputRightElement>
              <Input
                placeholder="Search movie/ tv show ..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
              />
            </InputGroup>
          </FormControl>
        </Box>
      ) : null}
    </Box>
  );
}

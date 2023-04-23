import React, { useState } from 'react';
import {
  Box,
  Flex,
  Input,
  IconButton,
  Button,
  Link,
  useDisclosure,
  InputGroup,
  InputRightElement,
  FormControl,
  Heading,
  Text,
  HStack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, SearchIcon } from '@chakra-ui/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setUser } from '@/features/user/userSlice';

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [query, setQuery] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.user);

  const user = Boolean(data.name) && Boolean(data.email);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(setUser({ name: '', email: '' }));
  };

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
        <Heading color="red" fontSize="3xl" letterSpacing="-2px" as={NavLink} to="/">
          MOVIELIST
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
          {user ? (
            <HStack display={{ base: 'none', md: 'flex' }}>
              <Text>Welcome {data?.name}</Text>
              <Button onClick={handleLogout} colorScheme="red">
                Logout
              </Button>
            </HStack>
          ) : (
            <>
              {/* <Link as={NavLink} to="/login">
                <Button
                  variant="outline"
                  colorScheme="red"
                  size="sm"
                  mr={4}
                  rounded="full"
                  display={{ base: 'none', md: 'inline-block' }}
                  w="75px"
                >
                  Login
                </Button>
              </Link>
              <Link as={NavLink} to="/register" _hover={{ textDecor: 'none' }}>
                <Button colorScheme="red" rounded="full" size="sm">
                  Register
                </Button>
              </Link> */}
            </>
          )}
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
            <Box>
              {/* <Link as={NavLink} to="/login">
                <Button variant="solid" colorScheme="red" size="sm" mt={4} rounded="md" w="full">
                  Login
                </Button>
              </Link> */}
            </Box>
          </FormControl>
        </Box>
      ) : null}
    </Box>
  );
}

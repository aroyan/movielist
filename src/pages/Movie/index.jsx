/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import React, { useState, useEffect } from 'react';
import {
  Button,
  Box,
  Heading,
  Image,
  Link,
  Text,
  Flex,
  Center,
  //
} from '@chakra-ui/react';
import { useSearchParams, NavLink } from 'react-router-dom';
import Layout from '../../components/Layout';

function Movie() {
  const [data, setData] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });

  const page = searchParams.get('page');

  const fetchData = async (_url, _stateSetter) => {
    const response = await fetch(_url);
    const result = await response.json();
    _stateSetter(result.results);
  };

  const MOVIE_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${
    import.meta.env.VITE_TMDB_API_KEY
  }&page=${page}`;

  useEffect(() => {
    fetchData(MOVIE_URL, setData);
  }, []);

  const handleDecrementPage = () => {
    setSearchParams({ page: +searchParams.get('page') - 1 });
  };

  const handleIncrementPage = () => {
    setSearchParams({ page: +searchParams.get('page') + 1 });
  };

  useEffect(() => {
    fetchData(MOVIE_URL, setData);
  }, [page]);

  return (
    <Layout>
      <Box as="section" mt="64px" mx="1rem" mb="2rem">
        <Heading as="h1" textAlign="center">
          Popular Movies
        </Heading>
        <Flex my="1rem" wrap="wrap" gap="2rem" justify="center">
          {data
            ? data?.map((movie) => (
                <Box
                  key={movie.id}
                  width={{ base: '150px', md: '200px' }}
                  boxShadow="md"
                  rounded="lg"
                >
                  <Link to={`/movie/${movie.id}`} as={NavLink}>
                    <Image
                      rounded="lg"
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      fallbackSrc="https://placekitten.com/200/300"
                      alt={movie.title ?? movie.name}
                      objectFit="cover"
                      width="200"
                    />
                    <Text>{movie.name ?? movie.original_name}</Text>
                  </Link>
                </Box>
              ))
            : ''}
          <br />
        </Flex>
        <Center flexDir="column">
          <Text mb="1rem">Page : {page}</Text>
          <Flex gap="0.5rem">
            <Button
              colorScheme="facebook"
              rounded="full"
              disabled={page <= 1}
              onClick={handleDecrementPage}
            >
              {+page === 1 ? '' : +page - 1}
            </Button>
            <Button disabled rounded="full" colorScheme="orange">
              {page}
            </Button>
            <Button
              colorScheme="facebook"
              rounded="full"
              type="button"
              disabled={page >= 500}
              onClick={handleIncrementPage}
            >
              {+page + 1}
            </Button>
          </Flex>
        </Center>
      </Box>
    </Layout>
  );
}

export default Movie;

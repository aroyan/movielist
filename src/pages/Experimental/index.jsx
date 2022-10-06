import React, { useEffect, useState } from 'react';
import { useSearchParams, NavLink } from 'react-router-dom';
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Link,
  Switch,
  Text,
} from '@chakra-ui/react';
import Layout from '../../components/Layout';

function Experimental() {
  const [searchResult, setSearchResult] = useState(null);
  const [tvResult, setTvResult] = useState(null);

  console.log(
    searchResult && tvResult ? [...searchResult, ...tvResult] : 'Waiting...'
  );

  console.log(tvResult);

  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
  });

  const query = searchParams.get('q');
  const page = searchParams.get('page');

  const SEARCH_MOVIE_URL = `https://api.themoviedb.org/3/search/movie?api_key=${
    import.meta.env.VITE_TMDB_API_KEY
  }&query=${query}&include_adult=false&page=${page}`;

  const SEARCH_TV_URL = `https://api.themoviedb.org/3/search/tv?api_key=${
    import.meta.env.VITE_TMDB_API_KEY
  }&query=${query}&include_adult=false&page=${page}`;

  const handleDecrementPage = () => {
    setSearchParams({
      q: query,
      page: +searchParams.get('page') - 1,
    });
  };

  const handleIncrementPage = () => {
    setSearchParams({
      q: query,
      page: +searchParams.get('page') + 1,
    });
  };

  const handleShowTv = () => {
    setSearchParams({
      q: query,
      page: +searchParams.get('page'),
    });
  };

  useEffect(() => {
    const getData = async (url, _setterData) => {
      const response = await fetch(url);
      const result = await response.json();
      _setterData(result.results);
    };
    getData(SEARCH_MOVIE_URL, setSearchResult);
    getData(SEARCH_TV_URL, setTvResult);
  }, [query, page]);

  return (
    <Layout>
      <Box as="section" mt="64px" mx="1rem" mb="2rem">
        <Heading as="h1" textAlign="center">
          Search result for {query}
        </Heading>
        <FormControl display="flex" alignItems="center" justifyContent="center">
          <FormLabel htmlFor="email-alerts" mb="0">
            Show TV series result instead?
          </FormLabel>
          <Switch id="email-alerts" onChange={handleShowTv} />
        </FormControl>

        <Flex my="1rem" wrap="wrap" gap="2rem" justify="center">
          {searchResult?.map((res) => (
            <Box
              key={res.id}
              width={{ base: '150px', md: '200px' }}
              boxShadow="md"
              rounded="lg"
            >
              <Link to={`/movie/${res.id}`} as={NavLink}>
                <Image
                  rounded="lg"
                  src={`https://image.tmdb.org/t/p/w500${res.poster_path}`}
                  fallbackSrc="https://placekitten.com/200/300"
                  alt={res.title ?? res.name}
                  objectFit="cover"
                  width="200"
                />
                <Text>{res.name ?? res.original_name}</Text>
              </Link>
            </Box>
          ))}
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

export default Experimental;

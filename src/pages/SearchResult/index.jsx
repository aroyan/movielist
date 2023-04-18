import React, { useEffect } from 'react';
import { useSearchParams, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  //
} from '@chakra-ui/react';

import Layout from '@/components/Layout';
import CardMovie from '@/components/CardMovie';
import { getSearchData } from '@/features/movie/movie.actions';

export function SearchResult() {
  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
  });

  const data = useSelector((state) => state.movie.search);
  const dispatch = useDispatch();
  const query = searchParams.get('q');
  const page = searchParams.get('page');

  const filteredData = data?.results?.filter((item) => item.media_type !== 'person') ?? [];

  const { total_pages: totalPages } = data ?? {};

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

  useEffect(() => {
    dispatch(getSearchData(query, page));
  }, [page, query]);

  return (
    <Layout>
      <Box as="section" mt="64px" mx="1rem" mb="2rem">
        <Heading as="h1" textAlign="center">
          Search result for {query}
        </Heading>

        <Flex my="1rem" wrap="wrap" gap={{ base: '1rem', md: '2rem' }} justify="center">
          {filteredData?.map((res) => (
            <Box key={res.id} width={{ base: '150px', md: '200px' }} boxShadow="md" rounded="lg">
              <CardMovie data={res} mediaType={res.media_type} />
            </Box>
          ))}
        </Flex>
        {filteredData?.length > 0 ? (
          <Center flexDir="column">
            <Text mb="1rem">Page : {page}</Text>
            <Flex gap="0.5rem">
              <Button colorScheme="facebook" rounded="full" disabled={page <= 1} onClick={handleDecrementPage}>
                {+page === 1 ? '' : +page - 1}
              </Button>
              <Button disabled rounded="full" colorScheme="orange">
                {page}
              </Button>
              <Button
                colorScheme="facebook"
                rounded="full"
                type="button"
                disabled={page >= totalPages}
                onClick={handleIncrementPage}
              >
                {+page === totalPages ? '' : +page + 1}
              </Button>
            </Flex>
          </Center>
        ) : (
          <Center height="calc(100vh - 200px)" align="center">
            <Text>Sorry, {query} not found</Text>
          </Center>
        )}
      </Box>
    </Layout>
  );
}

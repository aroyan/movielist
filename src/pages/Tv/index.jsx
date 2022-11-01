/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Box,
  Heading,
  Text,
  Flex,
  Center,
  //
} from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';

import Layout from '@/components/Layout';
import CardMovie from '@/components/CardMovie';
import { getAllSeries } from '@/features/movie/movie.actions';

function Tv() {
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });

  const data = useSelector((state) => state.movie.series);
  const dispatch = useDispatch();
  const page = searchParams.get('page');

  const handleDecrementPage = () => {
    setSearchParams({ page: +searchParams.get('page') - 1 });
  };

  const handleIncrementPage = () => {
    setSearchParams({ page: +searchParams.get('page') + 1 });
  };

  useEffect(() => {
    dispatch(getAllSeries(page));
  }, [page]);

  return (
    <Layout>
      <Box as="section" mt="64px" mx="1rem" mb="2rem">
        <Heading as="h1" textAlign="center">
          Popular TV Series
        </Heading>
        <Flex my="1rem" wrap="wrap" gap={{ base: '1rem', md: '2rem' }} justify="center">
          {data
            ? data?.results?.map((tv) => (
                <Box key={tv.id} width={{ base: '150px', md: '200px' }} boxShadow="md" rounded="lg">
                  <CardMovie data={tv} mediaType="tv" />
                </Box>
              ))
            : ''}
        </Flex>
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

export default Tv;

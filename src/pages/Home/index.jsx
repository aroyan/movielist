/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Box, Flex, Heading, Link } from '@chakra-ui/react';

import CardSkeleton from '@/components/CardSkeleton';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import HeroMovie from '@/components/HeroMovie';
import CardMovie from '@/components/CardMovie';

export function Home() {
  const movieSliderOptions = {
    perPage: 6,
    gap: '1rem',
    arrows: false,
    pagination: false,
    breakpoints: {
      1024: {
        perPage: 6,
      },
      768: {
        perPage: 3,
      },
    },
  };

  const heroSliderOptions = {
    type: '',
    arrows: false,
    keyboard: 'global',
    pagination: false,
    autoplay: true,
    interval: 5000,
  };

  return (
    <Layout>
      <Splide options={heroSliderOptions}>
        {trending ? (
          trending?.results?.slice(0, 5).map((movie) => (
            <SplideSlide key={movie.id}>
              <HeroMovie movie={movie} />
            </SplideSlide>
          ))
        ) : (
          <Loading />
        )}
      </Splide>
      <Box as="article" my="2rem" mx="1rem">
        <Flex align="center" justify="space-between">
          <Heading as="h2">Popular Movie</Heading>
          <Link to="/movie" as={NavLink}>
            View All
          </Link>
        </Flex>
        <Splide options={movieSliderOptions}>
          {movies ? (
            movies?.results?.map((movie) => (
              <SplideSlide key={movie.id}>
                <CardMovie data={movie} mediaType="movie" />
              </SplideSlide>
            ))
          ) : (
            <CardSkeleton />
          )}
        </Splide>
      </Box>
      <Box as="article" my="2rem" mx="1rem">
        <Flex align="center" justify="space-between">
          <Heading as="h2">Popular TV</Heading>
          <Link to="/tv" as={NavLink}>
            View All
          </Link>
        </Flex>
        <Splide options={movieSliderOptions}>
          {tvSeries ? (
            tvSeries?.results?.map((tv) => (
              <SplideSlide key={tv.id}>
                <CardMovie data={tv} mediaType="tv" />
              </SplideSlide>
            ))
          ) : (
            <CardSkeleton />
          )}
        </Splide>
      </Box>
    </Layout>
  );
}

/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { NavLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Heading,
  Link,
  //
} from '@chakra-ui/react';
import CardSkeleton from '@/components/CardSkeleton';
import CircularRating from '@/components/CircularRating';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import HeroMovie from '@/components/HeroMovie';
import { TRENDING_URL, MOVIE_URL, TV_URL } from '@/const/endpoints';
import CardMovie from '@/components/CardMovie';

function Home() {
  const [dataHero, setDataHero] = useState(null);
  const [dataMovie, setDataMovie] = useState(null);
  const [dataTv, setDataTv] = useState(null);

  const fetchData = async (_url, _stateSetter) => {
    const response = await fetch(_url);
    const result = await response.json();
    _stateSetter(result.results);
  };

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

  useEffect(() => {
    fetchData(TRENDING_URL, setDataHero);
    fetchData(MOVIE_URL, setDataMovie);
    fetchData(TV_URL, setDataTv);
  }, []);

  return (
    <Layout>
      <Splide options={heroSliderOptions}>
        {dataHero ? (
          dataHero?.slice(0, 5).map((movie) => (
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
          {dataMovie ? (
            dataMovie?.map((movie) => (
              <SplideSlide key={movie.id}>
                <CardMovie data={movie} mediaType="movie" />
                <CircularRating data={movie.vote_average} />
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
          {dataTv ? (
            dataTv?.map((tv) => (
              <SplideSlide key={tv.id}>
                <CardMovie data={tv} mediaType="tv" />
                <CircularRating data={tv.vote_average} />
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

export default Home;

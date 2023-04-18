/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Flex,
  Heading,
  Link,
  //
} from '@chakra-ui/react';

import CardSkeleton from '@/components/CardSkeleton';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import HeroMovie from '@/components/HeroMovie';
import CardMovie from '@/components/CardMovie';
import { getAllMovies, getAllSeries, getWeeklyTrending } from '@/features/movie/movie.actions';
import { setUser } from '@/features/user/userSlice';

export function Home() {
  const movies = useSelector((state) => state.movie.movies);
  const tvSeries = useSelector((state) => state.movie.series);
  const trending = useSelector((state) => state.movie.weekly);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    dispatch(getAllMovies());
    dispatch(getAllSeries());
    dispatch(getWeeklyTrending());
  }, []);

  const token = localStorage.getItem('token');

  // Verify on first open if token is valid or not
  useEffect(() => {
    if (token) {
      (async () => {
        const response = await fetch(`${import.meta.env.VITE_AUTH_URL}api/v1/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const verifyResult = await response.status;
        if (verifyResult === 401) {
          localStorage.removeItem('token');
          dispatch(setUser({ name: null, email: null }));
        }
        if (verifyResult === 200) {
          navigate('/');
        }
      })();
    }
  }, []);

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

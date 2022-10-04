/* eslint-disable import/no-unresolved */
import { Splide, SplideSlide } from '@splidejs/react-splide';
import React, { useEffect, useState } from 'react';
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  Heading,
  Text,
  //
} from '@chakra-ui/react';
import Layout from '../../components/Layout';
import HeroMovie from '../../components/HeroMovie';
import { TRENDING_URL, MOVIE_URL, TV_URL } from '../../const/endpoints';

function Home() {
  const [dataHero, setDataHero] = useState(null);
  const [dataMovie, setDataMovie] = useState(null);
  const [dataTv, setDataTv] = useState(null);

  const fetchData = async (_url, _stateSetter) => {
    const response = await fetch(_url);
    const result = await response.json();
    _stateSetter(result.results);
  };

  useEffect(() => {
    fetchData(TRENDING_URL, setDataHero);
    fetchData(MOVIE_URL, setDataMovie);
    fetchData(TV_URL, setDataTv);
  }, []);

  return (
    <Layout>
      <Splide
        options={{
          type: '',
          arrows: false,
          keyboard: 'global',
          pagination: false,
        }}
      >
        {dataHero ? (
          dataHero?.slice(0, 5).map((movie) => (
            <SplideSlide key={movie.id}>
              <HeroMovie movie={movie} />
            </SplideSlide>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </Splide>
      <Box as="article" my="2rem" mx="1rem">
        <Flex align="center" justify="space-between">
          <Heading as="h2">Popular Movie</Heading>
          <Text>View All</Text>
        </Flex>
        <Splide
          options={{
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
          }}
        >
          {dataMovie?.map((movie) => (
            <SplideSlide key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title ?? movie.name}
                />
              </Link>
            </SplideSlide>
          ))}
        </Splide>
      </Box>
      <Box as="article" my="2rem" mx="1rem">
        <Flex align="center" justify="space-between">
          <Heading as="h2">Popular TV</Heading>
          <Text>View All</Text>
        </Flex>
        <Splide
          options={{
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
          }}
        >
          {dataTv?.map((tv) => (
            <SplideSlide key={tv.id}>
              <Link to={`/tv/${tv.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                  alt={tv.title ?? tv.name}
                />
              </Link>
            </SplideSlide>
          ))}
        </Splide>
      </Box>
    </Layout>
  );
}

export default Home;

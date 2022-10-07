/* eslint-disable import/no-unresolved */
import { Splide, SplideSlide } from '@splidejs/react-splide';
import React, { useEffect, useState } from 'react';
import '@splidejs/react-splide/css';
import { NavLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  Skeleton,
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
          autoplay: true,
          interval: 5000,
        }}
      >
        {dataHero ? (
          dataHero?.slice(0, 5).map((movie) => (
            <SplideSlide key={movie.id}>
              <HeroMovie movie={movie} />
            </SplideSlide>
          ))
        ) : (
          <Box width="100vw" height="100vh">
            <Text>Loading...</Text>
          </Box>
        )}
      </Splide>
      <Box as="article" my="2rem" mx="1rem">
        <Flex align="center" justify="space-between">
          <Heading as="h2">Popular Movie</Heading>
          <Link to="/movie" as={NavLink}>
            View All
          </Link>
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
          {dataMovie ? (
            dataMovie?.map((movie) => (
              <SplideSlide key={movie.id}>
                <Link to={`/movie/${movie.id}`} as={NavLink}>
                  <Image
                    rounded="lg"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    // fallbackSrc="https://res.cloudinary.com/dmgrxm78p/image/upload/v1665148820/poster_not_found.png"
                    alt={movie.title ?? movie.name}
                    objectFit="cover"
                  />
                </Link>
              </SplideSlide>
            ))
          ) : (
            <Flex gap="1rem" wrap="wrap">
              <Skeleton
                width={{ base: '100px', lg: '200px' }}
                height={{ base: '155px', lg: '300px' }}
              />
              <Skeleton
                width={{ base: '100px', lg: '200px' }}
                height={{ base: '155px', lg: '300px' }}
              />
              <Skeleton
                width={{ base: '100px', lg: '200px' }}
                height={{ base: '155px', lg: '300px' }}
              />
              <Skeleton
                width={{ base: '100px', lg: '200px' }}
                height={{ base: '155px', lg: '300px' }}
              />
              <Skeleton
                width={{ base: '100px', lg: '200px' }}
                height={{ base: '155px', lg: '300px' }}
              />
              <Skeleton
                width={{ base: '100px', lg: '200px' }}
                height={{ base: '155px', lg: '300px' }}
              />
            </Flex>
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
          {dataTv ? (
            dataTv?.map((tv) => (
              <SplideSlide key={tv.id}>
                <Link to={`/tv/${tv.id}`} as={NavLink}>
                  <Image
                    rounded="lg"
                    src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                    // fallbackSrc="https://res.cloudinary.com/dmgrxm78p/image/upload/v1665148820/poster_not_found.png"
                    alt={tv.title ?? tv.name}
                    objectFit="cover"
                  />
                </Link>
              </SplideSlide>
            ))
          ) : (
            <Flex gap="1rem" wrap="wrap">
              <Skeleton
                width={{ base: '100px', lg: '200px' }}
                height={{ base: '155px', lg: '300px' }}
              />
              <Skeleton
                width={{ base: '100px', lg: '200px' }}
                height={{ base: '155px', lg: '300px' }}
              />
              <Skeleton
                width={{ base: '100px', lg: '200px' }}
                height={{ base: '155px', lg: '300px' }}
              />
              <Skeleton
                width={{ base: '100px', lg: '200px' }}
                height={{ base: '155px', lg: '300px' }}
              />
              <Skeleton
                width={{ base: '100px', lg: '200px' }}
                height={{ base: '155px', lg: '300px' }}
              />
              <Skeleton
                width={{ base: '100px', lg: '200px' }}
                height={{ base: '155px', lg: '300px' }}
              />
            </Flex>
          )}
        </Splide>
      </Box>
    </Layout>
  );
}

export default Home;

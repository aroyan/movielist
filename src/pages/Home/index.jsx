/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
import { Splide, SplideSlide } from '@splidejs/react-splide';
import React, { useEffect, useState } from 'react';
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';

function Home() {
  const [dataHero, setDataHero] = useState(null);

  useEffect(() => {
    const getDataHero = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/tv/week?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }`
      );
      const result = await response.json();
      setDataHero(result.results.slice(0, 6));
    };
    getDataHero();
  }, []);

  return (
    <Layout>
      <Splide
        className="w-full h-full"
        options={{
          type: '',
          arrows: false,
          keyboard: 'global',
          pagination: false,
        }}
      >
        {dataHero ? (
          dataHero?.map((movie) => (
            <SplideSlide key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <div
                  className="w-full h-screen flex justify-center text-white text-4xl font-bold md:pl-16 pl-2 flex-col opacity-90"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  <div className="max-w-sm z-10">
                    <p>{movie.name ?? movie.title}</p>
                    <p className="text-sm font-normal">{movie.overview}</p>
                  </div>
                </div>
              </Link>
            </SplideSlide>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </Splide>
      <article className="h-screen my-4">
        <h2>Popular Movie</h2>
      </article>
    </Layout>
  );
}

export default Home;

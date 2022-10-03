/* eslint-disable import/no-unresolved */
import { Splide, SplideSlide } from '@splidejs/react-splide';
import React, { useEffect, useState } from 'react';
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';

function Home() {
  const [dataHero, setDataHero] = useState(null);

  // console.log(dataHero);

  useEffect(() => {
    const getDataHero = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${
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
              <Link to={`/${movie.media_type}/${movie.id}`}>
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
                    <button
                      type="button"
                      className="text-white bg-[#E50914] hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 z-10"
                      onClick={(e) => {
                        e.preventDefault();
                        alert('Open modal');
                      }}
                    >
                      WATCH TRAILER
                    </button>
                  </div>
                </div>
              </Link>
            </SplideSlide>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </Splide>
      <article className="h-screen my-4 pt-24">
        <h2>Popular Movie</h2>
        {/* Desktop */}
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
          className="mx-4"
        >
          {dataHero?.map((movie) => (
            <SplideSlide key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <img
                  className="rounded-md"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt="asdasd"
                />
              </Link>
            </SplideSlide>
          ))}
        </Splide>
      </article>
    </Layout>
  );
}

export default Home;

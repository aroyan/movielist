import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/Layout';

function DetailMovie() {
  const [detailMovie, setDetailMovie] = useState(null);

  const { media, id } = useParams();

  // Destructure null object
  const {
    title,
    overview,
    release_date: releaseDate,
    vote_average: voteAverage,
    genres,
  } = detailMovie ?? {};

  useEffect(() => {
    const getDetailMovie = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/${media}/${id}?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&language=en-US`
      );
      const result = await response.json();
      setDetailMovie(result);
    };
    getDetailMovie();
  }, []);

  return (
    <Layout>
      <h1>{title}</h1>
      <p>
        {releaseDate} - {voteAverage}
      </p>
      <p>{overview}</p>
      {genres?.map((genre) => (
        <p key={genre.id}>{genre.name}</p>
      ))}
    </Layout>
  );
}

export default DetailMovie;

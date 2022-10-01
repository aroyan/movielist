import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';

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
    <div>
      <h1>{title}</h1>
      <p className={clsx(voteAverage > 7 ? 'text-blue-600' : 'text-red-600')}>
        {releaseDate} - {voteAverage}
      </p>
      <p>{overview}</p>
      {genres?.map((genre) => (
        <p key={genre.id}>{genre.name}</p>
      ))}
    </div>
  );
}

export default DetailMovie;

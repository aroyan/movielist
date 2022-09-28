import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [data, setData] = useState();
  console.log(data);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&language=en-US&page=1`
      );
      const result = await response.json();
      setData(result.results);
    };
    getData();
  }, []);

  return (
    <div>
      {data?.map((movie) => (
        <div key={movie.id}>
          <Link to={`/movie/${movie.id}`}>
            <h2 className="text-green-600 font-bold text-2xl">{movie.title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
            <p>{movie.overview}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Home;

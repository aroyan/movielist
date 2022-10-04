import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../../components/Layout';

function SearchResult() {
  const [searchResult, setSearchResult] = useState(null);

  const [searchParams] = useSearchParams();

  const query = searchParams.get('q');

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&language=en-US&page=1&include_adult=false&query=${query}`
      );
      const result = await response.json();
      setSearchResult(result.results);
    };
    getData();
  }, [query]);

  return (
    <Layout>
      <h1
        style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          marginTop: '10rem',
        }}
      >
        Search for {query}
      </h1>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        {searchResult?.map((movie) => (
          <div key={movie.id} style={{ width: '200px', padding: '1rem' }}>
            <p>{movie.title}</p>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : 'https://placekitten.com/200'
              }
              alt={movie.title}
              width="200"
            />
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default SearchResult;

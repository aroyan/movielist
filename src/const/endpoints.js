const BASE_URL = 'https://api.themoviedb.org/3';

export const TRENDING_URL = `${BASE_URL}/trending/all/week?api_key=${
  import.meta.env.VITE_TMDB_API_KEY
}`;

export const MOVIE_URL = `${BASE_URL}/movie/popular?api_key=${
  import.meta.env.VITE_TMDB_API_KEY
}&page=1`;

export const TV_URL = `${BASE_URL}/tv/popular?api_key=${
  import.meta.env.VITE_TMDB_API_KEY
}&page=1`;

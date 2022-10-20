import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  endpoints: (builder) => ({
    getAllMovies: builder.query({
      query: (page = 1) => `movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=${page}`,
    }),
    getAllSeries: builder.query({
      query: (page = 1) => `tv/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=${page}`,
    }),
    getWeeklyTrending: builder.query({
      query: () => `trending/all/week?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
    }),
    getDetailData: builder.query({
      query: ({ media, id }) => `${media}/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
    }),
    getTrailer: builder.query({
      query: ({ media, id }) => `${media}/${id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
    }),
  }),
});

export const {
  useGetAllMoviesQuery,
  useGetAllSeriesQuery,
  useGetWeeklyTrendingQuery,
  useGetDetailDataQuery,
  useGetTrailerQuery,
} = movieApi;

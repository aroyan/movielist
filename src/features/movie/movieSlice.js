import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  endpoints: (builder) => ({
    getAllMovies: builder.query({
      query: (page = 1) => `movie/popular?api_key=${apiKey}&page=${page}`,
    }),
    getAllSeries: builder.query({
      query: (page = 1) => `tv/popular?api_key=${apiKey}&page=${page}`,
    }),
    getWeeklyTrending: builder.query({
      query: () => `trending/all/week?api_key=${apiKey}`,
    }),
    getDetailData: builder.query({
      query: ({ media, id }) => `${media}/${id}?api_key=${apiKey}`,
    }),
    getTrailer: builder.query({
      query: ({ media, id }) => `${media}/${id}/videos?api_key=${apiKey}`,
    }),
    // prettier-ignore
    getSearchData: builder.query({
      query: ({ q, page = 1 }) => `search/multi?api_key=${apiKey}&language=en-US&page=${page}&include_adult=false&query=${q}`,
    }),
  }),
});

export const {
  useGetAllMoviesQuery,
  useGetAllSeriesQuery,
  useGetWeeklyTrendingQuery,
  useGetDetailDataQuery,
  useGetTrailerQuery,
  useGetSearchDataQuery,
} = movieApi;

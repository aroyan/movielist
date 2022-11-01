/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: [],
  series: [],
  weekly: [],
  detail: null,
  trailer: null,
  search: [],
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    _getAllMovies: (state, action) => {
      state.movies = action.payload;
    },
    _getAllSeries: (state, action) => {
      state.series = action.payload;
    },
    _getWeeklyTrending: (state, action) => {
      state.weekly = action.payload;
    },
    _getDetailData: (state, action) => {
      state.detail = action.payload;
    },
    _getTrailer: (state, action) => {
      state.trailer = action.payload;
    },
    _getSearchData: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const {
  _getAllMovies,
  _getAllSeries,
  _getDetailData,
  _getSearchData,
  _getTrailer,
  _getWeeklyTrending,
  //
} = movieSlice.actions;

export default movieSlice.reducer;

import {
  _getAllMovies,
  _getAllSeries,
  _getDetailData,
  _getSearchData,
  _getTrailer,
  _getWeeklyTrending,
} from './movieSlice';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// prettier-ignore
export const getAllMovies = (page = 1) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
    const data = await response.json();
  
    dispatch(_getAllMovies(data));  
  } catch (error) {
    // maybe set to Redux state
    return error.message;
  }
};

// prettier-ignore
export const getAllSeries = (page = 1) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&page=${page}`);
    const data = await response.json();
  
    dispatch(_getAllSeries(data)); 
  } catch (error) {
    return error.message;
  }
};

export const getWeeklyTrending = () => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/trending/all/week?api_key=${API_KEY}`);
    const data = await response.json();

    dispatch(_getWeeklyTrending(data));
  } catch (error) {
    return error.message;
  }
};

export const getDetailData = (media, id) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/${media}/${id}?api_key=${API_KEY}`);
    const data = await response.json();

    dispatch(_getDetailData(data));
  } catch (error) {
    return error.message;
  }
};

export const getCreditsData = (media, id) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/${media}/${id}/credits?api_key=${API_KEY}`);
    const data = await response.json();

    dispatch(_getDetailData(data));
  } catch (error) {
    return error.message;
  }
};


export const getTrailer = (media, id) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/${media}/${id}/videos?api_key=${API_KEY}`);
    const data = await response.json();

    dispatch(_getTrailer(data));
  } catch (error) {
    return error.message;
  }
};

// prettier-ignore
export const getSearchData = (q, page = 1) => async (dispatch) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&page=${page}&include_adult=false&query=${q}`
    );
    const data = await response.json();
  
    dispatch(_getSearchData(data));
  } catch (error) {
    return error.message
  }
};

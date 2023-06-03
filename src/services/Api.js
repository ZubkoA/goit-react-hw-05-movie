import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API_KEY = 'c2bbff09d61c8579fc203c76a35e2f7a';

export async function fetchTrendMovies() {
  const response = await axios('trending/movie/day', {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data.results;
}

export async function fetchSearchMovies(searchValue) {
  const response = await axios(
    `search/movie?&include_adult=false&language=en-US&page=1&query=${searchValue}`,
    {
      params: {
        api_key: API_KEY,
        searchValue,
      },
    }
  );
  return response.data.results;
}

export async function fetchMovieDetails(movieId) {
  const response = await axios(`movie/${movieId}&language=en-US`, {
    params: {
      api_key: API_KEY,
      movieId,
    },
  });
  return response.data;
}

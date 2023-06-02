import React from 'react';
import { useEffect, useState, useRef } from 'react';
import {
  NavLink,
  Link,
  Outlet,
  useParams,
  useLocation,
} from 'react-router-dom';
import css from './MovieDetails.module.css';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'c2bbff09d61c8579fc203c76a35e2f7a';

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState([]);
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/movies');

  const { movieId } = useParams();

  useEffect(() => {
    fetch(`${BASE_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
      .then(response => response.json())
      .then(data => setMovieDetails(data))
      .catch(err => console.error(err));
  }, [movieId]);

  const { title, popularity, overview, genres, backdrop_path, release_date } =
    movieDetails;

  // const release = release_date.slice(0, 4);
  const popularityRound = Math.round(popularity);
  // const movieGenres = genres.map(({ name }) => name).join(', ');

  return (
    <div>
      <NavLink to={backLinkLocationRef.current} className={css.link}>
        {' '}
        &larr; go back
      </NavLink>
      <div className={css.wrap}>
        <div>
          <img
            className={css.img_movie}
            src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
            alt={title}
          />
        </div>
        <div className={css.text}>
          <h1>{title} (release)</h1>
          <p>User score: {popularityRound}%</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>movieGenres</p>
        </div>
      </div>
      <h2>Additional information</h2>
      <ul className={css.wrapList}>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          {/* http://localhost:3000/dogs/dog-3/gallery */}
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default MovieDetails;

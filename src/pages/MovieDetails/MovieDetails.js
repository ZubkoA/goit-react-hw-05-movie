import React, { Suspense } from 'react';
import { useEffect, useState, useRef } from 'react';
import {
  NavLink,
  Link,
  Outlet,
  useParams,
  useLocation,
} from 'react-router-dom';
import { fetchMovieDetails } from '../../services/Api';
import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState([]);
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/movies');

  const { movieId } = useParams();

  useEffect(() => {
    fetchMovieDetails(movieId).then(setMovieDetails);
  }, [movieId]);

  const { title, popularity, overview, backdrop_path, release_date, genres } =
    movieDetails;
  console.log(popularity, release_date, genres);
  const release = () => {
    if (release_date) return release_date.slice(0, 4);
  };
  const popularityRound = Math.round(popularity);
  const movieGenres = () => {
    if (genres) return genres.map(({ name }) => name).join(', ');
  };

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
          <h1>
            {title} ({release()})
          </h1>
          <p>User score: {popularityRound}%</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{movieGenres()}</p>
        </div>
      </div>
      <h2>Additional information</h2>
      <ul className={css.wrapList}>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Suspense fallback={<div>loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetails;

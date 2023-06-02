import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './Cast.module.css';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'c2bbff09d61c8579fc203c76a35e2f7a';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    fetch(
      `${BASE_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
    )
      .then(response => response.json())
      .then(data => setCast(data.cast))
      .catch(err => console.error(err));
  }, [movieId]);

  return (
    <ul className={css.gap}>
      {cast.map(({ id, profile_path, name, character }) => (
        <li key={id} className={css.gap_list}>
          <img
            src={`https://image.tmdb.org/t/p/w500${profile_path}`}
            alt={name}
          />
          <p>{name}</p>
          <p>
            <b>Character:</b> {character}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default Cast;

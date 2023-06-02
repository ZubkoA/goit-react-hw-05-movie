import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import css from './Movies.module.css';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'c2bbff09d61c8579fc203c76a35e2f7a';

const Movies = () => {
  const [value, setValue] = useState('');
  const [searchMovies, setSearchMovies] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = ({ target: { value } }) => {
    setValue(value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (value.trim() === '') {
      return alert('Type in something');
    }
    setSearchParams({ query: value });
    setValue('');
  };

  const searchValue = useMemo(
    () => searchParams.get('query') ?? '',
    [searchParams]
  );
  const location = useLocation();

  useEffect(() => {
    fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&include_adult=false&language=en-US&page=1&query=${searchValue}`
    )
      .then(response => response.json())
      .then(data => setSearchMovies(data.results))
      .catch(err => console.error(err));
  }, [searchValue]);

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search films"
          onChange={handleChange}
          value={value}
        />
        <button type="submit" className={css.btn}>
          Search
        </button>
      </form>
      <ul>
        {searchMovies.map(({ title, id }) => (
          <li key={id} className={css.list}>
            <Link to={`${id}`} state={{ from: location }}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;

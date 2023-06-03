import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { fetchSearchMovies } from '../../services/Api';
import css from './Movies.module.css';

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
  console.log(value);
  const searchValue = useMemo(
    () => searchParams.get('query') ?? '',
    [searchParams]
  );
  const location = useLocation();

  useEffect(() => {
    fetchSearchMovies(searchValue).then(setSearchMovies);
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

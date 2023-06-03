import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchTrendMovies } from '../../services/Api';
import css from './Home.module.css';

const Home = () => {
  const [trend, setTrend] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchTrendMovies().then(setTrend);
  }, []);
  return (
    <ul className={css.wrap_trend}>
      {trend.map(({ title, id }) => (
        <li key={id} className={css.list_trend}>
          <Link to={`/movies/${id}`} state={{ from: location }}>
            {' '}
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Home;

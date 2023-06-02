import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'c2bbff09d61c8579fc203c76a35e2f7a';

const Home = () => {
  const [trend, setTrend] = useState([]);
  useEffect(() => {
    fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=en-US`)
      .then(response => response.json())
      .then(response => setTrend(response.results))
      .catch(err => console.error(err));
  }, []);
  return (
    <ul>
      {trend.map(({ title, id }) => (
        <li key={id}>
          <Link to={`${id}`}>{title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Home;

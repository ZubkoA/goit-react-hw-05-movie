import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import css from './Reviews.module.css';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'c2bbff09d61c8579fc203c76a35e2f7a';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    fetch(
      `${BASE_URL}movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`
    )
      .then(response => response.json())
      .then(data => setReviews(data.results))
      .catch(err => console.error(err));
  }, [movieId]);

  return (
    <ul className={css.rev_wrap}>
      {reviews.length === 0 && <h2>We don't find any reviews</h2>}
      {reviews.length > 0 &&
        reviews.map(({ id, author, content }) => (
          <li key={id} className={css.reviews}>
            <h3>{author}</h3>
            <p>{content}</p>
          </li>
        ))}
    </ul>
  );
};

export default Reviews;

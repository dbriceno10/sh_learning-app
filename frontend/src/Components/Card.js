import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ id, name, image, price, rating }) => {
  return (
    <div className='card'>
      <Link className='cardContainer' to={`/course/${id}`}>
        <img className='cardImg' src={image} alt={name} />
        <h3 className='cardTitle'>{name}</h3>
        <p className='cardPrice'>$ {price}</p>
        <p className='cardRating'>{rating}</p>
      </Link>
    </div>
  ) 
};

export default Card;

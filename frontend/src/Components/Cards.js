import React, { useEffect } from 'react';
import Card from "./Card";
import { useSelector, useDispatch } from 'react-redux';
import { getCourses } from '../Actions/courses.actions';

const Cards = () => {
    const dispatch = useDispatch();
    const {courses} = useSelector(state => state.courses);

    useEffect(() => {
      dispatch(getCourses())
    
      
    }, []);
    

  return (
    <section className='cardsContainer'>
      {courses?.map(c =>
        <Card key={c.id} id={c.id} name={c.name} image={c.image} price={c.price} rating={c.rating} />
      )}
    </section>
  ) 
};

export default Cards;

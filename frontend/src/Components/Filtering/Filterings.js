import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from '../../Actions/courses.actions';
import CategoryFiltering from './CategoryFiltering';
import './Filterings.css';

// const array = ['Programacion', 'Matematica', 'Ingles', 'Español', 'UI/UX', 'React', 'Java']
function Filterings() {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.courses);

  useEffect(e => {
    dispatch(getCategories({}))
  }, [dispatch])
  console.log(categories)

  return (
    <main className='filterings'>
      <section className='filterings_category filter-type'>
        <h2>Categorias:</h2>
        {categories?.map((category, i) =>
          <CategoryFiltering
            key={category.id}
            category={category}
          />
        )}
      </section>
      {/* <section className='filterings_rating filter-type'>
        <h2>Rating:</h2>
        {array?.map((el) =>
          <Categorias key={el} categoria={el} setrenderizado={setrenderizado} renderizado={renderizado} />)}
      </section> */}
    </main>
  );
}

export default Filterings;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from '../../Actions/courses.actions';
import './CategoryFiltering.css';

function CategoryFiltering({ category, setrenderizado, renderizado }) {
  const dispatch = useDispatch();
  function handleCategories(e) {
    if (e.target.checked) {
      // setrenderizado({
      //   ...renderizado,
      //   [e.target.name]: e.target.value
      // })
      // dispatch ( getCourses(e.target.value))
      // console.log(renderizado)
      dispatch(getCourses({ category: e.target.value }));
      console.log('I dispatched it')
      console.log(e.target.value)
    }

  }
  return (
    <article className='categories'>
      <label className='categories_label' >
        <input
          className='categories_checkbox'
          type='checkbox'
          name='categoria'
          onChange={handleCategories}
          value={category.name}
        />
        {category.name}
        <svg viewBox="0 0 21 21">
          <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
        </svg>
      </label >
    </article>
  );
}

export default CategoryFiltering;

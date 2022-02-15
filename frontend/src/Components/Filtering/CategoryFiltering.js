import { React } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from '../../Actions/courses.actions';
import { setFilterCategory } from '../../Actions/filter.actions';
import './CategoryFiltering.css';

function CategoryFiltering({ category, setrenderizado, renderizado }) {
  const dispatch = useDispatch();
  const { order } = useSelector(state => state.filters)
  // function handleCategories(e) {
  //   // if (e.target.checked) {
  //   dispatch(setFilterCategory(e.target.value))
  //   dispatch(getCourses({ category: e.target.value, order }))
  //   console.log('I dispatched it')
  //   console.log(e.target.value)
  //   // }
  // }
  return (
    <option
      className='categories'
      // className='categories_checkbox'
      name='category'
      value={category.name}>
      {category.name}
    </option>
    /* <label className='categories_label' >
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
          </label > */
  );
}

export default CategoryFiltering;

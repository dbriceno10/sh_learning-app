import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getCourses } from '../../Actions/courses.actions';
import styles from './Orders.module.css'


function FilterCategories() {
  const dispatch = useDispatch();
  const {categories} = useSelector(state => state.courses)
  console.log(categories)


  const onChange =  (e)  =>  {
     dispatch(getCourses({ category: e.target.value }))
  }
  useEffect(e => {
    dispatch(getCategories({}))
  }, [dispatch])

  

  return (

    <div className={styles.categorias}>
      {
        categories?.map((c) => {

          return (
            <select
              value={c.name}
              onChange={onChange}
            >
             <option>{c.name.toUpperCase()} </option>
            </select>
          )
        })
      }
    </div>
  )
}

export default FilterCategories;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getCourses } from '../../Actions/courses.actions';
import styles from './Orders.module.css'


function FilterCategories() {
  const dispatch = useDispatch();
  const {categories} = useSelector(state => state.courses)
  console.log(categories)


  const handleClick = (e)  =>  {
    dispatch(getCourses({ category: e.target.value }))
  }
  useEffect(e => {
    dispatch(getCategories({}))
    console.log(categories)
  }, [dispatch])

  

  return (

    <div className={styles.categorias}>
      {
        categories?.map((c) => {

          return (
            <button
              value={c.name}
              onClick={handleClick}
            >
              {c.name.toUpperCase()}
            </button>
          )
        })
      }
    </div>
  )
}

export default FilterCategories;

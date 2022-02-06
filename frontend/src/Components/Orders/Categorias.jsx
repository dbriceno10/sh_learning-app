import React, { useEffect, useState }from 'react';
import styles from './Categoria.module.css'
import { useDispatch,useSelector } from "react-redux";
import { getCoursesorder } from '../../Actions/courses.actions';
function Categorias({categoria}) {
  function HandleCategories(e){
    e.preventDefault()
    // dispatch ( getCoursesorder(e.target.value))
    alert('Hice click')
}
  return <div className={styles.div}>
      <label className={styles.label}>
          <input className={styles.in} key={categoria} type='checkbox' name='categoria' onChange={HandleCategories} value={categoria}/>{categoria }
      </label>

  </div>;
}

export default Categorias;

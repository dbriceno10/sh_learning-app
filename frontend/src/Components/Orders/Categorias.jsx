import React, { useEffect, useState }from 'react';
import styles from './Categoria.module.css'
import { useDispatch,useSelector } from "react-redux";
import { getCourses } from '../../Actions/courses.actions';
function Categorias({categoria, setrenderizado,renderizado}) {
  function HandleCategories(e){
  if (e.target.checked){

    setrenderizado({
      ...renderizado,
      [e.target.name]:e.target.value
    })
    // dispatch ( getCourses(e.target.value))
   // console.log(renderizado)
  }
    
}
  return <div className={styles.div}>
      <label className={styles.label}>
          <input className={styles.in} key={categoria} type='checkbox' name='categoria' onChange={HandleCategories} value={categoria}/>{categoria }
      </label>

  </div>;
}

export default Categorias;

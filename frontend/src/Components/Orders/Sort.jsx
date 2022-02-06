
import React ,  { useEffect, useState }from 'react';
import { useDispatch,useSelector } from "react-redux";
import { getCoursesorder } from '../../Actions/courses.actions';
import styles from './Sort.module.css'

function Sort() {
    const dispatch=useDispatch();
    function HandleSort(e){
        e.preventDefault()
        // dispatch ( getCoursesorder(e.target.value))
        alert('Hice click')
    }
  return <div>
      <select className={styles.selection}>
          <option >Sort By</option>
<option value='minP' key='minP' onClick={HandleSort}>Precio Ascendente </option>
<option value='maxP'key='maxP' onClick={HandleSort}>Precio Descendente</option>
<option value='minR' key='minR' onClick={HandleSort}>Rating Ascendente </option>
<option value='maxR' key='maxR' onClick={HandleSort}>Rating Descendente </option>
</select>
  </div>;
}

export default Sort;

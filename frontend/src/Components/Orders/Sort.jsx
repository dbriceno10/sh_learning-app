
import React ,  { useEffect, useState }from 'react';
import { useDispatch,useSelector } from "react-redux";
import { getCoursesorder } from '../../Actions/courses.actions';
import styles from './Sort.module.css'

function Sort({renderizado,setrenderizado}) {
    const dispatch=useDispatch();
    function HandleSort(e){
    
        setrenderizado({
          ...renderizado,
          order:e.target.value
        })
        // dispatch ( getCourses(renderizado))
         //console.log(`Hola: ${renderizado.order}`)
        
    }
  return <div>
      <select className={styles.selection} onClick={HandleSort}>
          <option value='' key='1' >Sort By</option>
<option value='minP' key='minP'  name='order'>Precio Ascendente </option>
<option value='maxP'key='maxP'  name='order'>Precio Descendente</option>
<option value='minR' key='minR' onClick={HandleSort} name='order'>Rating Ascendente </option>
<option value='maxR' key='maxR'  name='order'>Rating Descendente </option>
</select>
  </div>;
}

export default Sort;

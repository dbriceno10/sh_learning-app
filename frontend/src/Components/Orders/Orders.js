import React ,  { useEffect, useState }from 'react';
import { useDispatch,useSelector } from "react-redux";
import { getCategories } from '../../Actions/courses.actions';
import Categorias from './Categorias';
import styles from './Orders.module.css'

const array=['Programacion','Matematica','Ingles','Español','UI/UX','React','Java']
function Orders() {
//   const dispatch=useDispatch();
//   useEffect(()=>{
//     dispatch(getCategories())
//   })
//   const categorias=useSelector(state=>state.categories)
  return <div className={styles.categorias}>
      
        {array?.map((el)=>
         <Categorias key={el} categoria={el}  />)}
     
  </div>;
}

export default Orders;

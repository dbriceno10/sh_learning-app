import React ,  { useEffect, useState }from 'react';
import { useDispatch,useSelector } from "react-redux";
import { getCategories } from '../../Actions/courses.actions';
import Categorias from './Categorias';

const array=['Programacion','Matematica','Ingles','Español']
function Orders() {
//   const dispatch=useDispatch();
//   useEffect(()=>{
//     dispatch(getCategories())
//   })
//   const categorias=useSelector(state=>state.categories)
  return <div>
      <section>
        {array?.map((el)=>
         <Categorias key={el} categoria={el}  />)}
      </section>
  </div>;
}

export default Orders;

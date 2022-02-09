import React from "react";
import { useDispatch } from "react-redux";
import { setOrder } from "../../Actions/courses.actions";
import { getCourses } from "../../Actions/courses.actions";

const Order = () =>{
  const dispatch = useDispatch();

  const handleOrder = (e) =>{
    dispatch(setOrder(e.target.value))
    dispatch(getCourses({order: e.target.value}))
  }
  return (
    <div>
        <select onChange={handleOrder}>
            <option selected value="" >Ordenar Ratings</option>
            <option value="maxR">Mayor Rating</option>
            <option value="minR">Menor Rating</option>
        </select>

        <div>
            <select onChange={handleOrder}>
                <option value="">Ordenar Precios</option>
                <option value="maxP">Mayor Precio</option>
                <option value="minP">Menor Precio</option>
            </select>
        </div>
    </div>
)

}

export default Order;
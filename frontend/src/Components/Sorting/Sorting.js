import React from "react";
import { useDispatch } from "react-redux";
import { getCourses } from "../../Actions/courses.actions";
import './Sorting.css';

const Sorting = () => {
    const dispatch = useDispatch();

    const handleOrder = (e) => {
        // dispatch(setOrder(e.target.value))
        dispatch(getCourses({ order: e.target.value }))
    }
    return (
        <section className="sorting">
            <select onChange={handleOrder}
                className='sorting_rating-sort-selector selector'>
                <option defaultValue="" >Ordenar Calificación</option>
                <option value="maxR">Mayor Calificación</option>
                <option value="minR">Menor Calificación</option>
            </select>

            <select onChange={handleOrder}
                className='sorting_price-sort-selector selector'>
                <option value="">Ordenar Precios</option>
                <option value="maxP">Mayor Precio</option>
                <option value="minP">Menor Precio</option>
            </select>
        </section>
    )

}

export default Sorting;
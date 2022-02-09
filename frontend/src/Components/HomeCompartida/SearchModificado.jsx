import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import styles from './SearchModificado.module.css'
 import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { getCourses } from "../../Actions/courses.actions"; 
import Cards from "../Cards/Cards";


export default function SearchModificado(curso){
    
    const dispatch = useDispatch();
    const {courses} = useSelector(state => state.courses)
	console.log(courses)
    const [input, setInput] = useState("")



    const handleInputChange = (e) => {
        setInput(e.target.value)
         dispatch(getCourses({name: e.target.value}))
    }
    return (
        <div className={styles.search}>
            <div className={styles.searchInputs}>

                <div className={styles.barra}>
                <input
                    value={input}
                    className={styles.input}
                    onChange={handleInputChange}
                    placeholder="Buscar..."
                />
               {/*  <button className={styles.searchIcon} onClick={handleSubmit}><Icon icon="line-md:search" height='40px' /></button> */}
                </div>

                </div>
        </div>
    )

}
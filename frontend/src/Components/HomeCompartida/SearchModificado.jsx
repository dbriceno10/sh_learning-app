import React, {useState} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from './SearchModificado.module.css'
import { Icon } from "@iconify/react";


export default function SearchModificado(){
    const {courses} = useSelector(state => state.courses)
    console.log(courses)

    const [filteredData, setFilteredData] = useState([]);
    /* const [input, setInput] = useState("") */


    const handleFilter = (e) => {
        const newFilter = courses.filter((c) =>{
           return c.name.toLowerCase().includes(e.target.value.toLowerCase()) 
        })

        if(e.target.value === ""){
            setFilteredData([])
        } else {
            setFilteredData(newFilter)
        }
    }

const handleSubmit = (e) => {
        e.preventDefault()
        alert('Hice click')

    }
    return (
        <div className={styles.search}>
            <div className={styles.searchInputs}>

                <div className={styles.barra}>
                <input
                    /* value={input} */
                    className={styles.input}
                    onChange={handleFilter}
                    placeholder="Buscar..."
                />
                <button className={styles.searchIcon} onClick={handleSubmit}><Icon icon="line-md:search" height='40px' /></button>
                </div>
                {
                   filteredData.length !== 0 && (
                <div className={styles.dataResult}>
                {filteredData.map(c =>{
                    return (
                        <Link to={`/courses/${c.id}`}>
                        <a className={styles.dataItem}>
                        <p>{c.name}</p>
                        </a>
                        </Link>
                    )
                })}
                </div>
                   )}

                </div>
        </div>
    )

}
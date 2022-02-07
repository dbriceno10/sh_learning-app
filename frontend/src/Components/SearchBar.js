import React, {useState} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./SearchBar.css";

export default function SearchBar(){
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

    /* const handleSubmit = (e) => {
        e.preventDefault()
        setInput(e.target.value)

    }
 */
    return (
        <div className="search">
            <div className="searchInputs">

                <div>
                <input
                    /* value={input} */
                    onChange={handleFilter}
                    placeholder="Buscar..."
                />
                <button className="searchIcon">🔎</button>
                </div>
                {
                   filteredData.length !== 0 && (
                <div className="dataResult">
                {filteredData.map(c =>{
                    return (
                        <Link to={`/courses/${c.id}`}>
                        <a className="dataItem">
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
import React from "react";
import { useSelector } from "react-redux";
import Navbar from '../NavBars/Navbars';
import './home.css';



export default function Home() {

    const cards = useSelector(state => state?.cardsHardC)


    function alertButton(e) {
        e.preventDefault();
        alert('No hace nada')
    }

    return (
        <div id='all-home'>
            <Navbar isUser={true} />
            <input id="search-home" placeholder="Search for courses..." />
            <button id="btn-search-home" onClick={e => alertButton(e)}>🔍️</button>
            <select id='sortBy'>
                <option sekected>Sort By</option>
            </select>

            <div id='div-all-cards'>

                {
                    cards?.map(card => {
                        return (
                            <div id="cards-div">
                                <img id="card-img" src={card.img} alt='1' />
                                <h4 id="card-name">{card.name}</h4>
                                <h5 id="card-cat">{card.cat}</h5>
                                <h6 id="card-price">{card.price}</h6>
                                <h6 id="card-rating">{card.rating}</h6>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
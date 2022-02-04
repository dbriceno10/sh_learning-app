import React from "react";
import './Navbar.css';
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Navbar() {
    return (
        <nav className="nav-bar">
            <ul className="nav-bar_items">
                <img className="nav-bar_logo"
                    src="https://i.imgur.com/sq20yHH.png"
                    alt="Learnzilla online academy logo (with a purple dinosaur)" />
                <section className="nav-bar_middle-btns">
                    <li className="nav-bar_item">
                        <a className="button-flat" href="#why-us-section">Why us?</a>
                    </li>
                    <li className="nav-bar_item">
                        <a className="button-flat" href="#teach-section">Teach</a>
                    </li>
                    <li className="nav-bar_item">
                        <a className="button-flat" href="#about-section">About us</a>
                    </li>
                </section>
                <section className="nav-bar_cta">
                    <li className="nav-bar_item">
                        <Link to = "/login" className="button-raised nav-bar_cta_login" href="/landing">Login</Link>
                    </li>
                    <li className="nav-bar_item">
                        <Link to = "/signUp" className="button-raised" href="/landing">Sign up</Link>
                    </li>
                    <li className="nav-bar_item">
                        <Link to = "/profile" className="button-raised" href="/landing">Profile</Link>
                    </li>
                </section>
                <SearchBar/>
                <section className="nav-bar_menu">
                    <li className="nav-bar_item">
                        <a className="button-raised" href="/landing">
                            <span className="iconify-inline" data-icon="ci:menu-alt-02"></span>
                        </a>
                    </li>
                </section>
            </ul>
        </nav>
    )
}
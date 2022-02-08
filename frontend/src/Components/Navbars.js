import React from "react";
import './Navbar.css';

import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

import Button from './Button.js';


export default function Navbar({ isUser }) {
    /* isUser is either false or true; true means is a logged-in user */
    return (
        <nav className="nav-bar">
            <ul className="nav-bar_items">
                <img className="nav-bar_logo"
                    src="https://i.imgur.com/sq20yHH.png"
                    alt="Learnzilla online academy logo (with a purple dinosaur)" />
                {
                    !isUser &&
                    <section className="nav-bar_middle-btns">
                        <li className="nav-bar_item">
                            <Button
                                link={'#why-section'}
                                type={'flat'}
                                text={'Why us?'}>
                            </Button>
                        </li>
                        <li className="nav-bar_item">
                            <Button
                                link={'#teach-section'}
                                type={'flat'}
                                text={'Teach'}>
                            </Button>
                        </li>
                        <li className="nav-bar_item">
                            <Button
                                link={'#about-section'}
                                type={'flat'}
                                text={'About us'}>
                            </Button>
                        </li>
                    </section>
                }
                {
                    !isUser
                        ? <section className="nav-bar_cta">
                            <li className="nav-bar_item">
                                <Button className='nav-bar_cta_login'
                                    link={'/landing'}
                                    type={'raised'}
                                    text={'Login'}
                                ></Button>
                            </li>
                            <li className="nav-bar_item">
                                <Button className='nav-bar_cta_sign-up'
                                    link={'/landing'}
                                    type={'raised'}
                                    text={'Sign up'}
                                ></Button>
                            </li>
                        </section>
                        : <section className="nav-bar_user-controls">
                            <li className="nav-bar_item">
                                <Button className='user-controls_settings_btn'
                                    link={'/landing'}
                                    type={'round'}
                                    text={'hello'}
                                    icon={'ci:settings-filled'}
                                ></Button>
                            </li>
                            <li className="nav-bar_item">
                                <span className="user-controls-profile-pic" >
                                </span>
                            </li>
                        </section>
                }
                {
                    !isUser &&
                    <section className="nav-bar_menu">
                        <li className="nav-bar_item">
                            <Button
                                link={'/landing'}
                                type={'raised-icon'}
                                icon={'ci:menu-alt-02'}
                            ></Button>
                        </li>
                    </section>
                }
            </ul >
        </nav >
    )
}
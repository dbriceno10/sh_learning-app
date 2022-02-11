import { React, useState } from "react";
import { Link } from "react-router-dom";
import Button from '../Buttons/Buttons';
import './Navbars.css';

export default function Navbar({ isUser }) {
    const [toggleMenuIcon, setToggleMenuIcon] = useState('ci:menu-alt-02');
    function toggleMenuOverlay(e) {
        console.log('toggle');
        setToggleMenuIcon('eva:close-outline');
        let menu = document.querySelector('.nav-menu-overlay');
        let ctas = document.querySelector('.nav-bar_cta');
        let middleBtns = document.querySelector('.nav-bar_middle-btns');
        if (e.target.classList.contains('menu-visible')) {
            e.target.classList.remove('menu-visible');
        } else {
            e.target.classList.add('menu-visible')
        }
        if (menu.classList.contains('visible')) {
            menu.classList.remove('visible');
            middleBtns.classList.remove('menu-visible');
            ctas.classList.remove('menu-visible');
            setToggleMenuIcon('ci:menu-alt-02');
        } else {
            menu.classList.add('visible');
            middleBtns.classList.add('menu-visible');
            ctas.classList.add('menu-visible');
        }
    }
    const handleLogout = () => {
        window.localStorage.removeItem("userCredentials");
        alert("Has cerrado sesión")
    }
    /* isUser is either false or true; true means is a logged-in user */
    return (
        <nav className="nav-bar">
            <ul className="nav-bar_items">
                <Link
                    className="nav-bar_logo"
                    to={!isUser ? '/' : '/home'}>
                    <img className="nav-bar_logo"
                        src="https://i.imgur.com/sq20yHH.png"
                        alt="Learnzilla online academy logo (with a purple dinosaur)" />
                </Link>
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
                                <div className="nav-bar_cta_login">
                                    <Button
                                        link={'/login'}
                                        type={'raised'}
                                        text={'Login'}
                                    ></Button>
                                </div>
                            </li>
                            <li className="nav-bar_item">
                                <Button className='nav-bar_cta_sign-up'
                                    link={'/signUp'}
                                    type={'raised'}
                                    text={'Sign up'}
                                ></Button>
                            </li>
                        </section>
                        : <section className="nav-bar_user-controls">
                            <li className="nav-bar_item">
                                <Button className='user-controls_settings_btn'
                                    link={'/settings'}
                                    type={'round'}
                                    text={'hello'}
                                    icon={'ci:settings-filled'}
                                    tooltip={'Settings'}
                                >
                                </Button>
                            </li>
                            <li className="nav-bar_item">
                                <Button className='user-controls_logout_btn'
                                    link={'/'}
                                    type={'round'}
                                    text={'hello'}
                                    icon={'ph:sign-out-bold'}
                                    tooltip={'Log out'}
                                    onClick={handleLogout}
                                ></Button>
                            </li>
                            <li className="nav-bar_item">
                                <div className="user-controls-profile-pic tooltip" >
                                    <span className="tooltip_text">
                                        Username
                                    </span>
                                </div>
                            </li>
                        </section>
                }
                {
                    !isUser &&
                    <section className="nav-bar_menu">
                        <Button
                            link={''}
                            type={'raised-icon'}
                            icon={toggleMenuIcon}
                            onClick={e => toggleMenuOverlay(e)}
                        ></Button>
                    </section>
                }
            </ul >
            <div className="nav-menu-overlay"></div>
        </nav >
    )
}
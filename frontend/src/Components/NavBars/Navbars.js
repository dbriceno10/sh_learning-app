import { React, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserCredentials } from "../../Actions/login.actions";
import Button from '../Buttons/Buttons';
import './Navbars.css';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Navbar({ isStudent }) {
    const dispatch = useDispatch();
    const location = useLocation();
    const [toggleMenuIcon, setToggleMenuIcon] = useState('ci:menu-alt-02');
    const MySwal = withReactContent(Swal);

    const toggleMenuOverlay = (e) => {
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
        MySwal.fire({
            position: "center",
            icon: "success",
            title: "Has cerrado sesión correctamente",
            showConfirmButton: false,
            timer: 2500,
        });
    }

    useEffect(() => {
        dispatch(getUserCredentials());
    }, [dispatch])

    /* isStudent is either false or true; true means is a logged-in student */
    /* isStudent is either false or true; true means is a logged-in student */
    return (
        <nav className="nav-bar">
            <ul className="nav-bar_items">
                <Link
                    className="nav-bar_logo"
                    to={!isStudent ? '/' : '/home'}>
                    <img className="nav-bar_logo"
                        src="https://i.imgur.com/sq20yHH.png"
                        alt="Learnzilla online academy logo (with a purple dinosaur)" />
                </Link>
                {
                    (!isStudent || location.pathname === '/') &&
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
                    (!isStudent || location.pathname === '/')
                        ? <section className="nav-bar_cta">
                            <li className="nav-bar_item">
                                <div className="nav-bar_cta_login">
                                    <Button
                                        link={
                                            !isStudent
                                                ? '/login'
                                                : '/home'
                                        }
                                        type={'raised'}
                                        text={'Login'}
                                    ></Button>
                                </div>
                            </li>
                            <li className="nav-bar_item">
                                <Button className='nav-bar_cta_sign-up'
                                    link={
                                        !isStudent
                                            ? '/signUp'
                                            : '/home'
                                    }
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
                                    text={''}
                                    icon={'ph:sign-out-bold'}
                                    tooltip={'Log out'}
                                    onClick={handleLogout}
                                ></Button>
                            </li>
                            <li className="nav-bar_item">
                                <div className="user-controls-profile-pic tooltip" >
                                    <span className="tooltip_text">
                                        My profile
                                    </span>
                                </div>
                            </li>
                        </section>
                }
                {
                    !isStudent &&
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
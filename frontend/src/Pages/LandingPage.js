import React from "react";
import Button from "../Components/Button";
import Navbar from "../Components/Navbar";
import './LandingPage.css';

export default function LandingPage() {
    return (
        <main>
            {/* isUser is either false or true; true means is a logged-in user */}
            {/* <div className="landing_container">
            </div> */}
            <section className="landing_hero" id="hero-section">
                <div className="landing_container">
                    <Navbar isUser={false}></Navbar>
                    <div className="landing_hero_cols">
                        <div className="hero_col1">
                            <h1 className="hero_col1_title title">
                                No need for other place. Find the best tutors for the best price
                                here!
                            </h1>
                            <div className="hero_col1_body">
                                <p className="hero_col1_text">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Pellentesque volutpat placerat consectetur euismod at semper
                                    porttitor diam at. Vel faucibus tellus urna pellentesque volutpat,
                                    vel habitant tristique. Montes, tellus dui, dis neque egestas nibh.
                                    Curabitur etiam pulvinar cras proin nec.
                                </p>
                                <a href="" className='hero_col1_cta'>
                                    <Button
                                        className='hero_col1_cta'
                                        link={'/landing'}
                                        text={'Get started'}
                                        icon={'bi:arrow-right-circle'}
                                        type={'raised-icon'}>
                                    </Button>
                                </a>
                            </div>
                        </div>
                        <div className="hero_col2">
                            <img
                                className="hero_col2_img"
                                src="https://i.imgur.com/xsVEe2E.png"
                                alt="Woman tutor smiling and holding a folder"
                            />
                        </div>
                    </div>
                </div>
                <a className="landing_scroll-btn" href="#why-section">
                    <span className="iconify" data-icon="eva:arrow-ios-downward-outline"></span>
                </a>
                <div className="landing_hero_bg"></div>
            </section>


            <section className="landing_why-section" id="why-section">
                <div className="landing_container">
                    <h2 className="landing_why-section_title section-title">Why us?</h2>
                    <div className="landing_why-section_cards">
                        <article className="why_section_cards_card1 why-section-card">
                            <div className="card1_header card-header">
                                <span className="iconify" data-icon="ic:round-price-check"></span>
                            </div>
                            <div className="card1_body">
                                <p className="card1_body_text">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum praesent eu luctus.
                                </p>
                            </div>
                        </article>
                        <article className="why_section_cards_card2 why-section-card">
                            <div className="card2_header card-header">
                                <img src="https://i.imgur.com/gEvyS6T.png"
                                    alt="800 number next to a plus symbol" />
                            </div>
                            <div className="card2_body">
                                <p className="card2_body_text">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum praesent eu luctus.
                                </p>
                            </div>
                        </article>
                        <article className="why_section_cards_card3 why-section-card">
                            <div className="card3_header card-header">
                                <span className="iconify" data-icon="ri:secure-payment-fill"></span>
                            </div>
                            <div className="card3_body">
                                <p className="card3_body_text">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum praesent eu luctus.
                                </p>
                            </div>
                        </article>
                    </div>
                </div>
            </section>


            <section className="landing_teach-section" id="teach-section">
                <div className="landing_container">
                    <h2 className="landing_teach-section_title section-title">
                        Start teaching today
                    </h2>
                    <div className="teach-section_cols bg-section">
                        <div className="teach-section_col1">
                            <img
                                className="teach-section_col1_img"
                                src="https://i.imgur.com/oY30FKL.png"
                                alt="Man teacher smiling in front of a projector"
                            />
                        </div>
                        <div className="teach-section_col2">
                            <h1 className="teach-section_col2_title title">
                                No need for other school. Find the best tutors at the best price!
                            </h1>
                            <div className="teach-section_col2_body">
                                <p className="teach-section_col2_text">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra fusce urna lectus proin at dignissim diam, augue. Ut urna sapien enim magna consectetur gravida. Tellus, scelerisque elit faucibus phasellus risus elit. Ut malesuada eget adipiscing tincidunt eu pretium ridiculus in. Molestie sit.
                                </p>
                                <Button
                                    link={'/landing'}
                                    text={'Start today'}
                                    icon={'bi:arrow-right-circle'}
                                    type={'raised-icon'}>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="landing_teach-section_bg"></div>
            </section>

            <section className="landing_about-section" id="about-section">
                <div className="landing_container">
                    <h2 className="landing_about-section_title section-title">
                        Learn about the team
                    </h2>
                    <div className="about-section_cols bg-section">
                        <div className="about-section_col1">
                            <picture className="about-section_col1_member">
                                <div className="about-section_col1_member-photo">
                                    <a href="/landing" target='_blank'><span className="iconify" data-icon="bi:linkedin"></span></a>
                                </div>
                                <caption className="about_section_col1_member-name">
                                    Lorem ipsum
                                </caption>
                            </picture>
                            <picture className="about-section_col1_member">
                                <div className="about-section_col1_member-photo">
                                    <a href="/landing" target='_blank'><span className="iconify" data-icon="bi:linkedin"></span></a>
                                </div>
                                <caption className="about_section_col1_member-name">
                                    Lorem ipsum
                                </caption>
                            </picture>
                            <picture className="about-section_col1_member">
                                <div className="about-section_col1_member-photo">
                                    <a href="/landing" target='_blank'><span className="iconify" data-icon="bi:linkedin"></span></a>
                                </div>
                                <caption className="about_section_col1_member-name">
                                    Lorem ipsum
                                </caption>
                            </picture>
                            <picture className="about-section_col1_member">
                                <div className="about-section_col1_member-photo">
                                    <a href="/landing" target='_blank'><span className="iconify" data-icon="bi:linkedin"></span></a>
                                </div>
                                <caption className="about_section_col1_member-name">
                                    Lorem ipsum
                                </caption>
                            </picture>
                            <picture className="about-section_col1_member">
                                <div className="about-section_col1_member-photo">
                                    <a href="/landing" target='_blank'><span className="iconify" data-icon="bi:linkedin"></span></a>
                                </div>
                                <caption className="about_section_col1_member-name">
                                    Lorem ipsum
                                </caption>
                            </picture>
                            <picture className="about-section_col1_member">
                                <div className="about-section_col1_member-photo">
                                    <a href="/landing" target='_blank'><span className="iconify" data-icon="bi:linkedin"></span></a>
                                </div>
                                <caption className="about_section_col1_member-name">
                                    Lorem ipsum
                                </caption>
                            </picture>
                            <picture className="about-section_col1_member">
                                <div className="about-section_col1_member-photo">
                                    <a href="https://www.linkedin.com/in/santiago-herrera-dev/" target='_blank'><span className="iconify" data-icon="bi:linkedin"></span></a>
                                </div>
                                <caption className="about_section_col1_member-name">
                                    Lorem ipsum
                                </caption>
                            </picture>
                            <picture className="about-section_col1_member">
                                <div className="about-section_col1_member-photo">
                                    <a href="/landing" target='_blank'><span className="iconify" data-icon="bi:linkedin"></span></a>
                                </div>
                                <caption className="about_section_col1_member-name">
                                    Lorem ipsum
                                </caption>
                            </picture>
                        </div>
                        <div className="about-section_col2">
                            <h1 className="about-section_col2_title title">
                                Lorem ipsum
                            </h1>
                            <div className="about-section_col2_body">
                                <p className="about-section_col2_text">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra fusce urna lectus proin at dignissim diam, augue. Ut urna sapien enim magna consectetur gravida. Tellus, scelerisque elit faucibus phasellus risus elit. Ut malesuada eget adipiscing tincidunt eu pretium ridiculus in. Molestie sit.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="landing_about-section_bg"></div>
            </section>


            <section className="landing_footer-section" id="footer-section">
                <div className="landing_container">
                    <div className="footer-section_cols bg-section">
                        <div className="footer-section_col1">
                            <h1 className="footer-section_col1_title title">
                                Lorem ipsum
                            </h1>
                            <div className="footer-section_col1_body">
                                <a className="footer-section_col1_text">
                                    Lorem ipsum
                                </a>
                                <a className="footer-section_col1_text">
                                    Lorem ipsum
                                </a>
                                <a className="footer-section_col1_text">
                                    Lorem ipsum
                                </a>
                            </div>
                        </div>
                        <div className="footer-section_col2">
                            <h1 className="footer-section_col2_title title">
                                Lorem ipsum
                            </h1>
                            <div className="footer-section_col2_body">
                                <a className="footer-section_col2_text">
                                    Lorem ipsum
                                </a>
                                <a className="footer-section_col2_text">
                                    Lorem ipsum
                                </a>
                                <a className="footer-section_col2_text">
                                    Lorem ipsum
                                </a>
                            </div>
                        </div>
                        <div className="footer-section_col3">
                            <h1 className="footer-section_col3_title title">
                                Lorem ipsum
                            </h1>
                            <div className="footer-section_col3_body">
                                <Button
                                    className='footer-section_col3_cta'
                                    link={'https://github.com/dbriceno10/sh_learning-app'}
                                    text={'See the project'}
                                    icon={'ant-design:github-outlined'}
                                    type={'flat-icon'}>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <h3 className="landing_footer-section_bottom-text">
                    Ut tempor non posuere porta pellentesque ut blandit massa.
                </h3>
                <div className="landing_footer-section_bg"></div>
            </section>
        </main>
    );
}

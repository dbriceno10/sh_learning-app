import { React } from "react";
import Button from "../../Components/Buttons/Buttons";
import Navbar from "../../Components/NavBars/Navbars";
import { Icon } from "@iconify/react";
import "./LandingPage.css";
import ScrollTopButton from "../../Components/ScrollTopButton/ScrollTopButton";

export default function LandingPage({ isLoggedIn }) {
  return (
    <main className="landing">
      {/* isUser is either false or true; true means is a logged-in user */}
      <section className="landing_hero" id="hero-section">
        <div className="page-container">
          <Navbar isLoggedIn={isLoggedIn}></Navbar>
          <div className="landing_hero_cols">
            <div className="hero_col1">
              <h1 className="hero_col1_title title">
                No hay necesidad de otro lugar. ¡Encuentra los mejores tutores
                al mejor precio aquí!
              </h1>
              <div className="hero_col1_body">
                <p className="hero_col1_text">
                  Es hoy! Podes empezar ahora mismo a estudiar con nosotros,
                  totalmente virtual y con todas las comodidades. Contamos con
                  una amplia cantidad de profesores con sus respectivos cursos.
                  ¡Nos interesa tu evolución académica!
                </p>
                <div className="hero_col1_ctas">
                  <Button
                    link={"/signUp"}
                    text={"Empecemos"}
                    icon={"bi:arrow-right-circle"}
                    btnVariant={"raised-icon"}
                  ></Button>
                  <Button
                    link={"/home"}
                    text={"Ver cursos"}
                    btnVariant={"flat"}
                  ></Button>
                </div>
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
          <Icon icon={"eva:arrow-ios-downward-outline"}></Icon>
        </a>
        <div className="landing_hero_bg"></div>
      </section>

      <section className="landing_why-section" id="why-section">
        <div className="page-container">
          <h2 className="landing_why-section_title section-title">
            Quienes somos?
          </h2>
          <div className="landing_why-section_cards">
            <article className="why_section_cards_card1 why-section-card">
              <div className="card1_header card-header">
                <span
                  className="iconify"
                  data-icon="ic:round-price-check"
                ></span>
              </div>
              <div className="card1_body">
                <p className="card1_body_text">
                  Contamos con los mejores precios de latinoamerica!
                </p>
              </div>
            </article>
            <article className="why_section_cards_card2 why-section-card">
              <div className="card2_header card-header">
                <img
                  src="https://i.imgur.com/gEvyS6T.png"
                  alt="800 number next to a plus symbol"
                />
              </div>
              <div className="card2_body">
                <p className="card2_body_text">
                  Mas de 800 visualizaciones diarias por curso!
                </p>
              </div>
            </article>
            <article className="why_section_cards_card3 why-section-card">
              <div className="card3_header card-header">
                <span
                  className="iconify"
                  data-icon="ri:secure-payment-fill"
                ></span>
              </div>
              <div className="card3_body">
                <p className="card3_body_text">
                  Contamos con la mejor seguridad para el usuario
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="landing_teach-section" id="teach-section">
        <div className="page-container">
          <h2 className="landing_teach-section_title section-title">
            Conviertete en instructor!
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
                Contamos con las mejores herramientas para una enseñanza
                profesional
              </h1>
              <div className="teach-section_col2_body">
                <p className="teach-section_col2_text">
                  Si desea ser instructor en "Learnzilla" solo debe registrarse
                  como profesor y se procedera a la validacion de su titulo y su
                  experiencia
                </p>
                <Button
                  link={"/login"}
                  text={"Empieza hoy"}
                  icon={"bi:arrow-right-circle"}
                  btnVariant={"raised-icon"}
                ></Button>
              </div>
            </div>
          </div>
        </div>
        <div className="landing_teach-section_bg"></div>
      </section>

      <section className="landing_about-section" id="about-section">
        <div className="page-container">
          <h2 className="landing_about-section_title section-title">
            Nuestro Equipo!
          </h2>
          <div className="about-section_cols bg-section">
            <div className="about-section_col1">
              <article className="about-section_col1_member">
                <div className="about-section_col1_member-photo about-section_col1_member1-photo">
                  <a
                    href="https://www.linkedin.com/in/samuel-cantos-4811a1208/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="iconify" data-icon="bi:linkedin"></span>
                  </a>
                </div>
                <span className="about_section_col1_member-name">
                  Samuel Cantos
                </span>
              </article>
              <article className="about-section_col1_member">
                <div
                  className="about-section_col1_member-photo
								about-section_col1_member2-photo"
                >
                  <a
                    href="https://www.linkedin.com/in/dbriceno10/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="iconify" data-icon="bi:linkedin"></span>
                  </a>
                </div>
                <span className="about_section_col1_member-name">
                  Daniel Briceño
                </span>
              </article>
              <article className="about-section_col1_member">
                <div
                  className="about-section_col1_member-photo
								about-section_col1_member3-photo"
                >
                  <a
                    href="https://www.linkedin.com/in/marcelo-malacalza/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="iconify" data-icon="bi:linkedin"></span>
                  </a>
                </div>
                <span className="about_section_col1_member-name">
                  Marcelo Malacalza
                </span>
              </article>
              <article className="about-section_col1_member">
                <div
                  className="about-section_col1_member-photo
								about-section_col1_member4-photo"
                >
                  <a
                    href="https://www.linkedin.com/in/romina-acevedo-98515920a/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="iconify" data-icon="bi:linkedin"></span>
                  </a>
                </div>
                <span className="about_section_col1_member-name">
                  Romina Acevedo
                </span>
              </article>
              <article className="about-section_col1_member">
                <div
                  className="about-section_col1_member-photo
								about-section_col1_member5-photo"
                >
                  <a
                    href="https://www.linkedin.com/in/david-murga-pereyra-5a3254216/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="iconify" data-icon="bi:linkedin"></span>
                  </a>
                </div>
                <span className="about_section_col1_member-name">
                  David Murga
                </span>
              </article>
              <article className="about-section_col1_member">
                <div
                  className="about-section_col1_member-photo
								about-section_col1_member6-photo"
                >
                  <a
                    href="https://www.linkedin.com/in/nestoralons/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="iconify" data-icon="bi:linkedin"></span>
                  </a>
                </div>
                <span className="about_section_col1_member-name">
                  Nestor Gómez
                </span>
              </article>
              <article className="about-section_col1_member">
                <div
                  className="about-section_col1_member-photo
								about-section_col1_member7-photo"
                >
                  <a
                    href="https://www.linkedin.com/in/santiago-herrera-dev/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="iconify" data-icon="bi:linkedin"></span>
                  </a>
                </div>
                <span className="about_section_col1_member-name">
                  Santiago Herrera
                </span>
              </article>
              <article className="about-section_col1_member">
                <div
                  className="about-section_col1_member-photo
								about-section_col1_member8-photo"
                >
                  <a
                    href="https://www.linkedin.com/in/alejandroml1/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="iconify" data-icon="bi:linkedin"></span>
                  </a>
                </div>
                <span className="about_section_col1_member-name">
                  Alejandro Muñoz
                </span>
              </article>
            </div>
            <div className="about-section_col2">
              <h1 className="about-section_col2_title title">Learnzilla</h1>
              <div className="about-section_col2_body">
                <p className="about-section_col2_text">
                  Se parte de la revolución digital con nosotros!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="landing_about-section_bg"></div>
        <ScrollTopButton />
      </section>

      <footer className="landing_footer-section" id="footer-section">
        <div className="page-container">
          <div className="footer-section_cols bg-section">
            <div className="footer-section_col1">
              <div className="footer-section_col2_body"></div>
            </div>
            <div className="footer-section_col3">
              <h1 className="footer-section_col3_title title"></h1>
              <div className="footer-section_col3_body">
                <button className="footer-section_col3_cta">
                  <Button
                    link={"https://github.com/dbriceno10/sh_learning-app"}
                    text={"Ver El Proyecto"}
                    icon={"ant-design:github-outlined"}
                    btnVariant={"flat-icon"}
                  ></Button>
                </button>
              </div>
            </div>
          </div>
        </div>
        <h3 className="landing_footer-section_bottom-text"></h3>
        <div className="landing_footer-section_bg"></div>
      </footer>
    </main>
  );
}

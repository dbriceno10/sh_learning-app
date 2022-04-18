import { React, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserCredentials } from "../../Actions/login.actions";
import {
  getProfileStudent,
  uptadeProfileStudent,
} from "../../Actions/profile.action.js";
import {
  getProfileTeacher,
  uptadeProfileTeacher,
} from "./../../Actions/profile.action";
import Button from "../Buttons/Buttons";
import "./Navbars.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Navbar({ isLoggedIn }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const [toggleMenuIcon, setToggleMenuIcon] = useState("ci:menu-alt-02");
  const { userCredentials } = useSelector((state) => state?.login);
  const user = useSelector((state) => state?.student.dataUser);
  const MySwal = withReactContent(Swal);

  const toggleMenuOverlay = (e) => {
    console.log("toggle");
    setToggleMenuIcon("eva:close-outline");
    let menu = document.querySelector(".nav-menu-overlay");
    let ctas = document.querySelector(".nav-bar_cta");
    let middleBtns = document.querySelector(".nav-bar_middle-btns");
    if (e.target.classList.contains("menu-visible")) {
      e.target.classList.remove("menu-visible");
    } else {
      e.target.classList.add("menu-visible");
    }
    if (menu.classList.contains("visible")) {
      menu.classList.remove("visible");
      middleBtns.classList.remove("menu-visible");
      ctas.classList.remove("menu-visible");
      setToggleMenuIcon("ci:menu-alt-02");
    } else {
      menu.classList.add("visible");
      middleBtns.classList.add("menu-visible");
      ctas.classList.add("menu-visible");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("userCredentials");
    window.localStorage.removeItem("cart");
    MySwal.fire({
      position: "center",
      icon: "success",
      title: "Has cerrado sesión correctamente",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  useEffect(() => {
    dispatch(getUserCredentials());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn && isLoggedIn === "student") {
      dispatch(getProfileStudent(userCredentials.id));
    } else if (isLoggedIn && isLoggedIn === "teacher") {
      dispatch(getProfileTeacher(userCredentials.id));
    }
  }, [userCredentials]);
  console.log(user);

  /* isLoggedIn is either false or true; true means is a logged-in student */
  /* isLoggedIn is either false or true; true means is a logged-in student */
  return (
    <nav className="nav-bar">
      <ul className="nav-bar_items">
        <Link
          className="nav-bar_logo"
          to={isLoggedIn === "none" ? "/" : "/home"}
        >
          <img
            className="nav-bar_logo"
            src="https://i.imgur.com/sq20yHH.png"
            alt="Learnzilla online academy logo (with a purple dinosaur)"
          />
        </Link>
        {(!isLoggedIn || location.pathname === "/") && (
          <section className="nav-bar_middle-btns">
            <li className="nav-bar_item">
              <Button
                link={"#why-section"}
                btnVariant={"flat"}
                text={"¿Quienes Somos?"}
              ></Button>
            </li>
            <li className="nav-bar_item">
              <Button
                link={"#teach-section"}
                btnVariant={"flat"}
                text={"Empieza Como Profesor"}
              ></Button>
            </li>
            <li className="nav-bar_item">
              <Button
                link={"#about-section"}
                btnVariant={"flat"}
                text={"Nuestro Equipo"}
              ></Button>
            </li>
          </section>
        )}
        {isLoggedIn === "none" || location.pathname === "/" ? (
          <section className="nav-bar_cta">
            <li className="nav-bar_item">
              <div className="nav-bar_cta_login">
                <Button
                  link={isLoggedIn === "none" ? "/login" : "/home"}
                  btnVariant={"raised"}
                  text={"Iniciar Sesión"}
                ></Button>
              </div>
            </li>
            <li className="nav-bar_item">
              <Button
                className="nav-bar_cta_sign-up"
                link={isLoggedIn === "none" ? "/signUp" : "/home"}
                btnVariant={"raised"}
                text={"Regístrate"}
              ></Button>
            </li>
          </section>
        ) : (
          <section className="nav-bar_user-controls">
            <li className="nav-bar_item">
              <Button
                className="user-controls_cart_btn"
                link={"/cart"}
                btnVariant={"round"}
                text={""}
                icon={"ph:shopping-cart-bold"}
                tooltip={"Carrito"}
              ></Button>
            </li>
            <li className="nav-bar_item">
              <Button
                className="user-controls_logout_btn"
                link={"/"}
                btnVariant={"round"}
                text={""}
                icon={"ph:sign-out-bold"}
                tooltip={"Cerrar sesión"}
                onClick={handleLogout}
              ></Button>
            </li>
            <li className="nav-bar_item">
              <Link to={"/profile"}>
                <div
                  className="user-controls-profile-pic tooltip"
                  style={{
                    backgroundImage: `url(${user.avatar})`,
                  }}
                >
                  <span className="tooltip_text">Mi perfil</span>
                </div>
              </Link>
            </li>
          </section>
        )}
        {isLoggedIn === "none" && (
          <section className="nav-bar_menu">
            <Button
              link={""}
              btnVariant={"raised-icon"}
              icon={toggleMenuIcon}
              onClick={(e) => toggleMenuOverlay(e)}
            ></Button>
          </section>
        )}
      </ul>
      <div className="nav-menu-overlay"></div>
    </nav>
  );
}

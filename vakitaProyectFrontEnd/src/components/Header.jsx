
<<<<<<< HEAD
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/header.css";
import logoVaca from "../assets/LogoVaca.svg";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import { useModal } from "../hooks/useModal";
import MenuIcon from "../assets/menu_burger.svg";
import { Link } from 'react-router-dom';
import { useUser } from "../context/UserProvider";
=======
import { useLocation } from "react-router-dom";
import "../styles/header.css";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import { useModal } from "../hooks/useModal";
import { Link } from 'react-router-dom';
import { useUser } from "../context/UserProvider";
import { useState, useEffect } from "react";
// import UserProfileImage from "./Perfil/UserProfileImage";
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc

function Header() {
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [activeButton, setActiveButton] = useState("Iniciar-sesion");
  const location = useLocation();
  const currentPath = location.pathname;
  const { logged } = useUser();

<<<<<<< HEAD
=======

>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc
  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId === activeButton ? null : buttonId);
  };

  return (
    <header className="header">
<<<<<<< HEAD
      <Link to="/"><img className="header-logo" src={logoVaca} alt="logo" /></Link>
=======
      <Link to="/"><img className="header-logo" src="https://grupo3-vakita.s3.amazonaws.com/assets/LogoVaca.svg" alt="logo" /></Link>
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc

      <div className="header-botones">
        {(currentPath === "/" && !logged || currentPath === "/register") && (
          <Link to="/log-in"><button
            className={`nav_item ${activeButton === "Iniciar-sesion" ? "active" : ""}`}
            id="Iniciar-sesion"
            onClick={() => handleButtonClick("Iniciar-sesion")}
          >
            Iniciar sesión
          </button></Link>
        )}

        {(currentPath === "/" && !logged || currentPath === "/log-in") && (
           <Link to="/register"><button
            className={`nav_item ${activeButton === "Crear-cuenta" ? "active" : ""}`}
            id="Crear-cuenta"
            onClick={() => handleButtonClick("Crear-cuenta")}
          >
           Crear cuenta
          </button></Link>
        )}

{(currentPath === "/" && logged) && (
<<<<<<< HEAD
=======
  <>
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc
         <Link to="/dashboard"> <button
            className={`nav_item ${activeButton === "Crear-cuenta" ? "active" : ""}`}
            id="dashboard"
            onClick={() => handleButtonClick("Crear-cuenta")}
          >
            Dashboard
          </button></Link>
<<<<<<< HEAD
        )}

        {/* menu hamburguesa para mobile */}
=======
          <div>
          </div>
          </>
        )}

>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc
        <button
          className="nav_btn_menu"
          title="Abrir menú"
          aria-label="Abrir menú"
          onClick={() => openModal()}
        >
<<<<<<< HEAD
          <img className="img-menuIcon" src={MenuIcon} alt="menu" />
=======
          <img className="img-menuIcon" src="https://grupo3-vakita.s3.amazonaws.com/assets/menu_burger.svg" alt="menu" />
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc
        </button>
        <BurgerMenu isOpen={isOpenModal} closeMenu={closeModal} />
      </div>
    </header>
  );
}

export default Header;



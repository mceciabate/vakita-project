// import React from "react";
// import "../styles/header.css"
// import logoVaca from "../assets/LogoVaca.svg";
// import BurgerMenu from "./BurgerMenu/BurgerMenu";
// import { useModal } from "../hooks/useModal";
// import MenuIcon from "../assets/menu_burger.svg"
// import { Link, useLocation } from 'react-router-dom'


// function Header() {


//   const [isOpenModal, openModal, closeModal] = useModal(false);

//   const location = useLocation();

//   return (
//     <header className="header">

//       <Link to="/"><img className="header-logo" src={logoVaca} alt="logo" /></Link>

//       <div className="header-botones">

//         <button className="nav_item" id="Iniciar-sesion">
//           <Link to="/log-in">Iniciar sesión</Link>
//         </button>

//         <button className="nav_item" id="Crear-cuenta">
//         <Link to="/register"> Crear cuenta </Link>
//         </button>

{/* menu hamburguesa para mobile */}

//         <button 
//         className="nav_btn_menu" 
//         title="Abrir menú"
//         aria-label="Abrir menú"
//         onClick={()=> {openModal()}}>
//           <img className="img-menuIcon" src={MenuIcon} />
//         </button>
//         <BurgerMenu isOpen={isOpenModal} closeMenu={closeModal}/>  
//       </div>
      
//     </header>
//   );
// }

// export default Header;
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/header.css";
import logoVaca from "../assets/LogoVaca.svg";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import { useModal } from "../hooks/useModal";
import MenuIcon from "../assets/menu_burger.svg";
import { Link } from 'react-router-dom';

function Header() {
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [activeButton, setActiveButton] = useState("Iniciar-sesion");
  const location = useLocation();
  const currentPath = location.pathname;

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId === activeButton ? null : buttonId);
  };

  return (
    <header className="header">
      <Link to="/"><img className="header-logo" src={logoVaca} alt="logo" /></Link>

      <div className="header-botones">
        {(currentPath === "/" || currentPath === "/register") && (
          <button
            className={`nav_item ${activeButton === "Iniciar-sesion" ? "active" : ""}`}
            id="Iniciar-sesion"
            onClick={() => handleButtonClick("Iniciar-sesion")}
          >
            <Link to="/log-in">Iniciar sesión</Link>
          </button>
        )}

        {(currentPath === "/" || currentPath === "/log-in") && (
          <button
            className={`nav_item ${activeButton === "Crear-cuenta" ? "active" : ""}`}
            id="Crear-cuenta"
            onClick={() => handleButtonClick("Crear-cuenta")}
          >
            <Link to="/register">Crear cuenta</Link>
          </button>
        )}

        {/* menu hamburguesa para mobile */}
        <button
          className="nav_btn_menu"
          title="Abrir menú"
          aria-label="Abrir menú"
          onClick={() => openModal()}
        >
          <img className="img-menuIcon" src={MenuIcon} alt="menu" />
        </button>
        <BurgerMenu isOpen={isOpenModal} closeMenu={closeModal} />
      </div>
    </header>
  );
}

export default Header;



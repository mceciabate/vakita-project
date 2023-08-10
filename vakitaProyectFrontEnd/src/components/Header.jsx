import React from "react";
import "../styles/header.css"
import logoVaca from "../assets/LogoVaca.svg";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import { useModal } from "../hooks/useModal";
import MenuIcon from "../assets/menu_burger.svg"
import { Link } from 'react-router-dom'


function Header() {

  const [isOpenModal, openModal, closeModal] = useModal(false);

  return (
    <header className="header">

      <img className="header-logo" src={logoVaca} alt="logo" />

      <div className="header-botones">

        <button className="nav_item" id="Iniciar-sesion">
          <Link to="/Log-in">Iniciar sesión</Link>
        </button>

        <button className="nav_item" id="Crear-cuenta">
          Crear cuenta
        </button>

{/* menu hamburguesa para mobile */}

        <button 
        className="nav_btn_menu" 
        title="Abrir menú"
        aria-label="Abrir menú"
        onClick={()=> {openModal()}}>
          <img className="img-menuIcon" src={MenuIcon} />
        </button>
        <BurgerMenu isOpen={isOpenModal} closeMenu={closeModal}/>  
      </div>
      
    </header>
  );
}

export default Header;
import React, { useEffect } from "react";
import "../styles/header.css"
import logoVaca from "../assets/LogoVaca.svg";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import { useModal } from "../hooks/useModal";


function Header() {

  const [isOpenModal, openModal, closeModal] = useModal(false);

  useEffect(() => {
    console.log(isOpenModal)
  }, [isOpenModal])

  return (
    <header className="header">

      <img className="header-logo" src={logoVaca} alt="logo" />

      <div className="header-botones">

        <button className="nav_item" id="Iniciar-sesion">
          Iniciar sesión
        </button>

        <button className="nav_item" id="Crear-cuenta">
          Crear cuenta
        </button>

        <button onClick={()=> {openModal()}}>pruebaaa</button>
        <BurgerMenu isOpen={isOpenModal} closeMenu={closeModal}/>

      </div>

    </header>
  );
}

export default Header;
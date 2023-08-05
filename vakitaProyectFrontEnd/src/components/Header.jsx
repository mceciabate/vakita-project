import React from "react";
import "../styles/header.css"
import logoVaca from "../assets/LogoVaca.svg";


function Header() {
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

      </div>

    </header>
  );
}

export default Header;
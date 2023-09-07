
import { useLocation } from "react-router-dom";
import "../styles/header.css";
import logoVaca from "../assets/LogoVaca.svg";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import { useModal } from "../hooks/useModal";
import MenuIcon from "../assets/menu_burger.svg";
import { Link } from 'react-router-dom';
import { useUser } from "../context/UserProvider";
import { useState, useEffect } from "react";
// import UserProfileImage from "./Perfil/UserProfileImage";

function Header() {
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [activeButton, setActiveButton] = useState("Iniciar-sesion");
  const location = useLocation();
  const currentPath = location.pathname;
  const { logged } = useUser();

  // const userId = localStorage.getItem("userId");
  // const [user, setUser] = useState({
  //   name: "",
  //   lastName: "",
  //   dni: "",
  //   email: "",
  //   birthdate: "",
  //   alias: "",
  //   avatar: "",
  // });

  // useEffect(() => {
  //   fetch("http://107.22.65.36:8080/api/v1/usuarios/" + userId)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setUser(data);
       
  //     })
  //     .catch((error) => console.error(error));
  // }, [userId]);

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId === activeButton ? null : buttonId);
  };

  return (
    <header className="header">
      <Link to="/index.html"><img className="header-logo" src={logoVaca} alt="logo" /></Link>

      <div className="header-botones">
        {(currentPath === "/index.html" && !logged || currentPath === "/register") && (
          <Link to="/log-in"><button
            className={`nav_item ${activeButton === "Iniciar-sesion" ? "active" : ""}`}
            id="Iniciar-sesion"
            onClick={() => handleButtonClick("Iniciar-sesion")}
          >
            Iniciar sesión
          </button></Link>
        )}

        {(currentPath === "/index.html" && !logged || currentPath === "/log-in") && (
           <Link to="/register"><button
            className={`nav_item ${activeButton === "Crear-cuenta" ? "active" : ""}`}
            id="Crear-cuenta"
            onClick={() => handleButtonClick("Crear-cuenta")}
          >
           Crear cuenta
          </button></Link>
        )}

{(currentPath === "/index.html" && logged) && (
  <>
         <Link to="/dashboard"> <button
            className={`nav_item ${activeButton === "Crear-cuenta" ? "active" : ""}`}
            id="dashboard"
            onClick={() => handleButtonClick("Crear-cuenta")}
          >
            Dashboard
          </button></Link>
          <div>
          </div>
          </>
        )}
{/* 
{(currentPath === "/dashboard" && logged) && (
  <>
        
          <div className="boxProfile">
          <UserProfileImage user={user} />
          </div>
          </>
        )} */}

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



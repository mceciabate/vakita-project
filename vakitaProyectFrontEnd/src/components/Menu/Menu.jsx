
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserProvider";
 import { BloqueOptions,HeaderMenuLateral, MenuDiv, MenuLateral,MenuSinLoguear } from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import UserProfileImage from "../Perfil/UserProfileImage";

const Menu = ({ handleCloseModal }) => {
  const { logged, setLogged } = useUser();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    dni: "",
    email: "",
    birthdate: "",
    alias: "",
    avatar: "",
  });

  useEffect(() => {
    if (logged) {
      fetch("http://107.22.65.36:8080/api/v1/usuarios/" + userId)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setUser(data);
        })
        .catch((error) => console.error(error));
    }
  }, [userId, logged]);

  return (
    <>
      <MenuDiv>
        {logged ? (
          <>
            <MenuLateral>
              <HeaderMenuLateral>
                <UserProfileImage user={user} />
              </HeaderMenuLateral>

              <BloqueOptions>
                <Link to="/dashboard" onClick={handleCloseModal}>
                  Inicio
                </Link>
                <Link to="/dashboard/crear-vaka" onClick={handleCloseModal}>
                  Nueva Vaka
                </Link>
                <Link to="/dashboard/mis-vakitas" onClick={handleCloseModal}>
                  Mis Vakitas
                </Link>
                <hr />
                 <Link to="/dashboard/mi-perfil" onClick={handleCloseModal}>Mi perfil</Link>
                 <Link to="/dashboard/mis-datos-financieros" onClick={handleCloseModal}>
                   Datos financieros
                 </Link>
                 <hr />
                 <Link to="/dashboard/transacciones" onClick={handleCloseModal}>
                   Transacciones
                </Link> 
                 <Link to="/dashboard/extraer-dinero" onClick={handleCloseModal}>
                   Extracción de dinero
                 </Link>
             

                 <button
                  onClick={() => {
                    setLogged(false);
                    navigate("/");
                    window.localStorage.clear();
                  }}
                  className="botonSalir"
                >
                  {" "}
                  <p className="textExit">Salir</p>{" "}
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </button>
              </BloqueOptions>
            </MenuLateral>
            <Outlet />
          </>
        ) : (
          <MenuSinLoguear>
            <div className="boxBtn">
            <button className="btnMenu">
              <Link to="/log-in" onClick={handleCloseModal}>
                Iniciar sesión
              </Link>
            </button>
            <button>
              <Link to="/register" onClick={handleCloseModal}>
                Crear cuenta
              </Link>
            </button>
            </div>
          </MenuSinLoguear>
        )}
      </MenuDiv>
    </>
  );
};

export default Menu;

import { BloqueOptions,HeaderMenuLateral, MenuDiv, MenuLateral,MenuSinLoguear } from "./styled";
<<<<<<< HEAD
import  Avatar from "../../assets/vaquitaPerfil.png";
=======
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc
import { Link, Outlet, useNavigate} from 'react-router-dom'
import { useUser } from "../../context/UserProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
<<<<<<< HEAD
=======
import { useState, useEffect } from "react";
import UserProfileImage from "../Perfil/UserProfileImage";
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc

const Menu = () => {
  const { logged, setLogged } = useUser();
  const navigate = useNavigate();
<<<<<<< HEAD
=======
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
    fetch("http://107.22.65.36:8080/api/v1/usuarios/" + userId)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => console.error(error))
  }, [userId]);
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc
  return (
    <>
      <MenuDiv>
        {logged ? (
          <>
            <MenuLateral>
              <HeaderMenuLateral>
<<<<<<< HEAD
                <img className="avatar" src={Avatar} alt="Avatar" />
                <h3>
                  Hola, <br /> Cecilia Abate
                </h3>
=======
            
              <UserProfileImage user={user} />
               
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc
              </HeaderMenuLateral>

              <BloqueOptions>
                <Link to="/dashboard">Inicio</Link>
                <Link to="/dashboard/crear-vaca">Nueva Vaca</Link>
                <Link to="/dashboard/mis-vaquitas">Mis Vaquitas</Link>
                <hr />
                <Link to="/dashboard/mi-perfil">Mi perfil</Link>
                <Link to="/dashboard/mis-datos-financieros">
                  Datos financieros
                </Link>
                <hr />
<<<<<<< HEAD
                <Link to="/dashboard/necesito-mi-dinero">
                  Necesito mi dinero
                </Link>
                <Link to="/dashboard/ayuda">Ayuda</Link>
=======
                <Link to="/dashboard/transacciones">
                  Transacciones
                </Link> 
                 <Link to="/dashboard/extraer-dinero">
                  Extracción de dinero
                </Link>
             
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc

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
            <button>
              <Link to="/log-in">Iniciar sesión</Link>
            </button>
            <button>
              {" "}
              <Link to="/register">Crear cuenta</Link>
            </button>
          </MenuSinLoguear>
        )}
      </MenuDiv>
    </>
  );
};

export default Menu;

import { BloqueOptions,HeaderMenuLateral, MenuDiv, MenuLateral,MenuSinLoguear } from "./styled";
import  Avatar from "../../assets/usuario2.png";
import { Link, Outlet, useNavigate} from 'react-router-dom'
import { useUser } from "../../context/UserProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react";
import UserProfileImage from "../Perfil/UserProfileImage";

const Menu = () => {
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
      .catch((error) => console.error(error))
  }, [userId]);
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
                <Link to="/dashboard">Inicio cambio Cecilia</Link>
                <Link to="/dashboard/crear-vaca">Nueva Vaca</Link>
                <Link to="/dashboard/mis-vaquitas">Mis Vaquitas</Link>
                <hr />
                <Link to="/dashboard/mi-perfil">Mi perfil</Link>
                <Link to="/dashboard/mis-datos-financieros">
                  Datos financieros
                </Link>
                <hr />
                <Link to="/dashboard/transacciones">
                  Transacciones
                </Link>
                {/* <Link to="/dashboard/ayuda">Ayuda</Link> */}

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

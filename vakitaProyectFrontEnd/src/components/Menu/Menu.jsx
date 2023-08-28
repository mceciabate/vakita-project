import { BloqueOptions,HeaderMenuLateral, MenuDiv, MenuLateral,MenuSinLoguear } from "./styled";
import  Avatar from "../../assets/vaquitaPerfil.png";
import { Link, Outlet, useNavigate} from 'react-router-dom'
import { useUser } from "../../context/UserProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"

const Menu = () => {
  const { logged, setLogged } = useUser();
  const navigate = useNavigate();
  return (
    <>
      <MenuDiv>
        {logged ? (
          <>
            <MenuLateral>
              <HeaderMenuLateral>
                <img className="avatar" src={Avatar} alt="Avatar" />
                <h3>
                  Hola, <br /> Cecilia Abate
                </h3>
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
                <Link to="/dashboard/necesito-mi-dinero">
                  Necesito mi dinero
                </Link>
                <Link to="/dashboard/ayuda">Ayuda</Link>

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
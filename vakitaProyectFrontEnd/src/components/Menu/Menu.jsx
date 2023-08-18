import { BloqueOptions,HeaderMenuLateral, MenuDiv, MenuLateral } from "./styled";
import  Avatar from "../../assets/vaquitaPerfil.png";
import { Link, Outlet} from 'react-router-dom'
import { useUser } from "../../context/UserProvider";


const Menu = () => {
   
    const { logged, setLogged } = useUser()
   
    return (
        <>
       
        <MenuDiv>
            
        {logged?  <>
        <MenuLateral>
            <HeaderMenuLateral>

            <img className="avatar" src={Avatar} alt="Avatar" />
                <h3>Hola, <br/> Cecilia Abate</h3>
                
            </HeaderMenuLateral>
          
            <BloqueOptions>
            <Link to="/dashboard">Inicio</Link>
                <Link to="/dashboard/crear-vaca">Nueva Vaca</Link>
                <Link to="/dashboard/mis-vaquitas">Mis Vaquitas</Link>
                <hr />
                <Link to="/dashboard/mi-perfil">Mi perfil</Link>
                <Link to="/dashboard/datos-financieros">Datos financieros</Link>
                <hr />
                <Link to="/dashboard/necesito-mi-dinero">Necesito mi dinero</Link>
                <Link to="/dashboard/ayuda">Ayuda</Link>
            </BloqueOptions>
            <button onClick={() => {
             
              window.top.location.reload();
              setLogged(false);
              }
              }
              className="botonSalir">Salir</button>
           
           
           
        
        </MenuLateral>
        <Outlet/></>: 
        <div>
        <button><Link to="/log-in" style={{color: "white"}}>Iniciar sesión</Link></button>
        <button> <Link to="/register" style={{color: "white"}}>Crear cuenta</Link></button>
        </div>
            }
        
        </MenuDiv>
       
        
        </>
    )
};

export default Menu;
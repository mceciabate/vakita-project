import { BloqueOptions,HeaderMenuLateral, MenuDiv, MenuLateral } from "./styled";
import  Avatar from "../../assets/vaquitaPerfil.png";
import { Link, Outlet } from 'react-router-dom'


const Menu = () => {
   
    return (
        <>
       
        <MenuDiv>
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
            <button className="botonSalir">Salir</button>
           
           
           
        </MenuLateral>
        <Outlet/>
        </MenuDiv>
       
        
        </>
    )
};

export default Menu;
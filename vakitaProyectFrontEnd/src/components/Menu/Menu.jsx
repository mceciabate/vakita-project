import { BloqueOptions,HeaderMenuLateral, MenuDiv, MenuLateral } from "./styled";
import { DashboardDiv, Sections,SectionLanding } from "../Dashboard/styled"
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
            <Link to="/menu">Inicio</Link>
                <Link to="/menu/crear-vaca">Nueva Vaca</Link>
                <Link to="/menu/mis-vaquitas">Mis Vaquitas</Link>
                <hr />
                <Link to="/mi-perfil">Mi perfil</Link>
                <Link to="/datos-financieros">Datos financieros</Link>
                <hr />
                <Link to="/necesito-mi-dinero">Necesito mi dinero</Link>
                <Link to="/ayuda">Ayuda</Link>
            </BloqueOptions>
            <button className="botonSalir">Salir</button>
           
           
           
        </MenuLateral>
        <Outlet/>
        </MenuDiv>
       
        
        </>
    )
};

export default Menu;
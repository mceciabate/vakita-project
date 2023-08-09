import { BloqueOptions,HeaderMenuLateral, MenuLateral } from "./styled";
import  Avatar from "../../assets/vaquitaPerfil.png";

const Menu = () => {
    
    return (
        <MenuLateral>
            <HeaderMenuLateral>

            <img className="avatar" src={Avatar} alt="Avatar" />
                <h3>Hola, <br/> Cecilia Abate</h3>
                
            </HeaderMenuLateral>

            <BloqueOptions>
                <a>Nueva Vaca</a>
                <a>Mis Vaquitas</a>
                <hr />
                <a>Mi perfil</a>
                <a>Datos financieros</a>
                <hr />
                <a>Necesito mi dinero</a>
                <a>Ayuda</a>
                <hr />
                <a>Cerrar sesión</a>
            </BloqueOptions>
            <button>Salir</button>
        </MenuLateral>
    )
};

export default Menu;
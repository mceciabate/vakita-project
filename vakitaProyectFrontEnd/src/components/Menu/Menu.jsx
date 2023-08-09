import { BloqueOptions, MenuLateral } from "./styled";

const Menu = () => {
    return (
        <MenuLateral>
            <BloqueOptions>
                <a>Nueva Vaca</a>
                <a>Mis Vaquitas</a>
                <hr/>
                <a>Mi perfil</a>
                <a>Datos financieros</a>
                <hr/>
                <a>Necesito mi dinero</a>
                <a>Ayuda</a>
                <hr/>
                <a>Cerrar sesión</a>
            </BloqueOptions>
            <button>Salir</button>
        </MenuLateral>
    )
};

export default Menu;
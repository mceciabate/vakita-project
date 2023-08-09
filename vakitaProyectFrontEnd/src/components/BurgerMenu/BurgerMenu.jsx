import Menu from "../Menu/Menu";
import ModalMenu from "../Modal/ModalMenu";

const BurgerMenu = ({isOpen, closeMenu}) => {

    return (
        <ModalMenu isOpen={isOpen} closeModal={closeMenu}>
            <Menu/>
        </ModalMenu>
    )

}

export default BurgerMenu;
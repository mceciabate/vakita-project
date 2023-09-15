
import React from "react";
import Menu from "../Menu/Menu";
import ModalMenu from "../Modal/ModalMenu";

const BurgerMenu = ({ isOpen, closeMenu }) => {
  const handleCloseModal = () => {
    closeMenu();
  };

  return (
    <ModalMenu isOpen={isOpen} closeModal={closeMenu}>
      <Menu handleCloseModal={handleCloseModal} />
    </ModalMenu>
  );
};

export default BurgerMenu;

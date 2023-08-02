import styles from "../styles-modules/header.css";
import logoVaca from "../assets/LogoVaca.svg";


function Header () {
    return (
      <header className={styles.header}>

        <img className="header-logo" src={logoVaca} alt="logo" />


        <div className="nav_menu">
       
          <button className="nav_item" id="Iniciar-sesion">
            Iniciar sesión
          </button>
        
    
          <button className="nav_item" id="Crear-cuenta">
            Crear cuenta
          </button>
        
      </div>

      </header>
    );
  }

  export default Header;
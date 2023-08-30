import PanelProfile from '../../assets/PanelProfile/PanelProfile';
import { H2, Li, ListDiv, PerfilContainer } from "./styled";
import { useState, useEffect } from "react";

const Perfil = () => {
  const [user, setUser] = useState([])

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch("http://107.22.65.36:8080/api/v1/usuarios/"+userId)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error(error));
  },[userId]);

    return (
      <PerfilContainer>
          <H2>Mi Perfil</H2>

        <PanelProfile img={"https://i.pinimg.com/1200x/b1/27/ec/b127ec5f10f9c07ecb04996116d1306e.jpg"} nameUser={user.name + " " + user.lastName} subtitle='VAKITA USER'/>

        <ListDiv>
          <Li>
            <h5>Nombre</h5>
            <p>{user.name}</p>
          </Li>
          <Li>
            <h5>Apellido</h5>
            <p>{user.lastName}</p>
          </Li>
          <Li>
            <h5>DNI</h5>
            <p>{user.dni}</p>
          </Li>
          <Li>
            <h5>Email</h5>
            <p>{user.email}</p>
          </Li>
          <Li>
            <h5>Fecha de nacimiento</h5>
            <p>{user.birthdate}</p>
          </Li>
        </ListDiv>
      </PerfilContainer>
    );
  };
  
  export default Perfil;
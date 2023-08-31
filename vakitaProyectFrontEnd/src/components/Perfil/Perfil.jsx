import { Hr, Li, ListDiv, PerfilContainer, ProfileHeader } from './styled';
import { useState, useEffect } from "react";

const Perfil = () => {
  const [user, setUser] = useState([])

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch("http://107.22.65.36:8080/api/v1/usuarios/"+userId)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error(error));
  },[]);

  useEffect(() => {
    console.log(user);
  },[user])

    return (
      <PerfilContainer>
        <ProfileHeader>
          <h2>
            <img src="" />
            Mi Perfil
          </h2>
          <p>Acá puedes ver tus datos de cuenta</p>
        </ProfileHeader>

        <Hr />

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
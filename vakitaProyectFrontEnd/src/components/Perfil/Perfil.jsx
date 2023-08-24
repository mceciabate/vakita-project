// import 'semantic-ui-css/semantic.min.css'
import { Hr, Li, ListDiv, PerfilContainer, ProfileHeader } from './styled';
import { useState } from "react";

const Perfil = () => {
  const [user, setUser] = useState([])
  // useEffect(() => {
  //   fetch("http://107.22.65.36:8080/api/v1/usuarios{id}")
  //     .then((response) => response.json())
  //     .then(setUser(json));
  // }, []);

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
            <p>{user.nombre}</p>
          </Li>
          <Li>
            <h5>DNI</h5>
            <p>{user.nombre}</p>
          </Li>
          <Li>
            <h5>Email</h5>
            <p>{user.nombre}</p>
          </Li>
          <Li>
            <h5>Fecha de nacimiento</h5>
            <p>{user.nombre}</p>
          </Li>
        </ListDiv>
      </PerfilContainer>
    );
  };
  
  export default Perfil;

  /* Código para mostrar datos de usuario (Sprint 2)
import {useState} from 'react'

*Agregar consulta antes de return:
  const [user, setUser] = useState([])
useEffect(()=>{
fetch('http://107.22.65.36:8080/api/v1/usuarios{id}')
.then(response => response.json())
.then(json.setUser(json))
}, [])
  

*En return: 
 users.map((user,id)=>{
  return(
<List.Item icon='user circle' content={user.name}/>
<List.Item icon='user circle' content={user.lastname}/>  
<List.Item icon='address card'
      content={user.dni}
    />
    <List.Item icon='calendar'
      content={user.birthdate}
    />
    </Segment>
    <Segment secondary color='pink'>
    <List.Item
      icon='mail'
      content='email'
    />
  )
 })


  */
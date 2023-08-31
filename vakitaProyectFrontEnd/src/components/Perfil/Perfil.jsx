import PanelProfile from '../../assets/PanelProfile/PanelProfile';
import { Div1, Div2, H2, Li, ListDiv, PerfilContainer, TitleH5 } from "./styled";
import { useState, useEffect } from "react";

const Perfil = () => {
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    dni: "",
    email: "",
    birthdate: "",
  });

  const [dataUser, setDataUser] = useState({
    name: "",
    lastName: "",
    dni: "",
    email: "",
    birthdate: "",
  })

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch("http://107.22.65.36:8080/api/v1/usuarios/"+userId)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error(error));
  },[userId]);


  useEffect(() => {
    setDataUser({
      name: user.name,
      lastName: user.lastName,
      dni: user.dni,
      email: user.email,
      birthdate: user.birthdate,
    });
  }, [user]);

  
  const onChangeData = (key, value) => {
        const updateDataUser = { ...dataUser };
        updateDataUser[key] = value;
        setDataUser(updateDataUser)
  }

    return (
      <PerfilContainer>
        <H2>Mi Perfil</H2>

        <PanelProfile
          img={
            "https://i.pinimg.com/1200x/b1/27/ec/b127ec5f10f9c07ecb04996116d1306e.jpg"
          }
          nameUser={user.name + " " + user.lastName}
          subtitle="VAKITA USER"
        />

        <ListDiv>
          <TitleH5>¿Quieres cambiar tus datos?</TitleH5>

          <Div1>
            <Li>
              <h5>Nombre</h5>
              <input
                value={dataUser.name}
                onChange={(e) => onChangeData("name", e.target.value)}
              />
            </Li>
            <Li>
              <h5>Apellido</h5>
              <input
                value={dataUser.lastName}
                onChange={(e) => onChangeData("lastName", e.target.value)}
              />
            </Li>
            <Li>
              <h5>DNI</h5>
              <input
                value={dataUser.dni}
                onChange={(e) => onChangeData("dni", e.target.value)}
              />
            </Li>
          </Div1>

          <Div2>
            <Li>
              <h5>Email</h5>
              <input
                value={dataUser.email}
                onChange={(e) => onChangeData("email", e.target.value)}
              />
            </Li>
            <Li>
              <h5>Fecha de nacimiento</h5>
              <input
                value={dataUser.birthdate}
                onChange={(e) => onChangeData("birthdate", e.target.value)}
              />
            </Li>

            <button>Guardar cambios</button>
          </Div2>
        </ListDiv>

      </PerfilContainer>
    );
  };
  
  export default Perfil;
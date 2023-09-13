import { Div1, Div2, H2, Label, Input, Li, ListDiv, PerfilContainer, TitleH5, Button } from "./styled";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import Swal from 'sweetalert2';
import { ErrorSpan } from '../Register/Register.styled';
import UserProfileImage from './UserProfileImage';

const Perfil = () => {
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    dni: "",
    email: "",
    birthdate: "",
    alias: "",
    avatar: "",
  });

  const userId = localStorage.getItem("userId");

  //Logica avatar
  function handleAvatarInputChange(event) {
    const avatarInput = event.target;
    const file = avatarInput.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        // Aquí tienes los datos binarios de la imagen en e.target.result
        const binaryImageData = e.target.result.split(",");
        formik.values.avatar = String(binaryImageData[1]);
      };
  
      // Lee el contenido del archivo como datos binarios
      reader.readAsDataURL(file);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: user.name,
      lastName: user.lastName,
      alias: user.alias,
      avatar: user.avatar,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(1, "Debe contener al menos un caracter")
        .max(50)
        .required("Nombre es requerido"),
      lastName: Yup.string()
        .min(1, "Debe contener al menos un caracter")
        .max(50)
        .required("Apellido es requerido"),
      alias: Yup.string()
        .min(1, "Debe contener al menos un caracter")
        .max(50)
        .required("Alias es requerido"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.put(
          "http://107.22.65.36:8080/api/v1/usuarios/" + userId,
          {
            name: values.name,
            lastName: values.lastName,
            alias: values.alias,
            avatar: values.avatar,
          }
        );

        if (response.status === 200) {
          // Update the user's name in the state after a successful PUT request
          setUser({
            ...user,
            name: values.name,
            lastName: values.lastName,
            alias: values.alias,
            avatar: values.avatar,
          });

          Swal.fire({
            title: "Datos actualizados",
            text: "",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "No has modificado tus datos",
            text: "",
            icon: "warning",
          });
        }
      } catch (e) {
        console.log(e);

        Swal.fire({
          title: "No se pudieron actualizar los datos :(",
          text: e.code,
          icon: "error",
        });
      }
    },
  });

  useEffect(() => {
    fetch("http://107.22.65.36:8080/api/v1/usuarios/" + userId)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        formik.setValues({
          name: data.name,
          lastName: data.lastName,
          alias: data.alias,
          avatar: data.avatar,
        });
      })
      .catch((error) => console.error(error));
  }, [userId]);

  

  return (
    <PerfilContainer>
      <H2>Mi Perfil</H2>

      <UserProfileImage user={user} />

      <ListDiv onSubmit={formik.handleSubmit}>
        <TitleH5>Acá puedes actualizar tus datos</TitleH5>

        <Div1>
          <Li>
            <Label>Nombre</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <ErrorSpan>{formik.errors.name}</ErrorSpan>
            )}
          </Li>
          <Li>
            <Label>Apellido</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <ErrorSpan>{formik.errors.lastName}</ErrorSpan>
            )}
          </Li>
          <Li>
            <Label>Nombre de usuario</Label>
            <Input
              type="text"
              name="alias"
              id="alias"
              value={formik.values.alias}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.alias && formik.errors.alias && (
              <ErrorSpan>{formik.errors.alias}</ErrorSpan>
            )}
          </Li>
          <Li>
            <Label>DNI</Label>
            <Input disabled value={user.dni} />
          </Li>
        </Div1>

        <Div2>
          <Li>
            <Label>Email</Label>
            <Input disabled value={user.email} />
          </Li>
          <Li>
            <Label>Fecha de nacimiento</Label>
            <Input disabled value={user.birthdate} />
          </Li>
          <Li>
            <Label>Avatar</Label>
            <Input
              type="file"
              name="avatar"
              id="avatar"
              accept="image/*"
              onChange={handleAvatarInputChange}
              onBlur={formik.handleBlur}
            />
          </Li>

          <Button type="submit" >Guardar cambios</Button>
        </Div2>
      </ListDiv>
    </PerfilContainer>
  );
};
  
export default Perfil;

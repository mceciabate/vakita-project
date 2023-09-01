import PanelProfile from '../../assets/PanelProfile/PanelProfile';
import { Div1, Div2, H2, Label, Input, Li, ListDiv, PerfilContainer, TitleH5, Button } from "./styled";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import Swal from 'sweetalert2';
import { ErrorSpan } from '../Register/Register.styled';

const Perfil = () => {
  const [changed, setChanged] = useState(false)
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    dni: "",
    email: "",
    birthdate: "",
  });

  const userId = localStorage.getItem("userId");

  const formik = useFormik({
    initialValues: {
      name: user.name,
      lastName: user.name,
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
    }),
    onSubmit: async (values) => {
      if(changed) {
        try {
          const response = await axios.put(
            "http://107.22.65.36:8080/api/v1/usuarios/" + userId,
            {
              name: values.name,
              lastName: values.lastName,
            }
          );

          if (response.status == 200) {
            Swal.fire({
              title: "Datos actualizados",
              text: "",
              icon: "success",
            });

            setTimeout(() => {
              location.reload();
            }, "2000");
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
      } else {
        Swal.fire({
          title: "No has modificado ningún dato",
          text: "",
          icon: "warning",
        });
      }
    },
  });

  useEffect(() => {

    const {name, lastName} = formik.values

    if(name !== user.name || lastName !== user.lastName) {
      setChanged(true)
    }
    
  }, [formik.values])
  

  useEffect(() => {

  }, [formik.values.lastName, formik.values.name])
  useEffect(() => {
    fetch("http://107.22.65.36:8080/api/v1/usuarios/" + userId)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        formik.setValues({
          name: data.name,
          lastName: data.lastName,
        });
      })
      .catch((error) => console.error(error));
  }, []);

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

          <Button type="submit" >Guardar cambios</Button>
        </Div2>
      </ListDiv>
    </PerfilContainer>
  );
};
  
  export default Perfil;
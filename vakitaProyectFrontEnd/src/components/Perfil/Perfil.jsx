import {
  Div1,
  Div2,
  H2,
  Label,
  Input,
  Li,
  ListDiv,
  PerfilContainer,
  TitleH5,
  Button,
  InputAvatar,
  BtnChangePwd,
} from "./styled";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { ErrorSpan } from "../Register/Register.styled";
import UserProfileImage from "./UserProfileImage";
import "../../styles/withdrawalPage.css";

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
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  const handlePasswordChange = () => {
    Swal.fire({
      title: "Cambiar Contraseña",
      html: `<input type="email" id="email" class="swal2-input" placeholder="Email">`,
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const email = Swal.getPopup().querySelector("#email").value;

        if (!email) {
          Swal.showValidationMessage(
            "Por favor, ingresa un correo electrónico válido"
          );
        }

        return { email };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { email } = result.value;

        axios
          .get(`https://gatewayvakitas.ddns.net:8080/api/v1/usuarios/email/${email}`)
          .then((response) => {
            const users = response.data;
            console.log(users.id);
            console.log(response.status === 200);

            let codeData = "";

            if (response.status === 404) {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Hubo un problema al intentar obtener la lista de usuarios",
              });
            }

            if (response.status === 200) {
              const userId = users.id;

              //Post enviar correo al usuario para que obtenga el código
              axios
                .post(
                  "https://gatewayvakitas.ddns.net:8080/api/v1/usuarios/recover",
                  {
                    email: email,
                  },
                  {
                    headers: {
                      "Content-type": "application/json",
                      Accept: "application/json",
                    },
                  }
                )
                .then((response) => {
                  codeData = response.data.token;
                })
                .catch((error) => {
                  console.error("Error al hacer la solicitud:", error);
                });

              Swal.fire({
                title: "Cambiar Contraseña",
                html: `<p>Como medida de seguridad adicional, introduce el código que hemos enviado a su correo.</p>
                                    <input type="password" id="code" class="swal2-input" placeholder="Código">
                                    <input type="password" id="newPassword" class="swal2-input" placeholder="Nueva contraseña">
                                    <input type="password" id="confirmNewPassword" class="swal2-input" placeholder="Confirmar contraseña">`,
                focusConfirm: false,
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                preConfirm: () => {
                  const newPassword =
                    Swal.getPopup().querySelector("#newPassword").value;
                  const confirmNewPassword = Swal.getPopup().querySelector(
                    "#confirmNewPassword"
                  ).value;
                  const code = Swal.getPopup().querySelector("#code").value;

                  if (
                    !code ||
                    code !== codeData ||
                    !newPassword ||
                    !confirmNewPassword ||
                    newPassword !== confirmNewPassword
                  ) {
                    Swal.showValidationMessage(
                      "Por favor, completa los campos y asegúrate de que las contraseñas coincidan y el código sea válido"
                    );
                  }

                  return { userId, newPassword, confirmNewPassword };
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  const { userId, newPassword, confirmNewPassword } =
                    result.value;

                  axios
                    .patch(
                      `https://gatewayvakitas.ddns.net:8080/api/v1/usuarios/${userId}`,
                      {
                        password: newPassword,
                      },
                      {
                        headers: {
                          "Content-type": "application/json",
                          Accept: "application/json",
                        },
                      }
                    )
                    .then((response) => {
                      Swal.fire({
                        icon: "success",
                        title: "Contraseña Cambiada",
                        text: "¡Tu contraseña ha sido cambiada exitosamente!",
                      });
                    })
                    .catch((error) => {
                      Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Hubo un problema al intentar cambiar la contraseña",
                      });
                    });
                }
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Usuario no encontrado",
                text: "El correo electrónico proporcionado no coincide con ningún usuario registrado en nuestro sistema. Por favor, asegúrate de que has ingresado correctamente tu dirección de correo electrónico y que está registrada en nuestra plataforma.",
                customClass: {
                  validationMessage: "my-custom-validation-message", // Aquí usamos la clase personalizada
                },
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Usuario no encontrados",
              text: "El correo electrónico proporcionado no coincide con ningún usuario registrado en nuestro sistema. Por favor, asegúrate de que has ingresado correctamente tu dirección de correo electrónico y que está registrada en nuestra plataforma.",
              customClass: {
                validationMessage: "my-custom-validation-message", // Aquí usamos la clase personalizada
              },
            });
          });
      }
    });
  };

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
          "https://gatewayvakitas.ddns.net:8080/api/v1/usuarios/" + userId,
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
    fetch("https://gatewayvakitas.ddns.net:8080/api/v1/usuarios/" + userId)
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
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  return (
    <PerfilContainer>
      {loading ? (
        <div className="noDataText">
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>{" "}
        </div>
      ) : (
        <>
          <H2>Mi Perfil</H2>

          <UserProfileImage user={user} />
          <BtnChangePwd onClick={handlePasswordChange}>
            Cambiar contraseña
          </BtnChangePwd>
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
                <InputAvatar
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept="image/*"
                  onChange={handleAvatarInputChange}
                  onBlur={formik.handleBlur}
                />
              </Li>

              <Button type="submit">Guardar cambios</Button>
            </Div2>
          </ListDiv>
        </>
      )}

 
    </PerfilContainer>
  );
};

export default Perfil;
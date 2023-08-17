import * as Yup from "yup";
import {useFormik} from "formik";
import Swal from "sweetalert2";
import logoVaca from "../../assets/logoVacaInicio.png";
import {Input, ContainerInput, FormContainer, BoxText, ContainerGeneral, TituloCrearCuenta, Label, Button, GeneralFormContainer,ImgVaca} from './Register.styled.jsx';
import axios from "axios";

function Register() {

  // const calcAgeGr18 = (birthdate) => {

  //   const currentDate = new Date()

  //     const diferenciaEnAnios = currentDate.getFullYear() - birthdate.getFullYear();

  //     if (
  //       diferenciaEnAnios > 18 ||
  //       (diferenciaEnAnios === 18 && birthdate.getMonth() > currentDate.getMonth()) ||
  //       (diferenciaEnAnios === 18 && birthdate.getMonth() === currentDate.getMonth() && birthdate.getDate() >= currentDate.getDate())
  //     ) {
  //       return ""

  //     }

  //     return "Solo pueden registrarse mayores de edad"
  // }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      birthdate: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nombre es requerido"),
      lastName: Yup.string().required("Apellido es requerido"),
      email: Yup.string().email("No es un correo valido").required("Correo es requerido"),
      // birthdate: Yup.date().max(new Date(), calcAgeGr18).required("Fecha de nacimiento es requerida"),
      birthdate: Yup.string().required("Fecha de nacimiento es requerida"),
      password: Yup.string().min(4, "Debe contener 4 digitos o más").max(50).required("Contraseña es requerida"),
      passwordConfirm:  Yup.string().min(4, "Debe contener 4 digitos o más").max(50).required("Confirmación de contraseña es requerida").oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
        }),
    onSubmit: async (values) => {

      try {
        console.log("");

        const response = await axios.post("http://localhost:8080/api/v1/usuarios", {
          "name": values.name,
          "lastName": values.lastName,
          "dni": "11111111",
          "email": values.email,
          "password": values.password,
          "birthdate": values.birthdate
        })

        console.log(response);

      } catch (e) {
        console.log(e);
        Swal.fire({
          title: 'Algo salió mal :(',
          text: e.code,
          icon:'error'
        })

      }
      
    //   Swal.fire({
    //     title: 'Registro realizado con éxito',
    //     text:'Ahora puedes iniciar sesión',
    //     icon:'success'
    // })
    //     formik.resetForm();
    // formik.resetForm();


    }
});


    return (
      <ContainerGeneral>
        
         
         
         <ImgVaca src={logoVaca} alt="logo" /> 

        <GeneralFormContainer>
          <TituloCrearCuenta>
            <h1>Crea tu cuenta</h1>
          </TituloCrearCuenta>

      
              <FormContainer onSubmit={formik.handleSubmit}>
                <BoxText>
                  <h2>Ingresa tus datos</h2>
                </BoxText>
                <ContainerInput>
                  <Label htmlFor="name">Tu nombre</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </ContainerInput>
                {formik.touched.name && formik.errors.name && <span style={{ color: "red", }}>{formik.errors.name}</span>}

                <ContainerInput>
                  <Label htmlFor="lastName">Tu apellido</Label>
                  <Input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </ContainerInput>
                {formik.touched.name && formik.errors.name && <span style={{ color: "red", }}>{formik.errors.name}</span>}

                <ContainerInput>
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </ContainerInput>

                {formik.touched.email && formik.errors.email && <span style={{ color: "red" }}>{formik.errors.email}</span>}


                <ContainerInput>
                  <Label htmlFor="birthdate">Fecha de nacimiento</Label>
                  <Input
                    type="date"
                    name="birthdate"
                    id="birthdate"
                    value={formik.values.birthdate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
            
                </ContainerInput>

                {formik.touched.birthdate && formik.errors.birthdate && <span style={{ color: "red" }}>{formik.errors.birthdate}</span>}


                <ContainerInput>
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
             
                </ContainerInput>
                
                {formik.touched.password && formik.errors.password && <span style={{ color: "red" }}>{formik.errors.password}</span>}
              
                <ContainerInput>
                  <Label htmlFor="passwordConfirm">Confirmar contraseña</Label>
                  <Input
                    type="password"
                    name="passwordConfirm"
                    id="passwordConfirm"
                    value={formik.values.passwordConfirm}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
           
                </ContainerInput>

                {formik.touched.passwordConfirm && formik.errors.passwordConfirm && <span style={{ color: "red" }}>{formik.errors.passwordConfirm}</span>}


                <Button type="submit">Crear cuenta</Button>
              </FormContainer>

        </GeneralFormContainer>
      </ContainerGeneral>
    );
}

export default Register;

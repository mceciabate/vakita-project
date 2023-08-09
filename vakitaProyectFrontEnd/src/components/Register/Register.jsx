import React from "react";
import * as Yup from "yup";
import {useFormik} from "formik";
import logoVaca from "../../assets/LogoVaca.svg";
import {Input, ContainerInput, FormContainer, BoxText, ContainerGeneral, BoxTitle, Label, Button, FinalParagraph, ImgVaca, GeneralFormContainer, InfoP} from './Register.styled.jsx';



function Register() {

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      birthdate: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nombre es requerido"),
      email: Yup.string().email("No es un correo valido").required("Correo es requerido"),
      birthdate: Yup.string().required("Fecha de nacimiento es requerida"),
      password: Yup.string().min(4, "Debe contener 4 digitos o más").max(50).required("Contraseña es requerida"),
      passwordConfirm:  Yup.string().min(4, "Debe contener 4 digitos o más").max(50).required("Confirmación de contraseña es requerida").oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
        }),
    onSubmit: (values) => {
        formik.resetForm();
        console.log("Probando OnSubmit Register");
    }
});


    return (
      <ContainerGeneral>
        <ImgVaca src={logoVaca} alt="logo" />


        <GeneralFormContainer>
          <BoxTitle>
            <h1>Crea tu cuenta</h1>
          </BoxTitle>

      
              <FormContainer onSubmit={formik.handleSubmit}>
                <BoxText>
                  <InfoP>Ingresa tus datos</InfoP>
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

          <FinalParagraph>
            cow company De colombia y argentina pal mundo
          </FinalParagraph>
        </GeneralFormContainer>
      </ContainerGeneral>
    );
}

export default Register;

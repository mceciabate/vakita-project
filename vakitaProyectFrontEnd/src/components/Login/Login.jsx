import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import logoVaca from "../../assets/LogoVaca.svg";
import { ContainerGeneral, FormContainer, ContainerInput, Input, Label, BoxText, Button, Questions, BoxTitle, FinalParagraph, ImgVaca, GeneralFormContainer } from './Login.styled.jsx';



function Login() {


    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email("No es un correo valido").required("Correo es requerido"),
            password: Yup.string().min(4, "Debe contener 4 digitos o más").max(50).required("Contraseña es requerida")
        }),
        onSubmit: (values) => {
            formik.resetForm();
        }
    });


    return (

        <ContainerGeneral>

            <ImgVaca  src={logoVaca} alt="logo" />

            <GeneralFormContainer>

            <BoxTitle>
                <h1>Bienvenido a su vaca virtual</h1>
            </BoxTitle>


            <FormContainer onSubmit={formik.handleSubmit}>

                <BoxText>
                    <h2>Inicio de Sesion</h2>
                </BoxText>

                <ContainerInput>
                    <Label htmlFor="Correo">Ingresa tu correo</Label>
                    <Input
                        type="text"
                        name="email"
                        id="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && <span style={{ color: "red",   marginLeft: "20px"}}>{formik.errors.email}</span>}

                </ContainerInput>

                <ContainerInput>
                    <Label htmlFor="Contraseña">Ingresa tu contraseña</Label>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password && <span style={{ color: "red",  marginLeft: "20px"}}>{formik.errors.password}</span>}
                </ContainerInput>

                <Button type='submit'>Continuar </Button>

                <Questions>
                    <h5>¿Olvidaste tu email?</h5>
                    <h5>¿Olvidaste tu contraseña?</h5>
                </Questions>

            </FormContainer>

            <FinalParagraph>
                <h5>¿No tienes una cuenta?,     <a href="">Creala aquí</a> </h5>  
            </FinalParagraph>

            <FinalParagraph>
                cow company
                De colombia y argentina pal mundo
            </FinalParagraph>

            </GeneralFormContainer>
        </ContainerGeneral>

    );
}

export default Login;
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Swal from "sweetalert2";
import { useUser } from '../../context/UserProvider';
import { ContainerGeneral, FormContainer, ContainerInput, Input, Label, BoxText, Button, Questions, FinalParagraph, GeneralFormContainer, ButtonRegister } from './Login.styled.jsx';
import { useNavigate } from 'react-router-dom';



function Login() {
    const navigate = useNavigate();
    const { loginData, setLoginData, setLogged } = useUser();




    const formik = useFormik({

        initialValues: {
            email: loginData.email,
            password: loginData.password
        },
        validationSchema: Yup.object({
            email: Yup.string().email("No es un email valido").required("Email es requerido"),
            password: Yup.string().min(4, "Debe contener 4 digitos o más").max(50).required("Contraseña es requerida")
        }),
        onSubmit: async (values) => {
            //código para probar con el back      
            //         try {
            //             const response = await axios.post('URL_DEL_BACKEND/login', {
            //                 email: values.email,
            //                 password: values.password
            //             });

            //             // Manejar la respuesta del backend 
            //             if (response.data.success) {
            //                 Swal.fire({
            //                     title: 'Inicio exitoso',
            //                     text: 'Inició tu sesión',
            //                     icon: 'success'
            //                 });

            //                 formik.resetForm();

            //                 setLoginData({
            //                     email: values.email,
            //                     password: values.password
            //                 });
            //             } else {
            //                 // Mostrar mensaje de error
            //                 Swal.fire({
            //                     title: 'Error',
            //                     text: 'Inicio de sesión fallido',
            //                     icon: 'error'
            //                 });
            //             }
            //         } catch (error) {
            //             // Manejar errores de la solicitud
            //             Swal.fire({
            //                 title: 'Error',
            //                 text: 'Hubo un problema al intentar iniciar sesión',
            //                 icon: 'error'
            //             });
            //         }
            //     }
            // });


            // Simulación de datos hardcodeados para inicio de sesión
            const hardcodedEmail = 'test@gmail.com';
            const hardcodedPassword = '1234';

            if (values.email === hardcodedEmail && values.password === hardcodedPassword) {
                Swal.fire({
                    title: 'Inicio exitoso',
                    text: 'Inició tu sesión',
                    icon: 'success'
                });

                formik.resetForm();

                setLoginData({
                    email: values.email,
                    password: values.password
                });

                setLogged(true); // Establece el estado de inicio de sesión como verdadero
                navigate('/dashboard'); // Redirige al dashboard
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Credenciales incorrectas',
                    icon: 'error'
                });
            }
        }
    });

    return (

        <ContainerGeneral>

            <GeneralFormContainer>


                <FormContainer onSubmit={formik.handleSubmit}>

                    <BoxText>
                        <h4 className='titulo-card'>VAKITA</h4>
                        <h2 className='titulo-card'>Inicio de sesión</h2>
                    </BoxText>

                    <ContainerInput>
                        <Label htmlFor="Email" className='input-email'>Ingresa tu Email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && <span style={{ color: "red", marginLeft: "87px" }}>{formik.errors.email}</span>}

                    </ContainerInput>

                    <ContainerInput>
                        <Label htmlFor="Contraseña" className='input-contraseña'>Ingresa tu contraseña</Label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password && <span style={{ color: "red", marginLeft: "87px" }}>{formik.errors.password}</span>}
                    </ContainerInput>

                    <Button className="continuar" type='submit'>Continuar </Button>

                    <Questions>
                        <h5 className='preguntas'>¿Olvidaste tu email?</h5>
                        <h5 className='preguntas'>¿Olvidaste tu contraseña?</h5>
                    </Questions>

                </FormContainer>

                <FinalParagraph>
                    <h5>¿No tienes una cuenta?, <ButtonRegister >Creala aquí</ButtonRegister>  </h5>

                </FinalParagraph>




            </GeneralFormContainer>
        </ContainerGeneral>

    );
}

export default Login;
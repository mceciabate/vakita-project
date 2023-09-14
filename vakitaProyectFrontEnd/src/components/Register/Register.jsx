import * as Yup from "yup";
<<<<<<< HEAD
=======
import { useState } from "react";
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc
import { useFormik } from "formik";
import Swal from "sweetalert2";
import axios from "axios";
import {
  ContainerGeneral,
  GeneralFormContainer,
  FormContainer,
  BoxTexts,
  ContainerInputs,
  Label,
  Input,
<<<<<<< HEAD
  Button, ErrorSpan
=======
  Button, ErrorSpan, CheckSection
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc
} from "./Register.styled.jsx";


function Registerr() {

  const maxYear = () => {

    let maxYear = new Date().getFullYear() - 18;
    const currentDate = new Date();

    return new Date(currentDate.getDay() + "/" + currentDate.getMonth() + "/" + maxYear)
  }

<<<<<<< HEAD
=======
  const [checked, setChecked] = useState(false)
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
<<<<<<< HEAD
=======
      alias: "",
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc
      dni: "",
      email: "",
      birthdate: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nombre es requerido"),
      lastName: Yup.string().required("Apellido es requerido"),
<<<<<<< HEAD
=======
      alias: Yup.string().required("Nombre de usuario es requerido"),
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc
     dni: Yup.string().required("Dni es requerido"),
      email: Yup.string().email("No es un correo valido").required("Correo es requerido"),
      birthdate: Yup.date().max(maxYear(), "Se debe ser mayor de 18 años").required("Fecha de nacimiento es requerida"),
      password: Yup.string().min(4, "Debe contener 4 digitos o más").max(50).required("Contraseña es requerida"),
      passwordConfirm:  Yup.string().min(4, "Debe contener 4 digitos o más").max(50).required("Confirmación de contraseña es requerida").oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
        }),
        onSubmit: async (values) => {    
          try {
    
            const response = await axios.post("http://107.22.65.36:8080/api/v1/usuarios/register", {
              "name": values.name,
              "lastName": values.lastName,
<<<<<<< HEAD
=======
              "alias": values.alias,
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc
              "dni": values.dni,
              "email": values.email,
              "password": values.password,
              "birthdate": values.birthdate
            })
    
<<<<<<< HEAD
            console.log(response);
    
=======
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc
            if (response.status == 201) {
              Swal.fire({
                title: 'Registro realizado con éxito',
                text:'Revisa tu correo electrónico para finalizar el registro',
                icon:'success'
            })
    
            formik.resetForm();
    
          } 
    
<<<<<<< HEAD
            console.log(response);
    
=======
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc
          } catch (e) {
            
            console.log(e);
    
            Swal.fire({
              title: 'Algo salió mal :(',
              text: e.code,
              icon:'error'
            })
    
          }
    
        formik.resetForm();
    
        }
    });
    
    

  return (
    <ContainerGeneral>
      <GeneralFormContainer>
        <FormContainer onSubmit={formik.handleSubmit}>
          <BoxTexts>
            <h4 className="titulo-card">VAKITA</h4>
            <h2 className="titulo-card">Crear cuenta</h2>
          </BoxTexts>

          <ContainerInputs>
            {/* Primer contenedor */}
            <div className="contedor-form1">
              <Label htmlFor="name">Tu nombre</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
<<<<<<< HEAD
              {formik.touched.name && formik.errors.name && (<ErrorSpan>{formik.errors.name}</ErrorSpan>)}
=======
              {formik.touched.name && formik.errors.name && (
                <ErrorSpan>{formik.errors.name}</ErrorSpan>
              )}
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc

              <Label htmlFor="lastName">Tu apellido</Label>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
<<<<<<< HEAD
              {formik.touched.lastName && formik.errors.lastName && (<ErrorSpan>{formik.errors.lastName}</ErrorSpan>)}

=======
              {formik.touched.lastName && formik.errors.lastName && (
                <ErrorSpan>{formik.errors.lastName}</ErrorSpan>
              )}

             <Label htmlFor="lastName">Nombre de usuario</Label>
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
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc

              <Label htmlFor="dni">Tu dni</Label>
              <Input
                type="text"
                name="dni"
                id="dni"
                value={formik.values.dni}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
<<<<<<< HEAD
              {formik.touched.dni && formik.errors.dni && (<ErrorSpan>{formik.errors.dni}</ErrorSpan>)}



              <Label htmlFor="email">Correo electrónico</Label>
=======
              {formik.touched.dni && formik.errors.dni && (
                <ErrorSpan>{formik.errors.dni}</ErrorSpan>
              )}

             

              {/* Añade más campos aquí según tus necesidades */}
            </div>

            {/* Segundo contenedor */}
            <div className="contedor-form2">
            <Label htmlFor="email">Correo electrónico</Label>
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc
              <Input
                type="email"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
<<<<<<< HEAD
              {formik.touched.email && formik.errors.email && (<ErrorSpan>{formik.errors.email}</ErrorSpan>)}

              {/* Añade más campos aquí según tus necesidades */}
            </div>

            {/* Segundo contenedor */}
            <div className="contedor-form2">
=======
              {formik.touched.email && formik.errors.email && (
                <ErrorSpan>{formik.errors.email}</ErrorSpan>
              )}

>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc
              <Label htmlFor="birthdate">Fecha de nacimiento</Label>
              <Input
                type="date"
                name="birthdate"
                id="birthdate"
                value={formik.values.birthdate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
<<<<<<< HEAD
             {formik.touched.birthdate && formik.errors.birthdate && (<ErrorSpan>{formik.errors.birthdate}</ErrorSpan>)}
=======
              {formik.touched.birthdate && formik.errors.birthdate && (
                <ErrorSpan>{formik.errors.birthdate}</ErrorSpan>
              )}
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc
              <Label htmlFor="password">Contraseña</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

<<<<<<< HEAD
             {formik.touched.password && formik.errors.password && (<ErrorSpan>{formik.errors.password}</ErrorSpan>)}
=======
              {formik.touched.password && formik.errors.password && (
                <ErrorSpan>{formik.errors.password}</ErrorSpan>
              )}
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc

              <Label htmlFor="passwordConfirm">Confirmar contraseña</Label>
              <Input
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                value={formik.values.passwordConfirm}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
<<<<<<< HEAD
              {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (<ErrorSpan>{formik.errors.passwordConfirm}</ErrorSpan>)}

              <Button className="continuar" type='submit'>Continuar </Button>

              {/* Añade más campos aquí según tus necesidades */}
            </div>
          </ContainerInputs>


=======
              {formik.touched.passwordConfirm &&
                formik.errors.passwordConfirm && (
                  <ErrorSpan>{formik.errors.passwordConfirm}</ErrorSpan>
                )}

                <CheckSection>
                  <input type="checkbox"
                  onClick={() => setChecked(!checked)}
                  onChange={() => setChecked(!checked)}
                  />
                  <Label>Revisa tus datos antes de continuar porque luego no podrán ser modificados.</Label>
                </CheckSection>


              <Button className="continuar" type="submit" disabled={!checked}>
                Continuar{" "}
              </Button>

            </div>
          </ContainerInputs>
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc
        </FormContainer>
      </GeneralFormContainer>
    </ContainerGeneral>
  );
}

<<<<<<< HEAD
export default Registerr;
=======
export default Registerr;
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc

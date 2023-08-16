import styled from "styled-components";



export const ContainerGeneral = styled.div`
width: 100%;
height: 725PX;
display: flex;
flex-direction: row wrap;
align-items: center;

/* En esta seccion cambiara en mobile*/
@media (max-width: 1300px){
width: 100%;
height: 725px;
display: flex;
flex-direction: column;

}
`;


export const ImgVaca = styled.img`
display:flex; 
width: 60%;
height: 100%;
margin-top:24px;
padding:70px;
background-color:black;

@media (max-width: 1450px){
  width: 55%;
}

/* En esta seccion no se mostrara en mobile*/
@media (max-width: 1300px){
    border: none;
    outline: none;
    display: none;
    opacity: 0;
}
`;

export const GeneralFormContainer = styled.div`
   width: 100%;
   height: 725PX;
   display: flex;
   flex-direction: column;
   align-items: center;
`;


export const TituloCrearCuenta = styled.div`
color:black;
font-size:14px;
margin-top:40px;

/* En esta seccion cambiara en desktop*/
@media (min-width: 1300px){

  margin-top: 35px;
  text-align: center;
  padding:10px;
  background-color:black;
  color:white;
  width:98%;
}
`;

export const FormContainer = styled.form`
  border-radius: 15px;
  height: 780px;
  width: 320px;
  margin-top: 60px;
  font-family: 'Inria Sans';
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFF;
  border: 1px solid #A39D9D;

  /* En esta seccion cambiara en desktop*/
@media (min-width: 1300px){

  margin-top: 60px;
}
  `;


export const BoxText = styled.div`
display:flex;
width: 106%;
height: 74px; 
background-color: black; 
color: white;
font-family: 'Inria Sans';
font-size: 12px;
align-items: center;
justify-content: center;
margin-top: -35px;
margin-bottom: 5px;
`;


export const ContainerInput = styled.div`
width: 100%;
height: 100px;
display: flex;
flex-direction: column;
justify-content: space-around;
`;

export const Label = styled.label`
width: 100%;
margin-top: 10px;  
margin-left: 20px;
`;

export const Input = styled.input`
  height: 35px !important;
  width: 85% !important;
  border-radius: 10px !important;
  background-color: #eee !important;
  outline: none !important;
  border: 0 !important;
  margin-left: 20px !important;
  padding: 2px !important;
`;

export const Button = styled.button`
background-color: #DEC6C6;
height: 40px;
border-radius: 10px;
border-style: none;
width: 120px;
font-size: 14px;
margin-top: 15px;
margin-bottom: 25px;
cursor: pointer;
  `;

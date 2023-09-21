import styled from 'styled-components';


export const ContainerGeneral = styled.div`
   width: 100%;
   height: 100vh !important;
   display: flex;
   flex-direction: row wrap;
   align-items: center;
   background: linear-gradient(0deg, rgba(200,185,224,1) 11%, rgba(217,181,195,1) 89%);
`;


export const GeneralFormContainer = styled.div`
   width: 100%;
   height: 100vh !important;
   display: flex;
   flex-direction: column;
   align-items: center;
`;




export const FormContainer = styled.form`
height: 550px;
width: 37%;
margin-top: 90px;
font-family: 'Inria Sans';
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background: linear-gradient(0deg, #EEE9FF 6%, #FCE8E9 91%);
border-radius:50px;

 .password-t{

     background-color: transparent;
     border: none;
     position:relative;
     right: 240%;
     top: 160%;
     height: 40px;
}

/* En esta seccion cambiara en mobile*/
@media (max-width: 1400px){

  width: 45%;
}

/* En esta seccion cambiara en mobile*/
@media (max-width: 900px){

  width: 58%;
}

/* En esta seccion cambiara en mobile*/
@media (max-width: 600px){
  width: 80%;
}
`;


export const BoxText = styled.div`
width: 106%;
height: 54px; 
color: black;
font-family: 'Inria Sans';
flex-direction: column;
margin-bottom: 70px;
margin-top:-10px;

.titulo-card {
  display: flex; 
  justify-content: start;
  margin-left:8%;
  
}
`;



export const ContainerInput = styled.div`
    width: 100%;
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

  

    .input-email {
      
      margin-top:30px;
      margin-bottom:10px;
    }

    .input-contraseña {
      margin-top:30px;
      margin-bottom:10px;
      
    }
`;


export const Label = styled.label`
    width: 100%;
    margin-left: 12.4%;

`;

export const Input = styled.input`
height: 35px !important;
width: 75% !important;
border-radius: 10px !important;
background-color: white !important; 
outline: none !important;
border: none !important;
margin:0 auto  !important;
padding: 2px !important;
`;




export const Button = styled.button`
  background-color: transparent;
  height: 40px;
  border-radius: 10px;
  border-style: solid;
  border-top-color: #BB75CB;
  border-right-color: #D18EBA;
  border-bottom-color: #E68C8C;
  border-left-color: #D18EBA;
  width: 120px;
  font-size: 14px;
  margin-top: 35px;
  cursor: pointer;
  font-weight: medium;

  /* Estilo en hover */
  &:hover {
    color:white;
    background-color: #AD8FF3;
  }
`;



export const Questions = styled.div`

text-align: right;
font-family: Inria Sans;
width: 90%;
height: 50px;
margin-top: 27px;
display: flex;
flex-direction: column;
justify-content: end;

.preguntas {
  justify-content: end;
  margin-top:-10px;
  margin-bottom: 15px;
  
 

}

`;



export const ButtonRegister = styled.button`
  text-decoration: none;
  color: #423163; 
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 0;
  font-family: 'Inria Sans';
 font-weight:bold;

 /* Estilo en hover */
 &:hover {
   color:#E68C8C;
 }

`;

export const FinalParagraph = styled.div`
color: #000;
text-align: center;
font-family: Inria Sans;
width: 100%;
height: 52px;
margin-top: 37px;
margin-bottom: 10px;

`;




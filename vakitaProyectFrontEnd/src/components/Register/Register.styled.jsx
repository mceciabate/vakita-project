import styled from "styled-components";



export const ContainerGeneral = styled.div`
width: 100%;
height: 100vh !important;
display: flex;
flex-direction: row wrap;
align-items: center;
background: linear-gradient(0deg, rgba(200,185,224,1) 11%, rgba(217,181,195,1) 89%);

@media (max-width: 1180px){
  height: 170vh !important;
}
`;

export const GeneralFormContainer = styled.div`
   width: 100%;
   height: 725PX;
   display: flex;
   flex-direction: column;
   align-items: center;



  @media (max-width: 1180px){
    height: 1200px;
  }
`;

export const FormContainer = styled.form`
height: 700px;
width: 50%;
margin-top: -8px;
font-family: 'Inria Sans';
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background: linear-gradient(0deg, #EEE9FF 6%, #FCE8E9 91%);
border-radius:50px;

@media (max-width: 768px){
  width: 80%;
  margin-top:-655px;
  height: 1100px;
}

@media (max-width: 1680px){
  margin-top: 29px;
}
  


@media (max-width: 1181px){
  margin-top: -15px;
  height: 1100px;
}
  `;
  



export const BoxTexts = styled.div`
width: 106%;
height: 54px; 
color: black;
font-family: 'Inria Sans';
flex-direction: column;
margin-bottom: 70px;
margin-top:-350px;

.titulo-card {
  display: flex; 
  justify-content: start;
  margin-left:8%;
  padding-top: 1rem;
  
}

@media (max-width: 1180px){

  margin-top:-745px;
}
@media (max-width: 750px){

  margin-top:-755px;
  
}

`;






export const ContainerInputs = styled.div`
width: 100%;
height: 180px;
display: flex;
flex-direction: row;
justify-content: space-between;
margin-left:13%;

.contedor-form1 {
  width: 50%;

}
.contedor-form2 {
  width: 50% ;
  justify-content: center;
  }


  @media (max-width: 1180px){

    flex-direction: column;
    margin-left:30%;

    .contedor-form1 {
      width: 100% ;
    }

    .contedor-form2 {
      width: 100%!important; ;
    }

  }

`;


export const Label = styled.label`
width: 100%;
margin-top: 10px;  
/* text-align:right; */
margin-top: 10px !important;
`;
export const Input = styled.input`
  height: 35px;
  width: 70% !important;
  border-radius: 10px !important;
  background-color: white !important;
  outline: none ;
  border:none;
  padding: 2px ;
  margin-top: 8px !important;

`;

/* Estilos para los mensajes de error */
export const ErrorSpan = styled.span`
display:flex;
width: 70%;
  color: red;
  font-size: 14px;
  margin-left: 1px;
`;



export const CheckSection = styled.div`
  display: flex;
  width: 70%;
  align-items: flex-start;
  margin-top: 0.8rem;

  label {
    margin: 0 !important;
    color: #423163;
    font-weight: 600;
  }

  input {
    margin: 3.5px;
    width: 20px;
    height: 20px;
  }
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
  margin-left: 15%;
  margin-right: 15%;
  cursor: pointer;
  font-weight: medium;
  

  /* Estilo en hover */
  &:hover {
    color:white;
    background-color: #AD8FF3;
  }


  /* Estilo en hover */
  &:disabled {
    cursor: initial;
    background-color: transparent;
    color: gray;
    border: 1px solid gray;
  }

  @media (max-width: 1778px){

    margin-left: 19%;
    margin-right: 5%;
  }
  @media (max-width: 1181px){
  }

`;
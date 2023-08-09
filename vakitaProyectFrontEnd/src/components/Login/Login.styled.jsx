import styled from 'styled-components'; 
import { devices } from '../Register/Constants.jsx';

const dullgray = '#E4E4E4';  
const pink = '#DEC6C6';
const black ="#000000";
const white ="#ffffff";
const borderColor = "#A39D9D"





export const ContainerGeneral = styled.div`
   width: 97.5%;
   height: 725PX;
   display: flex;
   flex-direction: column;
   align-items: center;

   @media ${devices.laptop} {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
   }
`;

export const ImgVaca = styled.img`
display:none; 

@media ${devices.laptop} {
  display: block;
  background-color: black;
  width: 70%;
  height: 100%; 
}
`

export const BoxTitle = styled.div`
background-color: #ffffff; 
color: black;
width: 101%;
height: 60px;
font-family: 'Inria Sans';
font-size: 13px;
align-items: center;
display:flex; 
justify-content: center;

@media ${devices.laptop} {
  background-color: ${black};
  color: white; 
  margin-bottom: 30px;
}

` 

export const BoxText = styled.div`
background-color: ${black}; 
color: ${white};
width: 100%;
height: 60px;
font-family: 'Inria Sans';
font-size: 13px;
align-items: center;
display:flex; 
justify-content: center;
border-radius: 5px;
margin-top: -35px;
margin-bottom: 5px;

@media ${devices.laptop} {
  background-color: #000000;
  color: white; 
  margin-bottom: 30px;
  border-radius: 5px;
}

` 
export const GeneralFormContainer = styled.div`

display: flex;
flex-direction: column;
align-items: center;


@media ${devices.laptop} {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
}
`

export const FormContainer = styled.form`
  border-radius: 15px;
  height: 400px;
  width: 300px;
  margin-top: 20px;
  border: 1px solid ${dullgray};
  font-family: 'Inria Sans';
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid ${borderColor};
  `;

  export const ContainerInput = styled.div`
    width: 100%;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;



`;


export const Label = styled.label`
    margin-top: 10px;  
    margin-left: 25px;

`

export const Input = styled.input`
  background-color: red;
  height: 35px;
  width: 85%;
  border-radius: 10px;
  background-color: #eee;
  outline: none;
  border: 0;
  margin-left: 20px;
`;

export const Button = styled.button`
  background-color: ${pink};
  height: 40px;
  border-radius: 10px;
  border-style: none;
  width: 100px;
  font-size: 14px;
  margin-top: 15px;
  cursor: pointer;
  `

  export const Questions = styled.p`
color: ${black};
text-align: right;
font-family: Inria Sans;
width: 245px;
height: 52px;
margin-top: 17px;
display: flex;
flex-direction: column;
justify-content: space-around;
`

export const FinalParagraph = styled.p`
color: #000;
text-align: center;
font-family: Inria Sans;
width: 245px;
height: 52px;
margin-top: 17px;
`
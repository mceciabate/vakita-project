import { styled } from "styled-components";

export const PerfilContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 2rem 0;
    height: 100vh;
    gap: 3rem;
`;

export const H2 = styled.h2`
    margin-bottom: 1rem;
    width: 90%;
    font-size: 1.5em;
    text-align: left;
    margin-top: 1rem;
    font-weight: bolder;
   
`;

export const Hr = styled.hr`
    border-color: gray;
    width: 80%;
`;

export const ListDiv = styled.form`
    background: linear-gradient(180deg, #FCE8E9 0%, #EEE9FF 100%);
    padding: 1.5rem;
    margin: 2rem;
    border-radius: 20px;
    width: 80%;
    max-width: 800px;
    margin-top: -2rem;
    box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;

    @media (min-width: 900px){
       grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, auto);
    } 

   
`;

export const TitleH5 = styled.h5`
    grid-column: 1 / 3;
    grid-row: 1 / 2;
    font-size: 1.2rem;
    margin: 0.7rem 0.7rem 1.5rem 0.7rem;

    @media (min-width: 900px){
        grid-column: 1 / 2;
    }
`

export const Div1 = styled.div`
    width: 100%;
    grid-column: 1 / 2;
    grid-row: 2 / 3;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 900px){
        grid-column: 1 / 2;
        grid-row: 2 / 3;
    }
`

export const Div2 = styled.div`
    grid-column: 1 / 2;
    grid-row: 3 / 4;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

  

    @media (min-width: 900px){
        grid-column: 2 / 3;
        grid-row: 2 / 3;
    }
`

export const Li = styled.li`
    list-style: none;
    margin: 10px 0;
    padding: 0.5rem;
    border-radius: 10px;
    width: 80%;
`

export const Label = styled.p`
    font-size: 0.9rem;
    margin-bottom: 0.3rem;
    font-weight: 600;
`


export const Input = styled.input`
    border: 2px solid white;
    border-radius: 8px;
    min-width: 100%;
    max-width: 300px;
    height: 35px;
    text-indent: 10px;
    background-color:white;

   
    &:disabled {
        color: black;
        background-color :#CAC1D1;
        border-color: #CAC1D1;
    }

    &:focus {
        border-color: #423163; /* Cambiar el color del borde a verde cuando se selecciona */
        outline: none; /* Quitar el resplandor predeterminado en algunos navegadores */
    }
`;

export const InputAvatar = styled.input`
    border: 2px solid white;
    border-radius: 8px;
    min-width: 100%;
    max-width: 300px;
    height: 35px;
    text-indent: 10px;
    background-color:white;
    padding-top: 0.9rem;

    &:disabled {
        color: black;
        background-color :#CAC1D1;
        border-color: #CAC1D1;
    }

    &:focus {
        border-color: #423163; /* Cambiar el color del borde a verde cuando se selecciona */
        outline: none; /* Quitar el resplandor predeterminado en algunos navegadores */
    }
`;

export const Button = styled.button`
    justify-self: flex-end;
    margin: 18px 0;
    padding: 0.5rem;
    background: none;
    border-radius: 10px;
    font-weight: 600;
    border-style: 2px solid;
    border-top-color: #BB75CB;
    border-right-color: #D18EBA;
    border-bottom-color: #E68C8C;
    border-left-color: #D18EBA;
    cursor: pointer;
    height: 40px;
   
    &:hover {
        background-color: #AD8FF3;
        color: white;
    }
`

export const BtnChangePwd = styled.button`
    margin-left: 1.5rem;
    align-self: flex-start;
    padding: 0.5rem 1rem;
    border-style: 2px solid;
    border-top-color: #BB75CB;
    border-right-color: #D18EBA;
    border-bottom-color: #E68C8C;
    border-left-color: #D18EBA;
    font-weight: 600;
    cursor: pointer;
    border-radius: 10px;
    background: none;
    height: 40px;

    &:hover {
        background-color: #AD8FF3;
        color: white;
    }

    @media (min-width: 769px) {
        margin: 0 ;
        margin-left: 10%;
       position: relative;
       bottom: 1.8rem;

    }
`;
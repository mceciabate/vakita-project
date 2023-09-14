import { styled } from "styled-components";

export const Image = styled.img`
    /* height: 40%; */
<<<<<<< HEAD
   

    @media (max-width: 766px) {
        width: 6rem;
=======
   width: 100px;
   

    @media (max-width: 766px) {
        width: 4rem;
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc
    }
    
`;

<<<<<<< HEAD
export const DivContainer = styled.div`
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #F5F5F5;
    width: 10rem;
    height: 8rem;
    gap: 1rem;
    padding: 0.8rem;
    cursor: pointer;
    border-radius: 10px;
=======

export const DivBox = styled.div`
width:100%;
`


export const DivContainer = styled.div`
    
    display: flex;
    flex-direction: row wrap;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom:25px;

    
    background-color: ${props => props.color};
    width: 98%;
    height: 100px;
    gap: 1rem;
    padding: 0.8rem;
    cursor: pointer;
    border-radius: 50px;
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc
    font-family: 'Inria Sans', sans-serif;
    font-size: 0.8rem;
    text-align: center;

    &:hover {
        background-color: #FFBEBE;
    }
    a:hover {
        color: #4A4A4A;
    }

<<<<<<< HEAD
    @media (max-width: 769px) {
        display: ${props => !props.displayMobile ? "flex" : "none"};
        width: 15rem;
=======
    .Titulo-DivContainer {
        width: 40%;
        font-size:20px;
        color: #584381;
        text-align: left;
        margin-bottom: 15px;
        
    }
    .Texto-DivContainer {
        width: 100%;
        font-size:14px;
        text-align: left;
    }

    

    @media (max-width: 769px) {
        display: ${props => !props.displayMobile ? "flex" : "none"};
        width: 90%;
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc
        height: 8rem;
        font-size: 1.1rem;
        max-width: none;
        margin-top:15px;
    }
<<<<<<< HEAD
=======
    .Titulo-DivContainer {
        width: 70%;
        font-size:20px;
        color: #584381;
        text-align: left;
        margin-bottom: 15px;
        
    }
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc
    
`;


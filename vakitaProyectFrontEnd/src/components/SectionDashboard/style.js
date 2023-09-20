import { styled } from "styled-components";

export const Image = styled.img`
    /* height: 40%; */
   width: 100px;
   

    @media (max-width: 766px) {
        width: 4rem;
    }
    
`;


export const DivBox = styled.div`
    width:100%;
    display: flex;
    justify-content: center;

    @media only screen and (min-width: 767px) {
        padding: 0 2rem;
        display: block;
    }
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
    font-family: 'Inria Sans', sans-serif;
    font-size: 0.8rem;
    text-align: center;

    &:hover {
        background-color: #FFBEBE;
    }
    a:hover {
        color: #4A4A4A;
    }

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
        height: 8rem;
        font-size: 1.1rem;
        max-width: none;
        margin-top:15px;
    }
    .Titulo-DivContainer {
        width: 70%;
        font-size:20px;
        color: #584381;
        text-align: left;
        margin-bottom: 15px;
        
    }
    
`;


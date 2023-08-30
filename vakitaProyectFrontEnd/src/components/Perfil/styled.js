import { styled } from "styled-components";

export const PerfilContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 2rem 0;
    /* background: -webkit-linear-gradient(#FFFFFF, #CCC3C3); */
    height: 100vh;
    gap: 3rem;
`;

export const H2 = styled.h2`
    margin-bottom: 1rem;
    width: 90%;
    font-size: 1.2rem;
    text-align: left;
`;

export const Hr = styled.hr`
    border-color: gray;
    width: 80%;
`;

export const ListDiv = styled.ul`
    background-color: #FFBEBE;
    padding: 1rem;
    margin: 2rem;
    border-radius: 10px;
    width: 80%;
    max-width: 550px;
    box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);

    @media (min-width: 768px){
    }
`;

export const Li = styled.li`
    display: flex;
    justify-content: space-between;
    background-color: white;
    margin: 10px 0;
    padding: 0.5rem;
    border-radius: 10px;
`
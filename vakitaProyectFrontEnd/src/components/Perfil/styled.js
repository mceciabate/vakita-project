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
    font-size: 1.2rem;
    text-align: left;
`;

export const Hr = styled.hr`
    border-color: gray;
    width: 80%;
`;

export const ListDiv = styled.ul`
    background: linear-gradient(180deg, #FCE8E9 0%, #EEE9FF 100%);
    padding: 1rem;
    margin: 2rem;
    border-radius: 10px;
    width: 80%;
    max-width: 550px;
    box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;

    @media (min-width: 768px){
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, auto);
    }
`;

export const TitleH5 = styled.h5`
    grid-column: 1 / 3;
    grid-row: 1 / 2;

    @media (min-width: 768px){
        grid-column: 1 / 2;
    }
`

export const Div1 = styled.div`
    grid-column: 1 / 2;
    grid-row: 2 / 3;

    @media (min-width: 768px){
        grid-column: 1 / 2;
        grid-row: 2 / 3;
    }
`

export const Div2 = styled.div`
    grid-column: 1 / 2;
    grid-row: 3 / 4;

    @media (min-width: 768px){
        grid-column: 2 / 3;
        grid-row: 2 / 3;
    }
`


export const Li = styled.li`
    list-style: none;
    margin: 10px 0;
    padding: 0.5rem;
    border-radius: 10px;
`
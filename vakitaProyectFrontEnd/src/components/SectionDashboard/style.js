import { styled } from "styled-components";

export const Image = styled.img`
    height: 40%;
`;

export const DivContainer = styled.div`
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #F5F5F5;
    width: 20%;
    max-width: 5.5rem;
    height: 5.5rem;
    gap: 1rem;
    padding: 0.8rem;
    cursor: pointer;
    border-radius: 10px;
    font-family: 'Inria Sans', sans-serif;
    font-size: 0.8rem;
    text-align: center;

    &:hover {
        background-color: #FFBEBE;
    }

    @media (min-width: 769px) {
        display: ${props => !props.displayMobile ? "flex" : "none"};
        width: 10rem;
        height: 8rem;
        font-size: 1.1rem;
    }
`;


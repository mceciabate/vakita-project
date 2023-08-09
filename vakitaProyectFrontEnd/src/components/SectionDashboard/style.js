import { styled } from "styled-components";

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
    font-family: 'Inria Sans', sans-serif;

    &:hover {
        background-color: #FFBEBE;
    }

    @media (min-width: 769px) {
        display: ${props => !props.displayMobile ? "flex" : "none"};
    }
`;
import { styled } from "styled-components";

export const DashboardDiv = styled.div`
    display: flex;
    background-color: white;
    width: 95%;
    max-width: 1300px;
    border-radius: 10px;
    align-self: center;
    max-height: 220px;
    box-shadow: 0px 9px 11px -4px rgba(0,0,0,0.1);
`;

export const Image = styled.img`
    object-fit: cover;
    width: 55%;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
`;


export const SpanText = styled.div`
  margin: auto;
  text-align: center;
`;


export const H2 = styled.h2`
    font-size: 0.8rem;
    width: 90%;

    @media (min-width: 768px){
        font-size: 1.1rem;
    }
`;
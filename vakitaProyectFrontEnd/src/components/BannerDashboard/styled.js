import { styled } from "styled-components";

export const DashboardDiv = styled.div`
    display: flex;
    background-color: white;
    width: 100%;
    height: 80vh;
    max-width: 1300px;
    border-radius: 10px;
    align-self: center;
    max-height: 220px;
    border-radius: 10px ;
    box-shadow: 10px 5px 5px grey;
    @media (max-width: 768px){
      font-size: 1.1rem;
      
  
    }
    
`;

export const Image = styled.img`
    object-fit: cover;
    width: 26vw;
    border-radius: 10px ;
    @media (min-width: 1083px){
      font-size: 1.1rem;
      width: 20vw;
    }
    @media (max-width: 800px){
      font-size: 1.1rem;
      width: 39vw;
    }
`;


export const SpanText = styled.div`
  margin: auto;
  text-align: center;
  @media (max-width: 768px){
    font-size: 1.1rem;

  }
`;


export const H2 = styled.h2`
    font-size: 1.1rem;
    width: 90%;

    @media (max-width: 768px){
        font-size: 0.8rem;
    }
`;
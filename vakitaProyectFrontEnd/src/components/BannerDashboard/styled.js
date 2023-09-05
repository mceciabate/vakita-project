import { styled } from "styled-components";

export const DashboardDiv = styled.div`
    display: flex;
    background: linear-gradient(0deg, rgba(200,185,224,1) 11%, rgba(217,181,195,1) 71%);
    width: 100%;
    height: 20vh;
    max-width: 1300px;
    border-radius: 10px;
    align-self: center;
    margin-top:10px;
    border-radius: 10px ;
    box-shadow: 2px 1px 8px grey;

    @media (max-width: 930px){
      
      width: 110%;
  
    }

    @media (max-width: 815px){
      
      width: 120%;
  
    }

    @media (max-width: 768px){
      
      width: 100%;
  
    }

   
    
`;

export const Image = styled.img`
    
    position: relative;
    z-index: 100;
    width: 100%;
    margin-top:-70px;
    margin-left:2%;
    @media (min-width: 1083px){
      
      width: 20vw;
    }
    @media (max-width: 1336px){
      width: 40%;
    }

    @media (max-width: 930px){
      
      width: 50%;
  
    }

    @media (max-width: 815px){
      
      width: 55%;
      height: 120%;
      margin-top:-40px;
  
    }
`;


export const SpanText = styled.div`
  margin: auto;
  text-align: start;
  display:flex;
  width:50%;
  text-align: center ;
  flex-flow: column wrap;

  @media (max-width: 930px){
      
    margin-right:20px;

  }
`;


export const H1 = styled.h2`
    font-size: 2.1rem;
    width: 100%;
    margin-bottom:25px;
    color: #584381;

    @media (max-width: 930px){
      
      font-size: 1.7rem;
  
    }

    @media (max-width: 587px){

      font-size: 1.3rem;
    }

    @media (max-width: 541px){

      font-size: 1rem;
    }
    @media (max-width: 410px){

      font-size: 0.9rem;
    }

   
`;

export const H3 = styled.h2`

width: 100%;
font-weight: 500;
font-size: 1.1rem;
font-family: 'Inria Sans', sans-serif;


@media (max-width: 930px){
      
  font-size: 0.8rem;

}

@media (max-width: 541px){

  font-size: 0.8rem;
}


`;



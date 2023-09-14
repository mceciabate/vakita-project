import { styled } from "styled-components";

export const DashboardDiv = styled.div`
    display: flex;
<<<<<<< HEAD
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
=======
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

   
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc
    
`;

export const Image = styled.img`
<<<<<<< HEAD
    object-fit: cover;
    width: 26vw;
    border-radius: 10px ;
    @media (min-width: 1083px){
      font-size: 1.1rem;
      width: 20vw;
    }
    @media (max-width: 800px){
      font-size: 1.1rem;
      width: 25vw;
=======
    
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
  
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc
    }
`;


export const SpanText = styled.div`
  margin: auto;
<<<<<<< HEAD
  text-align: center;
  display:flex;
  flex-flow: column wrap;
  @media (max-width: 768px){
    font-size: 1.1rem;

=======
  text-align: start;
  display:flex;
  width:50%;
  text-align: center ;
  flex-flow: column wrap;

  @media (max-width: 930px){
      
    margin-right:20px;
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc

  }
`;


<<<<<<< HEAD
export const H2 = styled.h2`
    font-size: 1.1rem;
    width: 100%;
    margin-bottom:25px;

    @media (max-width: 768px){
        font-size: 0.8rem;
    }
`;

export const Button = styled.h2`
padding: 10px;
width: 40%;
margin: 0 auto;
font-size: 1.1rem;
border-radius: .7rem;
cursor: pointer;
border: none;
font-weight: 500;
cursor: pointer;
background-color: #FFBEBE;
font-family: 'Inria Sans', sans-serif;
@media (max-width: 970px){
  width: 60%;
}
@media (max-width: 768px){
  width: 60%;
}
=======
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


>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc
`;



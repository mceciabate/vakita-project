import { styled } from "styled-components";


export const DashboardDiv = styled.div`
    background-color: #FFFFFF;
    width:  100%;
    height: auto;
`;

export const Sections = styled.section`
  
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 50px;
    
`;




export const MenuDiv=styled.div`
    display: none;

    @media (min-width: 769px){
      display: flex;
    }
`;



export const SectionLanding= styled.section`
  display: flex;
  width: 100%;
  height:auto;
`;

export const DivContSections1 = styled.div`
  padding: 0 2rem;
  height: 300px;
  margin: 1rem auto 1rem auto;
  display: flex;
  flex-direction: column;
  justify-content:space-evenly;

  p {
    font-size: 1.3rem;
    font-weight: bold;

    
  }

  @media (max-width: 769px){
    p {
      margin-top: 30px; 
    }
  }

  @media (min-width: 769px){
      display: flex;
      padding: 0 4rem;
      margin: 2rem auto 5rem auto;
    }

`;

export const DivContSections2 = styled.div`
  padding: 0 2rem;

  margin: 1rem auto 1rem auto;
  display: flex;
  flex-direction: column;
  justify-content:space-evenly;
  

  p {
    font-size: 1.3rem;
    font-weight: bold;
    

    
  }

  @media (max-width: 769px){
    p {
      margin-top: 30px; 
    }
  }

  @media (min-width: 769px){
      display: flex;
      padding: 0 4rem;
      margin: 2rem auto 5rem auto;
    }

`;

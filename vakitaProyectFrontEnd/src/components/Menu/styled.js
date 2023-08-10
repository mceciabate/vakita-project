import { styled } from "styled-components";

export const MenuLateral = styled.section`
    width: 18rem;
    padding: 2.5rem 1rem;
    height: calc(100vh - 112px);
    font-family: 'Inria Sans', sans-serif;
    /* display: flex; */
    /* flex-direction: column;
    justify-content: space-between; */
    

        
    
    


    /* Aqui se establece que el boton salir no se mostrara en desktop*/
    @media (min-width: 768px){

        padding: 2.5rem 1rem;
        .botonSalir {
            display: flex;
        flex-direction: row;
        background: transparent;
        border: none;
        outline: none;
        display: none;
        opacity: 0;
        }
    }`;

export const HeaderMenuLateral = styled.div`

    display: flex;
    flex-direction: row;
    background: transparent;
    border: none;
    background-color:black;
    color:white;
    padding: 20px;
    img.avatar {
        width:30%;
        height:30%;
        margin-right:20px;
    }
    
    /* En esta seccion no se mostrara en desktop*/
    @media (min-width: 768px){
        border: none;
        outline: none;
        display: none;
        opacity: 0;
    }


`;

export const BloqueOptions = styled.div`
    display: flex;
    flex-direction: column;

    a {
        padding: 0.8rem;
        cursor: pointer;
        
    }

    hr {
        margin-top:30px;
        margin-bottom:60px;
    }
`;

export const MenuDiv=styled.div`

    display: none;

    @media (min-width: 769px){
          
      display: flex;
      
     
    
    }
`;

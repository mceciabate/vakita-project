import { styled } from "styled-components";

export const MenuLateral = styled.section`
display: none;
    width: 18rem;
    padding: 2.5rem 1rem;
    height: calc(100vh - 112px);
    font-family: 'Inria Sans', sans-serif;
    /* display: flex; */
    /* flex-direction: column;
    justify-content: space-between; */
    


    /* Aqui se establece que el boton salir no se mostrara en desktop*/
    @media (min-width: 768px){
display:flex;
width: 18rem;
    padding: 2.5rem 1rem;
    height: calc(100vh - 112px);
    font-family: 'Inria Sans', sans-serif;
       
        .botonSalir {
            display: block;
        flex-direction: row;
        background: transparent;
        border: none;
        outline: none;
        display: none;
        opacity: 1;
        
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
    
        width:40%;
        height:100%;
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
    width: 100%;
    height: 100%;
    margin-top: 10px;
   
    
    /* margin-top: 50px; */

    a {
        padding: 0.8rem;
        cursor: pointer;
        
    }

    hr {
        margin-top:30px;
        margin-bottom:50px;
    }

    @media (max-width: 768px){
        a {
            margin-left:10px;
            
        }
        hr {
            margin-left:20px;
            width:37%
        }
    }
`;

export const MenuDiv=styled.div`

    display: flex;
    justify-content: center;
    
    

    @media (min-width: 769px){
        
   justify-content:normal;
    
    }

    
`;

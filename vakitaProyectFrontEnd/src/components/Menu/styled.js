import { styled } from "styled-components";


export const MenuLateral = styled.section`
display: none;
    
    padding: 2.5rem 1rem;
    background-color: #664E94;
    font-family: 'Inria Sans', sans-serif;
    
    .botonSalir{
        width: 100%;
        background-color:black;
        color: white;
        margin: 0px;
        padding:0.8rem;
        display: flex;
        justify-content: flex-end;
        position: fixed;
        bottom: 0;
        width: 375px;
    }

    .textExit{
        padding-right: 4px;
    }


    /* Aqui se establece que el boton salir no se mostrara en desktop*/
    @media (min-width: 768px){
display:flex;
width: 18rem;
    padding: 2.5rem 1rem;
    
    font-family: 'Inria Sans', sans-serif;
       
        .botonSalir {  
        
    outline: none;
    font-size: 16px;

    letter-spacing: 0.05rem;
    width: auto; 
    background-color:#609AA6; 
    margin: 0; 
    position: static; 
    bottom: auto; 
    margin-top: 6rem;
    display: flex;
    justify-content: center;
    width: 5rem;
    padding: 0.3rem;
    align-self:center;
    border-radius: 8px;
        
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

    a {
        padding: 0.8rem;
        cursor: pointer;
        color: #fff;
        font-family: arial;
        
    }

    hr {
        margin-top:30px;
        margin-bottom:50px;
        border: 2px solid rgba(0, 0, 0, 0.17);
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
    justify-content: space-between;
    width: 100%;
    

    @media (min-width: 769px){
        
   justify-content:space-between;
    
    }

    
`;

export const MenuSinLoguear=styled.div`
    
    button{
        background-color:white !important;
        border: none;
    }
    a{
        color:black ;
    }
`;

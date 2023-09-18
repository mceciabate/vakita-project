import { styled } from "styled-components";


export const MenuLateral = styled.section`
display: none;
height:auto;
   
    padding: 2.5rem 1rem;
    background-color: #664E94;
    font-family: 'Inria Sans', sans-serif;
    
    .botonSalir{
        width: 100%;
        background-color:#664E94;
        color: white;
        margin: 0px;
        padding:0.8rem;
        display: flex;
        justify-content: flex-end;
        position: fixed;
        bottom: 0;
        border: none;
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
border: none;
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
    background: linear-gradient(0deg, #EEE9FF 50%, #FCE8E9 51%);background: linear-gradient(0deg, rgba(200,185,224,1) 11%, rgba(217,181,195,1) 89%);
    color:white;
    padding: 20px;
    height: 100px;
    border-radius:20px;
    margin:20px;
    
      

    img.avatar {
    
        width:30%;
        height:auto;
        margin-right:20px;
    }

  .texto-saludoUsuario {
   color: #664E94;
   font-size:20px;
   font-weight:bold;
   width:100%;

  align-self: center;
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
    a:hover {
        color: #609AA6/* Cambiar el color a rojo cuando el cursor esté sobre el enlace */
    }
    a:active {
        color:#4D7B84;
    
    }
    hr {
        width: 70%;
        margin-top:30px;
        margin-bottom:50px;
        border: 2px solid rgba(0, 0, 0, 0.17);
    }

    @media (max-width: 768px){
        
        a {
            margin-left:30px;
            font-weight:medium;
        }
    
        hr {
            margin-left:30px;
            width:65%
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
 width: 100%;
 display: flex;
 justify-content: center;

.boxBtn{
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    gap: 1rem;
  
   
    
}
    
    button{
      
    border: none;
    padding: 10px;
    border-radius: .7rem;
    cursor: pointer;
    border: none;
    font-weight: 500;
    background-color: #FCE8E9;
    font-family: 'Inria Sans', sans-serif;
    font-size: 16.5px;
    width: 12rem;
       
    }
    a{
        color:black ;
    }
`;

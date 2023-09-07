import { keyframes, styled } from "styled-components";

const slideInAnimation = keyframes`
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }

  
`

export const ModalContainer = styled.article`
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    background-color: rgba(0, 0, 0, 0.60);
    display: ${props => props.open ? "flex" : "none"};
    justify-content: flex-start;
    align-items: flex-start;
    //
    
    
    

    .modal-container {
        background-color: white;
        overflow-y: auto;
        animation: ${slideInAnimation} 0.3s ease;
        height: 100vh;
        width: 100%;
        max-width: 375px;
        display: flex;
        flex-direction: column;
        
    }
    
    .modal-container section {
        width: 100%;
        height: 95vh;
        padding:0px;
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        background-image: url("https://i.pinimg.com/750x/37/7a/ea/377aeabbccd59dd33e16a4e7521244b7.jpg");
        background-position: center ;
        background-size:cover;
        


        a { color: black;
        }
        
    }

    .btnExit {
        width: 100%;
        background-color:#674F95;
        color: white;
        margin: 0px;
        padding:0.8rem;
        display: flex;
        justify-content: flex-end;
        

    }
    

    

    .header-menu-closer {
        display: flex;
        padding: 10px;
        background-color: rgb(250,189, 0);
        color: white;
        justify-content: space-between;
        align-items: center;
        font-size: 1.1rem;
        font-weight: 700;
    }


   
      
`;

export const BtnClose = styled.button`
    align-self: flex-end;
    background: none;
    border: none;
    margin: 0.8rem;
    
`;
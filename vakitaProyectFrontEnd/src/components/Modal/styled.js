import { keyframes, styled } from "styled-components";

const slideInAnimation = keyframes`
    from {
        transform: translateX(100%);
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
    display: ${props => props.isOpen ? "flex" : "none"};
    justify-content: flex-end;
    align-items: flex-end;

    .modal-container {
        background-color: white;
        overflow-y: auto;
        animation: ${slideInAnimation} 0.3s ease;
        height: 100vh;
        width: 90%;
        max-width: 375px;
        margin-left: 1.2rem;
        display: flex;
        flex-direction: column;
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
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
    background-color: gray;
    display: ${props => props.isOpen ? "flex" : "none"};
    justify-content: flex-end;
    align-items: flex-start;

    .modal-container {
        background-color: white;
        position: relative;
        overflow-y: auto;
        /* animation: ${slideInAnimation} 0.3s ease; */
        height: 100vh;
        width: 90%;
        max-width: 375px;
        margin-left: 1.2rem;
    }
`;
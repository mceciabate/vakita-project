import { styled } from "styled-components";

export const MenuLateral = styled.section`
    width: 18rem;
    padding: 2.5rem 1rem;
    height: calc(100vh - 112px);
    font-family: 'Inria Sans', sans-serif;
    /* display: flex; */
    /* flex-direction: column;
    justify-content: space-between; */
`;

export const BloqueOptions = styled.div`
    display: flex;
    flex-direction: column;

    a {
        padding: 0.8rem;
        cursor: pointer;
    }
`;
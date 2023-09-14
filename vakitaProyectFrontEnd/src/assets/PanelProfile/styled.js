import { styled } from "styled-components";

export const ProfileContainer = styled.div`
    width: 80%;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: repeat(2, auto);
    column-gap: 1.5rem;
    row-gap: 0.2rem;
`;

export const ImgProfile = styled.img`
    width: 5.5rem;
    height: 5.5rem;
    border-radius: 50%;
    grid-column: 1 / 2;
    grid-row: 1 / 3;
`;

export const UserName = styled.h2`
    color: #584381;
    align-self: flex-end;
`;

export const Subtitle = styled.h5`
   color:#554e5d;
    font-weight: 300;
    font-size: 1rem;
`;
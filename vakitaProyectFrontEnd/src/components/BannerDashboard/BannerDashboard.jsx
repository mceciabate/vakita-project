import { DashboardDiv, H1, Image, SpanText, H3 } from "./styled";
import axios from 'axios';
import { useEffect, useState } from 'react';

const BannerDashboard = () => {
    const userId = localStorage.getItem("userId");

    const [alias, setAlias] = useState("");

    useEffect(() => {
        const getAlias = async () => {
            try {
                const response = await axios.get(`http://107.22.65.36:8080/api/v1/usuarios/${userId}`);
                const aliasUser = response.data.alias; 
                const aliasUserVakita = JSON.stringify(aliasUser)
                  localStorage.setItem('alias', aliasUserVakita);
                
                setAlias(aliasUser);
            } catch (error) {
                console.error("Error getting alias", error);
            }
        };

        getAlias();
    }, [userId]);

    return (
        <DashboardDiv>
            <Image src= "https://grupo3-vakita.s3.amazonaws.com/assets/bienvenida.png"/>
            <SpanText>
                <H1>{`Hola, ${alias} `}</H1>
                <H3>¿Estás listo/a para crear tu vaka virtual?</H3>
            </SpanText>
        </DashboardDiv>
    );
}

export default BannerDashboard;

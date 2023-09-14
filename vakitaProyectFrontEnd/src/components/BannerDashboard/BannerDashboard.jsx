<<<<<<< HEAD
import imgBanner from "../../assets/vacamoneda.jpg"
import { DashboardDiv, H2, Image, SpanText,Button } from "./styled"

const BannerDashboard = () => {

    return (
        <DashboardDiv>
            <Image src={imgBanner}/>
            <SpanText>
                <H2>NO TE PIERDAS LA OPORTUNIDAD DE AYUDAR CON LAS VAQUITAS SOLIDARIAS </H2>
                <Button>Quiero saber mas</Button>
            </SpanText>

        </DashboardDiv>
    )

}

export default BannerDashboard
=======
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
                <H3>¿Estás listo/a para crear tu vaca virtual?</H3>
            </SpanText>
        </DashboardDiv>
    );
}

export default BannerDashboard;
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc

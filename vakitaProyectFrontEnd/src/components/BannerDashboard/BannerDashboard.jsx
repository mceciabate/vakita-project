import imgBanner from "../../assets/bienvenida.png"
import { DashboardDiv, H1, Image, SpanText,H3 } from "./styled"

const BannerDashboard = () => {

    return (
        <DashboardDiv>
            <Image src={imgBanner}/>
            <SpanText>
                <H1>Hola, Cecilia Abate </H1>
                <H3>¿Estás listo/a para crear tu vaca virtual?</H3>
            </SpanText>

        </DashboardDiv>
    )

}

export default BannerDashboard
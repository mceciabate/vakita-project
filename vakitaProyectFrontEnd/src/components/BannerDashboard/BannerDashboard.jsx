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
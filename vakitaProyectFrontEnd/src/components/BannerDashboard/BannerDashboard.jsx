import imgBanner from "../../assets/WhatsApp Image 2023-07-30 at 9.59.18 AM.jpeg"
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
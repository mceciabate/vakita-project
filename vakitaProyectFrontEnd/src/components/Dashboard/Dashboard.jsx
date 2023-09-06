import { DashboardDiv, Sections, MenuDiv, SectionLanding, DivContSections1,DivContSections2 } from "./styled"
import sections_dashboards from "../../jsons/sections_dashboards"
import SectionDashboard from "../SectionDashboard/SectionDashboard";
import BannerDashboard from "../BannerDashboard/BannerDashboard"
const Dashboard = () => {
    return (
        <SectionLanding>
            <DashboardDiv>
            <DivContSections1>
                <BannerDashboard />
            </DivContSections1>
            <DivContSections2>
                <p>¿Qué vamos a hacer hoy?</p>
                <Sections>
                {
                    sections_dashboards.map(art => {
                        return (
                            <SectionDashboard texto={art.texto} color={art.color} link={art.link} key={art.title} img={art.img} title={art.title} displayMobile={art.onlyMobile}/>
                        )
                    })
                }
            </Sections>
            </DivContSections2>

            </DashboardDiv>
        </SectionLanding>
    )
}

export default Dashboard
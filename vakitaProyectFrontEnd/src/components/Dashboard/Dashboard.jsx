import { DashboardDiv, Sections, MenuDiv, SectionLanding, DivContSections } from "./styled"
import sections_dashboards from "../../jsons/sections_dashboards"
import SectionDashboard from "../SectionDashboard/SectionDashboard";
import Menu from "../Menu/Menu";
import BannerDashboard from "../BannerDashboard/BannerDashboard"
const Dashboard = () => {
    return (
        <SectionLanding>
            <MenuDiv>
                <Menu/>
            </MenuDiv>
            <DashboardDiv>
                <DivContSections>
                    <BannerDashboard />
                </DivContSections>
                <DivContSections>
                    <p>Inicio</p>
                    <Sections>
                    {
                        sections_dashboards.map(art => {
                            return (
                                <SectionDashboard img={art.img} title={art.title} displayMobile={art.onlyMobile}/>
                            )
                            
                        })
                    }
                    </Sections>
                </DivContSections>

            </DashboardDiv>
        </SectionLanding>
    )
}

export default Dashboard
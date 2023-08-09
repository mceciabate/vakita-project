import { DashboardDiv, Sections, MenuDiv, SectionLanding } from "./styled"
import sections_dashboards from "../../jsons/sections_dashboards"
import SectionDashboard from "../SectionDashboard/SectionDashboard";
import Menu from "../Menu/Menu";


const Dashboard = () => {

    console.log(sections_dashboards);

    return (
        <SectionLanding>
             <MenuDiv>
            <Menu/>
            </MenuDiv>
        <DashboardDiv>
            
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

        </DashboardDiv>
        </SectionLanding>
    )
}

export default Dashboard
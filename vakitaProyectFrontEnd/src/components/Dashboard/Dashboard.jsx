import { DashboardDiv, Sections } from "./styled"
import sections_dashboards from "../../jsons/sections_dashboards"
import SectionDashboard from "../SectionDashboard/SectionDashboard";
const Dashboard = () => {

    console.log(sections_dashboards);

    return (
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
    )
}

export default Dashboard
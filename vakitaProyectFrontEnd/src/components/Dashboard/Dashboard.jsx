import { DashboardDiv } from "./styled"
import sections_dashboards from "../../jsons/sections_dashboards"
import SectionDashboard from "../SectionDashboard/SectionDashboard";
const Dashboard = () => {

    console.log(sections_dashboards);

    return (
        <DashboardDiv>
            
            <p>Inicio</p>

            
            {
                sections_dashboards.map(art => {
                    // console.log(art);
                    return (
                        <SectionDashboard img={art.img} title={art.title} displayMobile={art.onlyMobile}/>
                    )
                    
                })
            }
        </DashboardDiv>
    )
}

export default Dashboard
import { DashboardDiv, Sections,SectionLanding } from "./styled"
import sections_dashboards from "../../jsons/sections_dashboards"
import SectionDashboard from "../SectionDashboard/SectionDashboard";





const Dashboard = () => {

    console.log(sections_dashboards);

    return (
        <SectionLanding>
            
         
        <DashboardDiv>
            
            <p>Inicio</p>

            <Sections>
            {
                sections_dashboards.map(art => {
                    // console.log(art);
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
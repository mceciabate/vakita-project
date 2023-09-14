<<<<<<< HEAD
import { DashboardDiv, Sections, MenuDiv, SectionLanding, DivContSections } from "./styled"
=======
import { DashboardDiv, Sections, MenuDiv, SectionLanding, DivContSections1,DivContSections2 } from "./styled"
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc
import sections_dashboards from "../../jsons/sections_dashboards"
import SectionDashboard from "../SectionDashboard/SectionDashboard";
import BannerDashboard from "../BannerDashboard/BannerDashboard"
const Dashboard = () => {
    return (
        <SectionLanding>
            <DashboardDiv>
<<<<<<< HEAD
            <DivContSections>
                <BannerDashboard />
            </DivContSections>
            <DivContSections>
                <p>Inicio</p>
=======
            <DivContSections1>
                <BannerDashboard />
            </DivContSections1>
            <DivContSections2>
                <p>¿Qué vamos a hacer hoy?</p>
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc
                <Sections>
                {
                    sections_dashboards.map(art => {
                        return (
<<<<<<< HEAD
                            <SectionDashboard  link={art.link} key={art.title} img={art.img} title={art.title} displayMobile={art.onlyMobile}/>
=======
                            <SectionDashboard texto={art.texto} color={art.color} link={art.link} key={art.title} img={art.img} title={art.title} displayMobile={art.onlyMobile}/>
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc
                        )
                    })
                }
            </Sections>
<<<<<<< HEAD
            </DivContSections>
=======
            </DivContSections2>
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc

            </DashboardDiv>
        </SectionLanding>
    )
}

export default Dashboard
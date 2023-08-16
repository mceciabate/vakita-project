import { DivContainer } from "./style"
import { Link } from 'react-router-dom'

const SectionDashboard = ({img, title, displayMobile, link}) => {
    return (
        <DivContainer displayMobile={displayMobile}>
          <Link to={link}> <img src={img} /></Link> 
            <h3>{title}</h3>
        </DivContainer>
    )
}

export default SectionDashboard
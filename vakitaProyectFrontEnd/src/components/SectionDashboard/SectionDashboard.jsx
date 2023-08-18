import { DivContainer,Image } from "./style"
import { Link } from 'react-router-dom'

const SectionDashboard = ({img, title, displayMobile, link}) => {
    return (
        <DivContainer displayMobile={displayMobile}>
          <Link to={link}> <Image src={img} />
            <h3>{title}</h3></Link>
        </DivContainer>
    )
}

export default SectionDashboard
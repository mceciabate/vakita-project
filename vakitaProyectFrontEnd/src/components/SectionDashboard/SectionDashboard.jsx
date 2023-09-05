import { DivContainer,Image } from "./style"
import { Link } from 'react-router-dom'

const SectionDashboard = ({img, title, displaymobile, link,color,texto}) => {
    return (
        <DivContainer displayMobile={displaymobile} color={color}>
           <Image src={img} />
           <Link to={link}>  
            <h3 className="Titulo-DivContainer">{title}</h3>
            <p className="Texto-DivContainer">{texto}</p>
            </Link>

        </DivContainer>
    )
}

export default SectionDashboard
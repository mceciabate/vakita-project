<<<<<<< HEAD
import { DivContainer,Image } from "./style"
import { Link } from 'react-router-dom'

const SectionDashboard = ({img, title, displaymobile, link}) => {
    return (
        <DivContainer displayMobile={displaymobile}>
          <Link to={link}> <Image src={img} />
            <h3>{title}</h3></Link>
        </DivContainer>
=======
import { DivContainer,Image,DivBox  } from "./style"
import { Link } from 'react-router-dom'

const SectionDashboard = ({img, title, displaymobile, link,color,texto}) => {
    return (

        <DivBox>
           <Link className="link" to={link}>  
        <DivContainer displayMobile={displaymobile} color={color}>
         
           <Image src={img} />
         <div>
            <h3 className="Titulo-DivContainer">{title}</h3>
            <p className="Texto-DivContainer">{texto}</p>
            </div>

        </DivContainer>
            </Link>
            </DivBox>
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc
    )
}

export default SectionDashboard
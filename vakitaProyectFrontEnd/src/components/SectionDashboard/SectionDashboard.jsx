import { DivContainer, Image, DivBox } from "./style";
import { Link } from "react-router-dom";

const SectionDashboard = ({
  img,
  title,
  displaymobile,
  link,
  color,
  texto,
}) => {
  return (
    <DivBox displayMobile={displaymobile}>
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
  );
};

export default SectionDashboard;
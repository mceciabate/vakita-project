import { DivContainer, Image } from "./style"

const SectionDashboard = ({img, title, displayMobile}) => {
    return (
        <DivContainer displayMobile={displayMobile}>
            <Image src={img} />
            <h3>{title}</h3>
        </DivContainer>
    )
}

export default SectionDashboard
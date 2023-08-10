import { DivContainer } from "./style"

const SectionDashboard = ({img, title, displayMobile}) => {
    console.log("ASDASD");
    return (
        <DivContainer displayMobile={displayMobile}>
            <img src={img} />
            <h3>{title}</h3>
        </DivContainer>
    )
}

export default SectionDashboard
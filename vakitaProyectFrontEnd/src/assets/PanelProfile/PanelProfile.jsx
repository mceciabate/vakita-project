import { ProfileContainer } from "./styled"

// eslint-disable-next-line react/prop-types
const PanelProfile = ({img, nameUser, subtitle=""}) => {

    return (
        <ProfileContainer>
            <img src={img} />
            <h2>{nameUser}</h2>
            {subtitle !== "" ? <h5>{subtitle}</h5> : <></>}
        </ProfileContainer>
    )
}

export default PanelProfile
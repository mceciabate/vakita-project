import { ImgProfile, ProfileContainer, Subtitle, UserName } from "./styled"

// eslint-disable-next-line react/prop-types
const PanelProfile = ({img, nameUser, subtitle=""}) => {

    return (
        <ProfileContainer>
            <ImgProfile src={img} />
            <UserName>{nameUser}</UserName>
            {subtitle !== "" ? <Subtitle>{subtitle}</Subtitle> : <></>}
        </ProfileContainer>
    )
}

export default PanelProfile
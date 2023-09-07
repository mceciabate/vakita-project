import React from "react";
import PanelProfile from '../../assets/PanelProfile/PanelProfile';

const UserProfileImage = ({ user }) => {
  return (
    <PanelProfile
      img={
        user.avatar != null && user.avatar !== ""
          ? "data:image/jpeg;base64," + user.avatar
          : "https://i.pinimg.com/1200x/b1/27/ec/b127ec5f10f9c07ecb04996116d1306e.jpg"
      }
      nameUser={user.name + " " + user.lastName}
      subtitle={user.alias}
    />
  );
};

export default UserProfileImage;
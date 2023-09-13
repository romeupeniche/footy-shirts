import { Container } from "@mui/material";
import ChangeProfile from "./ChangeProfile";
import { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import ProfileBag from "./ProfileBag";
import { useSelector } from "react-redux";

function Profile() {
  const currentBag = useSelector((state) => state.bag);
  const [isChangingProfile, setIsChangingProfile] = useState(false);
  const toggleChangingProfileHandler = () => {
    setIsChangingProfile((prev) => !prev);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {isChangingProfile ? (
        <ChangeProfile
          toggleChangingProfileHandler={toggleChangingProfileHandler}
        />
      ) : (
        <>
          <ProfileInfo
            toggleChangingProfileHandler={toggleChangingProfileHandler}
          />
          {currentBag.items.length > 0 && <ProfileBag />}
        </>
      )}
    </Container>
  );
}

export default Profile;

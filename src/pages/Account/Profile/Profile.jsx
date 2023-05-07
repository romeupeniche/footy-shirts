import { Container } from "@mui/material";
import ChangeProfile from "./ChangeProfile";
import { useState } from "react";
import ProfileInfo from "./ProfileInfo";

function Profile() {
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
          {/* Cart... */}
        </>
      )}
    </Container>
  );
}

export default Profile;

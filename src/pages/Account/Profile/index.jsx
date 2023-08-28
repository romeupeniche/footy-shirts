import { Container } from "@mui/material";
import ChangeProfile from "./ChangeProfile";
import { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import ProfileCart from "./ProfileCart";
import { useSelector } from "react-redux";

function Profile() {
  const currentCart = useSelector((state) => state.cart);
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
          {currentCart.items.length > 0 && <ProfileCart />}
        </>
      )}
    </Container>
  );
}

export default Profile;

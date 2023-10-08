import { Box, Button, Container, Typography } from "@mui/material";
import ProfileBag from "./ProfileBag";
import { useSelector } from "react-redux";
import { signOut } from "@firebase/auth";
import { auth } from "../../../firebase-config";
import ProfileSuggestedItem from "./ProfileSuggestedItem";

function Profile() {
  const currentBag = useSelector((state) => state.bag);
  const currentUser = useSelector((state) => state.account.user);

  const logoutHandler = async () => {
    await signOut(auth);
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h2" fontWeight={500}>
        My Account
      </Typography>
      <Typography sx={{ ml: 1, fontWeight: 500 }}>
        Email: {currentUser.email}
      </Typography>
      {currentBag.items.length > 0 ? <ProfileBag /> : <ProfileSuggestedItem />}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="error"
          sx={{ mt: 10 }}
          onClick={logoutHandler}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
}

export default Profile;

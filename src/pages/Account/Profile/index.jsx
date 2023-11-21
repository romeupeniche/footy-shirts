import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import ProfileBag from "./ProfileBag";
import { useSelector } from "react-redux";
import { signOut } from "@firebase/auth";
import { auth, db } from "../../../firebase-config";
import ProfileSuggestedItem from "./ProfileSuggestedItem";
import { useDatabaseSnapshot } from "@react-query-firebase/database";
import { useEffect, useState } from "react";
import { ref } from "firebase/database";

function Profile() {
  const currentUser = useSelector((state) => state.account).user;
  const userBagRef = ref(db, "carts/" + currentUser.uid);
  const [currentBag, setCurrentBag] = useState({ items: [] });
  const { data, isLoading } = useDatabaseSnapshot(
    ["bag", currentUser],
    userBagRef
  );

  useEffect(() => {
    if (!isLoading && currentUser.uid) {
      setCurrentBag(data.val());
    }
  }, [data, currentUser, isLoading]);

  if (isLoading) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
      {currentBag?.items?.length > 0 ? (
        <ProfileBag currentBag={currentBag} />
      ) : (
        <ProfileSuggestedItem />
      )}
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

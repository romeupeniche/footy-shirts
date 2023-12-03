import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import { signOut } from "@firebase/auth";
import { auth } from "../../../firebase-config";
import ThemeButton from "./ThemeButton";

function ProfileInfo({ toggleChangingProfileHandler }) {
  const currentUser = useSelector((state) => state.account).user;

  const logoutHandler = async () => {
    await signOut(auth);
  };

  return (
    <>
      <IconButton
        sx={{ alignSelf: "flex-end" }}
        onClick={toggleChangingProfileHandler}
      >
        <EditIcon />
      </IconButton>
      <Avatar sx={{ width: 70, height: 70 }} src={currentUser.photoURL} />
      <ThemeButton />
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 4,
          py: 2,
          mt: 2,
          bgcolor: "primary.darkest",
          borderRadius: 5,
        }}
      >
        <Typography variant="h5" sx={{ alignSelf: "flex-start", mb: 1 }}>
          Name:
        </Typography>
        <Typography variant="h6">
          {currentUser.displayName ?? (
            <Box component="span" style={{ color: "primary.lightest" }}>
              No name is set
            </Box>
          )}
        </Typography>
        <Typography variant="h5" sx={{ alignSelf: "flex-start", mb: 1, mt: 3 }}>
          Email:
        </Typography>
        <Typography variant="h6">{currentUser.email}</Typography>
      </Paper>
      <Button sx={{ mt: 2 }} onClick={logoutHandler}>
        Logout
      </Button>
    </>
  );
}

export default ProfileInfo;

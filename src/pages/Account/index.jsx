import { Box } from "@mui/material";
import Form from "./Form";
import { useSelector } from "react-redux";
import Profile from "./Profile/Profile";

function Account() {
  const currentUser = useSelector((state) => state.account).user;

  // onAuthStateChanged(auth, () => {
  //   setCurrentUserChanged(true);
  // });

  // const logar = () => {
  //   console.log(currentUser.user.email);
  // };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      height="70vh"
      noValidate
      autoComplete="off"
    >
      {currentUser.email ? <Profile /> : <Form />}
    </Box>
  );
}

export default Account;

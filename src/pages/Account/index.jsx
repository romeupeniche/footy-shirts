import { Box } from "@mui/material";
import Form from "./Form";
import { useSelector } from "react-redux";
import Profile from "./Profile";

function Account() {
  const currentUser = useSelector((state) => state.account).user;

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      noValidate
      autoComplete="off"
    >
      {currentUser.email ? <Profile /> : <Form />}
    </Box>
  );
}

export default Account;

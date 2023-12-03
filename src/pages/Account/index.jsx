import { Box } from "@mui/material";
import Form from "./Form";
import { useSelector } from "react-redux";
import Profile from "./Profile";
import { useEffect, useState } from "react";

function Account() {
  const currentUser = useSelector((state) => state.account).user;
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (currentUser.email) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [currentUser]);

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
      {isLogged ? <Profile /> : <Form />}
    </Box>
  );
}

export default Account;

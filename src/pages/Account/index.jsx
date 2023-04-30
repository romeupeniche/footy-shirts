import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { auth } from "../../firebase-config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "@firebase/auth";

function Account() {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [checkPass, setCheckPass] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [isWrongPass, setIsWrongPass] = useState(false);

  onAuthStateChanged(auth, (user) => {
    setCurrentUser(user);
  });

  const toggleSignIn = () => {
    setIsSigningUp(!isSigningUp);
  };

  const registerHandler = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        currentEmail,
        currentPassword
      );
      console.log({ ...user });
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        logInHandler();
      }
    }
  };

  const logInHandler = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        currentEmail,
        currentPassword
      );
      console.log({ ...user });
    } catch (err) {
      console.log(err.code);
      if (err.code === "auth/wrong-password") {
        if (isSigningUp) {
          setIsSigningUp(false);
        }
        setIsWrongPass(true);
      }
    }
  };

  // const logoutHandler = async () => {
  //   await signOut(auth)
  // };

  const isAbleToRegister =
    currentPassword.length >= 6 && currentPassword == checkPass;
  const isAbleToLogIn = currentPassword.length >= 6;

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
      <p>{currentUser?.email}</p>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontSize: {
            xs: "1.6rem",
            sm: "2rem",
          },
          maxWidth: {
            xs: 300,
            sm: 700,
          },
        }}
      >
        {isSigningUp
          ? "Become one of us!"
          : "You are not logged in yet. Log in now!"}
      </Typography>
      <TextField
        id="logInEmail"
        label="E-Mail"
        variant="standard"
        type="email"
        value={currentEmail}
        onChange={(e) => setCurrentEmail(e.target.value)}
        sx={{
          color: `${isWrongPass && "red"}`,
        }}
      />
      <TextField
        id="logInPassword"
        label="Password"
        variant="standard"
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      {isSigningUp && (
        <TextField
          id="registerCheckPass"
          label="Re-Enter Password"
          variant="standard"
          type="password"
          value={checkPass}
          onChange={(e) => setCheckPass(e.target.value)}
        />
      )}
      <Button
        disabled={isSigningUp ? !isAbleToRegister : !isAbleToLogIn}
        onClick={isSigningUp ? registerHandler : logInHandler}
      >
        {isSigningUp ? "Register" : "Login"}
      </Button>
      <Button sx={{ fontSize: ".7rem" }} onClick={toggleSignIn}>
        {isSigningUp ? "I do have an account" : "I do not have an account"}
      </Button>
    </Box>
  );
}

export default Account;

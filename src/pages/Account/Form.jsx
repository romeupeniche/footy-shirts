import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { auth } from "../../firebase-config";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";

function Form() {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [checkPass, setCheckPass] = useState("");
  const [isWrongPass, setIsWrongPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSignIn = () => {
    setIsSigningUp(!isSigningUp);
  };

  const registerHandler = async () => {
    if (isAbleToRegister) {
      setIsLoading(true);
      try {
        await createUserWithEmailAndPassword(
          auth,
          currentEmail,
          currentPassword
        );
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        if (err.code === "auth/email-already-in-use") {
          logInHandler();
        } else {
          window.alert("Something went wrong. Error code: " + err.code);
        }
      }
    }
  };

  const logInHandler = async () => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, currentEmail, currentPassword);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err.code == "auth/wrong-password") {
        if (isSigningUp) {
          setIsSigningUp(false);
        }
        setIsWrongPass(true);
        setCurrentEmail("");
        setCurrentPassword("");
      } else if (err.code == "auth/user-not-found") {
        setIsSigningUp(true);
        registerHandler();
      } else if (err.code == "auth/too-many-requests") {
        window.alert("You have reached too many attempts.");
      } else {
        window.alert("Something went wrong. Error code: " + err.code);
      }
    }
  };

  const resetWrongPassHandler = () => {
    setIsWrongPass(false);
  };

  const isAbleToRegister =
    currentPassword.length >= 6 && currentPassword == checkPass;
  const isAbleToLogIn = currentPassword.length >= 6;

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
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
            error={isWrongPass}
            helperText={isWrongPass && "Your e-mail may be wrong."}
            onFocus={isWrongPass && resetWrongPassHandler}
          />
          <TextField
            id="logInPassword"
            label="Password"
            variant="standard"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            error={isWrongPass}
            helperText={isWrongPass && "Your password may be wrong."}
            onFocus={isWrongPass && resetWrongPassHandler}
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
            disabled={
              isLoading || isSigningUp ? !isAbleToRegister : !isAbleToLogIn
            }
            onClick={isSigningUp ? registerHandler : logInHandler}
          >
            {isSigningUp ? "Register" : "Login"}
          </Button>

          <Button sx={{ fontSize: ".7rem" }} onClick={toggleSignIn}>
            {isSigningUp ? "I do have an account" : "I do not have an account"}
          </Button>
        </>
      )}
    </>
  );
}

export default Form;

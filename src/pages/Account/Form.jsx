import {
  Button,
  CircularProgress,
  TextField,
  Typography,
  Container,
} from "@mui/material";
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
    if (isWrongPass) {
      setIsWrongPass(false);
    }
  };

  const isAbleToRegister =
    currentPassword.length >= 6 && currentPassword == checkPass;
  const isAbleToLogIn = currentPassword.length >= 6;

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "60vh",
        width: 600,
      }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              my: 4,
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
          <Container
            sx={{ display: "flex", flexDirection: "column", width: "70%" }}
          >
            <TextField
              id="logInEmail"
              label="E-Mail"
              variant="standard"
              type="email"
              value={currentEmail}
              onChange={(e) => setCurrentEmail(e.target.value)}
              error={isWrongPass}
              helperText={isWrongPass && "Your e-mail may be wrong."}
              onFocus={resetWrongPassHandler}
            />
            <TextField
              id="logInPassword"
              label="Password"
              variant="standard"
              type="password"
              sx={{ my: 3 }}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              error={isWrongPass}
              helperText={isWrongPass && "Your password may be wrong."}
              onFocus={resetWrongPassHandler}
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
              sx={{ mt: 2 }}
              disabled={
                isLoading || isSigningUp ? !isAbleToRegister : !isAbleToLogIn
              }
              onClick={isSigningUp ? registerHandler : logInHandler}
            >
              {isSigningUp ? "Register" : "Login"}
            </Button>

            <Button sx={{ fontSize: ".7rem" }} onClick={toggleSignIn}>
              {isSigningUp
                ? "I do have an account"
                : "I do not have an account"}
            </Button>
          </Container>
        </>
      )}
    </Container>
  );
}

export default Form;

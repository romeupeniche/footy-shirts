import {
  Button,
  CircularProgress,
  TextField,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { auth } from "../../firebase-config";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

function Form() {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [checkPass, setCheckPass] = useState("");
  const [passInvalid, setPassInvalid] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);

  const isAbleToSubmit = !!passInvalid;

  const toggleSignIn = () => {
    setIsSigningUp(!isSigningUp);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (currentPassword.length < 6) {
      setPassInvalid("invalid");
    } else if (emailRegex.test(currentEmail) === false) {
      setIsEmailInvalid(true);
    } else {
      if (isSigningUp) {
        registerHandler();
      } else {
        logInHandler();
      }
    }
  };

  const registerHandler = async () => {
    if (isAbleToSubmit) {
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
        setPassInvalid("wrong");
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

  const resetPasswordErrorsHandler = () => {
    setPassInvalid(null);
  };

  const resetEmailErrorsHandler = () => {
    setIsEmailInvalid(false);
  };

  const checkIfPasswordMatchesHandler = () => {
    if (currentPassword !== checkPass) {
      setPassInvalid("not-matching");
    }
  };

  const checkIfPasswordIsValidHandler = () => {
    if (isSigningUp) {
      checkIfPasswordMatchesHandler();
    }
    if (currentPassword.length < 6) {
      setPassInvalid("invalid");
    }
  };

  const checkIfEmailIsValidHandler = () => {
    if (emailRegex.test(currentEmail) === false) {
      setIsEmailInvalid(true);
    }
  };

  let emailHelperText = "";
  let passwordHelperText = "";
  const emailError = isEmailInvalid;
  const passwordError = !!passInvalid;

  if (passInvalid === "invalid") {
    passwordHelperText = "Password must be at least 6 characters long.";
  } else if (passInvalid === "wrong") {
    passwordHelperText = "Your password is wrong.";
  } else if (passInvalid === "not-matching") {
    passwordHelperText = "Passwords do not match.";
  }

  if (isEmailInvalid) {
    emailHelperText = "Your email is invalid.";
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "60vh",
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
          <Box
            onSubmit={submitHandler}
            component="form"
            sx={{ display: "flex", flexDirection: "column", width: "70%" }}
          >
            <TextField
              id="logInEmail"
              label="E-Mail"
              variant="standard"
              type="email"
              value={currentEmail}
              onChange={(e) => setCurrentEmail(e.target.value)}
              error={emailError}
              helperText={emailHelperText}
              onFocus={resetEmailErrorsHandler}
              onBlur={checkIfEmailIsValidHandler}
            />
            <TextField
              id="logInPassword"
              label="Password"
              variant="standard"
              type="password"
              sx={{ my: 3 }}
              value={currentPassword}
              // autoComplete={isSigningUp ? false : true}
              onChange={(e) => setCurrentPassword(e.target.value)}
              error={passwordError}
              helperText={passwordHelperText}
              onFocus={resetPasswordErrorsHandler}
              onBlur={checkIfPasswordIsValidHandler}
            />
            {isSigningUp && (
              <TextField
                id="registerCheckPass"
                label="Re-Enter Password"
                variant="standard"
                type="password"
                value={checkPass}
                error={passInvalid === "not-matching"}
                helperText={
                  passInvalid === "not-matching"
                    ? "Passwords do not match."
                    : ""
                }
                onChange={(e) => setCheckPass(e.target.value)}
                onBlur={checkIfPasswordMatchesHandler}
                onFocus={resetPasswordErrorsHandler}
              />
            )}

            <Button
              type="submit"
              sx={{ mt: 2 }}
              disabled={(isLoading || isSigningUp) && isAbleToSubmit}
            >
              {isSigningUp ? "Register" : "Login"}
            </Button>

            <Button sx={{ fontSize: ".7rem" }} onClick={toggleSignIn}>
              {isSigningUp
                ? "I do have an account"
                : "I do not have an account"}
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}

export default Form;

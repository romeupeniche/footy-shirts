import { Avatar, Button, IconButton, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { signInWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { auth } from "../../../firebase-config";
import { setUser } from "../../../store/accountSlice";

function ChangeProfile({ toggleChangingProfileHandler }) {
  const currentProfile = useSelector((state) => state.account);
  const currentUser = useSelector((state) => state.account).user;
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newPhoto, setNewPhoto] = useState("");
  const [providedConfirmPassword, setProvidedConfirmPassword] = useState("");
  const [nameFieldLabel, setNameFieldLabel] = useState(
    currentUser.displayName ?? "Your New Name"
  );
  const dispatch = useDispatch();
  const toggleChangeNameFieldLabelHandler = (e) => {
    if (
      (nameFieldLabel === "Your New Name" ||
        e.target.value.trim().length === 0) &&
      !currentUser.displayName
    ) {
      return;
    } else if (nameFieldLabel == currentUser.displayName) {
      setNameFieldLabel("Your New Name");
    } else if (nameFieldLabel === "Your New Name") {
      setNameFieldLabel(currentUser.displayName);
    }
  };

  const setNewDisplayNameHandler = (e) => {
    setNewDisplayName(e.target.value);
  };

  const setNewPhotoHandler = (e) => {
    setNewPhoto(e.target.value);
  };

  const setProvidedConfirmPasswordHandler = (e) => {
    setProvidedConfirmPassword(e.target.value);
  };

  // const updateUser = async () => {
  //   const updatedProfile = await updateProfile(auth.currentUser, {
  //     displayName: newDisplayName ?? auth.currentUser.displayName,
  //     email: newEmail ?? auth.currentUser.email,
  //     photoURL: newPhoto ?? auth.currentUser.photoURL,
  //   });
  // };

  // WORKING ON THAT...

  const isPhotoInputValid = newPhoto.trim().length > 0;
  const isDisplayNameInputValid = newDisplayName.trim().length > 0;

  const areInputsValid =
    newPhoto.trim().length > 0
      ? isPhotoInputValid
      : isDisplayNameInputValid || isPhotoInputValid; // and photo
  const isAbleToUpdate = areInputsValid && providedConfirmPassword.length > 3;

  const verifyPassword = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        currentUser.email,
        providedConfirmPassword
      );

      // passed the verification

      const displayName =
        newDisplayName.trim() !== ""
          ? newDisplayName.trim()
          : auth.currentUser.displayName;

      const photoURL =
        newPhoto.trim() !== "" ? newPhoto.trim() : auth.currentUser.photoURL;

      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });

      dispatch(
        setUser({
          ...currentProfile,
          user: {
            ...currentProfile.user,
            displayName,
            photoURL,
          },
        })
      );

      toggleChangingProfileHandler();
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        window.alert("Wrong password");
      } else if (err.code == "auth/too-many-requests") {
        window.alert("You have reached too many attempts.");
      } else {
        window.alert("Something went wrong. Error code: " + err.code);
      }
    }
  };

  return (
    <>
      <IconButton
        sx={{ alignSelf: "flex-start" }}
        onClick={toggleChangingProfileHandler}
      >
        <CloseIcon />
      </IconButton>
      <Avatar
        sx={{ width: 70, height: 70 }}
        src={newPhoto.trim().length > 0 ? newPhoto : currentUser.photoURL}
      />

      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          px: 4,
          py: 2,
          mt: 2,
          width: 217,
          height: 200,
        }}
      >
        <TextField
          variant="standard"
          type="text"
          label={nameFieldLabel}
          onFocus={toggleChangeNameFieldLabelHandler}
          onBlur={toggleChangeNameFieldLabelHandler}
          value={newDisplayName}
          onChange={setNewDisplayNameHandler}
        />
        <TextField
          variant="standard"
          type="text"
          label="New Photo URL"
          value={newPhoto}
          onChange={setNewPhotoHandler}
        />
        <TextField
          variant="standard"
          type="password"
          label="Password"
          value={providedConfirmPassword}
          onChange={setProvidedConfirmPasswordHandler}
        />
      </Paper>
      <Button
        sx={{ mt: 2 }}
        disabled={!isAbleToUpdate}
        onClick={verifyPassword}
      >
        Update
      </Button>
    </>
  );
}

export default ChangeProfile;

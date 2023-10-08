<<<<<<< HEAD
import { useLocation } from "react-router-dom";
import ShirtForm from "../../components/ShirtForm";
=======
import { useLocation, useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import { setNewShirt } from "../../store/shirtsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Typography } from "@mui/material";
>>>>>>> 399de2e9d7f36096ed398b5be37e6d0332fbe13f

function EditShirtPage() {
  const { state } = useLocation();
  const { currentGender } = state;
  const { item } = state;

<<<<<<< HEAD
  return <ShirtForm currentGender={currentGender} item={item} />;
=======
  const submitHandler = (providedInfo) => {
    dispatch(setNewShirt(providedInfo));
    navigate("/" + providedInfo.gender);
  };

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  });

  return (
    <>
      <Typography variant="h3" mt={2}>
        Edit: <Typography component="span">{item.name}</Typography>
      </Typography>
      <Form
        submitHandler={submitHandler}
        isNotAbleToChangeGender={true}
        currentGender={currentGender}
        currentItem={item}
      />
    </>
  );
>>>>>>> 399de2e9d7f36096ed398b5be37e6d0332fbe13f
}

export default EditShirtPage;

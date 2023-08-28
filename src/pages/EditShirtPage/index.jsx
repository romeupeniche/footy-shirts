import { useLocation, useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import { setNewShirt } from "../../store/shirtsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Typography } from "@mui/material";

function EditShirtPage() {
  const isAdmin = useSelector((state) => state.account.isAdmin);
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentGender } = state;
  const { item } = state;

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
}

export default EditShirtPage;

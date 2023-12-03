import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNewShirt } from "../../store/shirtsSlice";
import Form from "../../components/Form";

function AddNewShirtPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.account.isAdmin);

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
        New product
      </Typography>
      <Form submitHandler={submitHandler} />
    </>
  );
}

export default AddNewShirtPage;

import { Box, Button, FormGroup, Modal, Typography } from "@mui/material";
import BagSummary from "../../components/BagSummary";
import CardInput from "./CardInput";
import { useState } from "react";
import { clearBag } from "../../store/bagSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "white",
};

function PaymentInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [allInputsValidity, setAllInputsValidity] = useState([
    { key: "CVV", isValid: false },
    { key: "Card Number", isValid: false },
    { key: "Name On Card", isValid: false },
    { key: "MM/YY", isValid: false },
  ]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const setAllInputsValidityHandler = (key, bool) => {
    setAllInputsValidity((prevState) => {
      return prevState.map((item) => {
        if (item.key === key) {
          return { ...item, isValid: bool };
        }
        return item;
      });
    });
  };

  const isAllInputsValid = allInputsValidity.reduce((prevBool, item) => {
    return item.isValid && prevBool;
  }, true);

  const closeConfirmModalHandler = () => {
    setIsConfirmModalOpen(false);
  };

  const openConfirmModalHandler = () => {
    setIsConfirmModalOpen(true);
  };

  const confirmPaymentHandler = () => {
    closeConfirmModalHandler();
    dispatch(clearBag());
    navigate("/");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 5,
          flexDirection: { xs: "column-reverse", md: "row" },
        }}
      >
        <FormGroup sx={{ maxWidth: 450 }}>
          <CardInput
            label="Name On Card"
            setAllInputsValidity={setAllInputsValidityHandler}
          />
          <CardInput
            label="Card Number"
            type="cardNumber"
            setAllInputsValidity={setAllInputsValidityHandler}
          />
          <Box display="flex">
            <CardInput
              label="CVV"
              sx={{ mr: 2 }}
              type="cvv"
              setAllInputsValidity={setAllInputsValidityHandler}
            />
            <CardInput
              label="MM/YY"
              type="expDate"
              setAllInputsValidity={setAllInputsValidityHandler}
            />
          </Box>
          <Button
            disabled={!isAllInputsValid}
            sx={{ mt: 4 }}
            variant="contained"
            fullWidth
            onClick={openConfirmModalHandler}
          >
            Confirm Payment
          </Button>
        </FormGroup>
        <BagSummary />
      </Box>
      <Modal open={isConfirmModalOpen} onClose={closeConfirmModalHandler}>
        <Box sx={modalStyle}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" component="h2">
              Confirm purchasing information?
            </Typography>
            <Typography fontSize={12} fontWeight={200} component="h3">
              Your information won&apos;t be stored.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
              mt: 3,
            }}
          >
            <Button
              color="error"
              variant="outlined"
              onClick={closeConfirmModalHandler}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={confirmPaymentHandler}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default PaymentInfo;

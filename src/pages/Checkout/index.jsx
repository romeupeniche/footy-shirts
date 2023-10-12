import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import UserInfo from "./userInfo";
import PaymentInfo from "./PaymentInfo";

function Checkout() {
  const currentBagItems = useSelector((state) => state.bag.items);
  const [isProceedingToPayment, setIsProceedingToPayment] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();

  const setIsProceedingToPaymentHandler = () => {
    setIsProceedingToPayment(true);
  };

  useEffect(() => {
    if (!state?.isFromBagPage || currentBagItems.length <= 0) {
      navigate("/bag");
      return;
    }
  });

  return (
    <Container>
      <Typography
        fontSize="4rem"
        mt={5}
        sx={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
        }}
      >
        Checkout
        <LocalShippingOutlinedIcon
          fontSize="inherit"
          sx={{ color: "secondary.light", fontWeight: "100", ml: 2 }}
        />
      </Typography>
      {isProceedingToPayment ? (
        <PaymentInfo />
      ) : (
        <UserInfo
          setIsProceedingToPaymentHandler={setIsProceedingToPaymentHandler}
        />
      )}
    </Container>
  );
}

export default Checkout;

import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import UserInfo from "./userInfo";
import PaymentInfo from "./PaymentInfo";
import { useDatabaseSnapshot } from "@react-query-firebase/database";
import { db } from "../../firebase-config";
import { ref } from "firebase/database";

function Checkout() {
  const currentUser = useSelector((state) => state.account).user;
  const userBagRef = ref(db, "carts/" + currentUser.uid);
  const { data } = useDatabaseSnapshot(["bag", currentUser], userBagRef);

  const [isProceedingToPayment, setIsProceedingToPayment] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();

  const setIsProceedingToPaymentHandler = () => {
    window.scrollTo(0, 0);
    setIsProceedingToPayment(true);
  };

  useEffect(() => {
    if (!state?.isFromBagPage || data.val().items.length <= 0) {
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
          sx={{
            color: "secondary.light",
            fontWeight: "100",
            ml: 2,
            display: { xs: "none", md: "inline-block" },
          }}
        />
      </Typography>
      {isProceedingToPayment ? (
        <PaymentInfo currentBag={data.val()} />
      ) : (
        <UserInfo
          setIsProceedingToPaymentHandler={setIsProceedingToPaymentHandler}
          currentBag={data.val()}
        />
      )}
    </Container>
  );
}

export default Checkout;

import { Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";

function Cart() {
  //   const cart = useSelector((state) => state.cart);

  return (
    <Container>
      <Typography>Your Cart</Typography>
    </Container>
  );
}

export default Cart;

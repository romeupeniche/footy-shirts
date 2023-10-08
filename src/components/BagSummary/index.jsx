import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import arrivingDatesFormatter from "../../helpers/ArrivingDatesFormatter";

function BagSummary({ checkoutButton = false }) {
  const currentBag = useSelector((state) => state.bag);
  const shippingValue = currentBag.totalAmount > 250 ? 16.0 : 8.0;
  const navigate = useNavigate();
  const arrivingDates = arrivingDatesFormatter();
  const orderSummary = [
    {
      title: "Subtotal",
      value: currentBag.totalAmount.toFixed(2),
    },
    {
      title: "Shipping",
      value: shippingValue.toFixed(2),
    },
    {
      title: "Tax",
      value: (currentBag.totalAmount * 0.13).toFixed(2),
    },
  ];

  const handleCheckoutClick = () => {
    navigate("checkout", { state: { isFromBagPage: true } });
  };

  return (
    <Box
      sx={{
        width: { xs: "80vw", md: 300 },
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" mb={2} fontWeight={500}>
        Summary
      </Typography>
      {orderSummary.map((item) => (
        <Box
          key={item.title}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            minWidth: "100%",
            mb: 1,
          }}
        >
          <Typography fontWeight={500}>{item.title}:</Typography>
          <Typography fontWeight={500}>${item.value}</Typography>
        </Box>
      ))}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          my: 1,
          minWidth: "100%",
          pb: 1,
          borderBottom: "2px solid #ccc",
        }}
      >
        <Typography>Total:</Typography>
        <Typography fontWeight={600}>
          ${(currentBag.totalAmount * 1.13 + shippingValue).toFixed(2)}
        </Typography>
      </Box>
      {checkoutButton ? (
        <Button
          sx={{ width: "100%" }}
          variant="outlined"
          onClick={handleCheckoutClick}
        >
          Checkout
        </Button>
      ) : (
        <Typography>{arrivingDates}</Typography>
      )}
    </Box>
  );
}

export default BagSummary;

BagSummary.propTypes = {
  checkoutButton: PropTypes.bool,
};

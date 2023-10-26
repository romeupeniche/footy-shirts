import { Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import BagItems from "../../components/BagItems";

function Bag() {
  const currentBag = useSelector((state) => state.bag);

  return (
    <Container>
      <Typography
        fontSize="4rem"
        my={5}
        sx={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
        }}
      >
        Your Bag
        <ShoppingBagOutlinedIcon
          fontSize="inherit"
          sx={{
            color: "secondary.light",
            fontWeight: "100",
            display: { xs: "none", md: "inline-block" },
          }}
        />
      </Typography>
      {!currentBag.items.length ? (
        <Typography>Your bag is empty! Start buying!</Typography>
      ) : (
        <BagItems />
      )}
    </Container>
  );
}

export default Bag;

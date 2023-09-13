import { Box, Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ItemBox from "./ItemBox";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import BagSummary from "../../components/BagSummary";

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
          sx={{ color: "secondary.light", fontWeight: "100" }}
        />
      </Typography>
      {!currentBag.items.length ? (
        <Typography>Your bag is empty! Start buying!</Typography>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column-reverse", md: "row" },
            }}
          >
            <Box>
              {currentBag.items.map((item) => {
                const uniqueItemId = item.gender + item.id + item.size;

                return <ItemBox item={item} key={uniqueItemId} />;
              })}
            </Box>
            <BagSummary checkoutButton={true} />
          </Box>
        </>
      )}
    </Container>
  );
}

export default Bag;

import {
  Box,
  CircularProgress,
  Container,
  Link,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import BagItems from "../../components/BagItems";
import { useDatabaseSnapshot } from "@react-query-firebase/database";
import { db } from "../../firebase-config";
import { ref } from "firebase/database";
import { Link as RouterLink } from "react-router-dom";

function Bag() {
  const currentUser = useSelector((state) => state.account).user;
  const userBagRef = ref(db, "carts/" + currentUser.uid);
  const { data, isLoading } = useDatabaseSnapshot(
    ["bag", currentUser],
    userBagRef
  );

  if (isLoading) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
      {Object.keys(currentUser).length === 0 ? (
        <Typography>
          <Link to="/account" component={RouterLink} color="secondary.main">
            Log-In
          </Link>{" "}
          to start buying!
        </Typography>
      ) : !data.val()?.items?.length ? (
        <Typography>Your bag is empty! Start buying!</Typography>
      ) : (
        <BagItems currentBag={data.val()} />
      )}
    </Container>
  );
}

export default Bag;

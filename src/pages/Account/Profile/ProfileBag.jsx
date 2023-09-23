import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import BagItems from "../../../components/BagItems";

function ProfileBag() {
  const navigate = useNavigate();
  const navigateToBagHandler = () => {
    navigate("/bag");
  };
  return (
    <>
      <Typography mt={5} variant="h5" textAlign="center">
        Finish Your Checkout
      </Typography>
      <Box
        onClick={navigateToBagHandler}
        sx={({ palette: { secondary } }) => ({
          mt: 2,
          borderRadius: 10,
          p: 2,
          transition: "background 400ms ease-out",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: secondary.shade,
            color: secondary.main,
          },
        })}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <OpenInNewIcon />
          <Typography sx={{ fontSize: 20, ml: 1, color: "inherit" }}>
            Bag
          </Typography>
        </Box>
        <BagItems disableSummary />
      </Box>
    </>
  );
}

export default ProfileBag;

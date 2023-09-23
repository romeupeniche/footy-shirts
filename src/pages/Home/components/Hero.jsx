import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { styled } from "@mui/material/styles";
import SuggestedItem from "../../../components/SuggestedItem";

const ShopButton = styled(Button)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontWeight: "bold",
  marginTop: 20,
  color: "black",
  borderColor: "black",
  "&:hover": {
    color: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
  },
}));

function Hero() {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          height: "85vh",
          minHeight: 500,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: { xs: "column", lg: "row" },
          mt: { xs: 40, md: 30, lg: 0 },
          mb: { lg: 0, xs: 50 },
        }}
      >
        <Box
          sx={{
            mb: { lg: 0, xs: 10 },
            color: "black",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: { xs: "center", lg: "start" },
            textAlign: { xs: "center", lg: "left" },
          }}
        >
          <Typography
            sx={{
              letterSpacing: "-.75px",
              fontWeight: "bold",
              fontSize: { xs: "5rem", lg: "4rem" },
            }}
          >
            Footy Shirts
          </Typography>
          <Typography sx={{ width: { xs: 200, md: 400 } }}>
            Unleash Your{" "}
            <Typography
              component="span"
              color="secondary.main"
              fontWeight="bold"
            >
              Team Spirit
            </Typography>
            : Explore the{" "}
            <Typography
              component="span"
              color="secondary.main"
              fontWeight="bold"
            >
              Finest Soccer Jerseys
            </Typography>{" "}
            at{" "}
            <Typography component="span" fontWeight="bold">
              Footy Shirts
            </Typography>
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { lg: 170, md: 300 },
            }}
          >
            {["Men", "Women", "Kids"].map((gender) => (
              <ShopButton
                key={gender.toLowerCase()}
                variant="outlined"
                onClick={() => navigate("/" + gender.toLowerCase())}
                endIcon={
                  <OpenInNewIcon
                    onClick={() => navigate("/" + gender.toLowerCase())}
                  />
                }
              >
                Shop {gender}&apos;s
              </ShopButton>
            ))}
          </Box>
        </Box>
        <SuggestedItem />
      </Box>
    </>
  );
}

export default Hero;

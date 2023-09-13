import CheckroomIcon from "@mui/icons-material/Checkroom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledStep = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

function GettingShirtInfo() {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          left: 0,
          width: "100%",
          p: 10,
          mt: 10,
          backgroundColor: "primary.main",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          color="#fff"
          sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}
        >
          Score Amazing Discounts on Soccer Jerseys!
        </Typography>
        <Typography
          variant="h5"
          color="#fff"
          textAlign="center"
          fontWeight="normal"
        >
          Premier Selection. Trusted Brands. Expert Assistance.
        </Typography>
      </Box>
      <Container
        sx={{
          mt: { xs: 100, md: 50 },
          mb: { xs: 30, md: 0 },
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Browse our collection today</Typography>
        <Typography variant="h4" textAlign="center">
          Easy & convenient jersey shopping
        </Typography>
        <Box
          sx={{
            display: "flex",
            my: 10,
            justifyContent: "space-evenly",
            flexDirection: { xs: "column", md: "row" },
            width: "100%",
          }}
        >
          <StyledStep>
            <CheckroomIcon
              sx={{
                fontSize: 60,
                color: "secondary.main",
              }}
            />
            <Typography sx={{ my: 2 }} variant="h5">
              Choose Your Jersey
            </Typography>
            <Typography
              textAlign="center"
              sx={{ color: "typography.ghost", maxWidth: 300 }}
            >
              Explore our wide range of jerseys to find the perfect fit for your
              soccer preferences.
            </Typography>
          </StyledStep>
          <StyledStep sx={{ mt: { xs: 5, md: 0 } }}>
            <ShoppingBagIcon sx={{ fontSize: 60, color: "secondary.main" }} />
            <Typography sx={{ my: 2 }} variant="h5">
              Shop Now
            </Typography>
            <Typography
              textAlign="center"
              sx={{ color: "typography.ghost", maxWidth: 300 }}
            >
              Select the jerseys you love from our diverse assortment and add
              them to your shopping bag.
            </Typography>
          </StyledStep>
          <StyledStep sx={{ mt: { xs: 5, md: 0 } }}>
            <LocalShippingIcon sx={{ fontSize: 60, color: "secondary.main" }} />
            <Typography sx={{ my: 2 }} variant="h5">
              Receive with Delight
            </Typography>
            <Typography
              textAlign="center"
              sx={{ color: "typography.ghost", maxWidth: 300 }}
            >
              Enjoy the convenience of doorstep delivery as we bring your chosen
              jerseys right to you.
            </Typography>
          </StyledStep>
        </Box>
      </Container>
    </>
  );
}

export default GettingShirtInfo;

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import { useNavigate } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

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

function Hero({ newShirts }) {
  const navigate = useNavigate();
  return (
    <>
      {newShirts ? (
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
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box
              sx={{
                width: "auto",
                height: { xs: 480, md: 550 },
                pointerEvents: "none",
              }}
              component="img"
              loading="lazy"
              src={newShirts[0].imgs[0]}
            />
            <NewReleasesIcon
              fontSize="large"
              title="New Release"
              sx={{
                position: "absolute",
                right: "8%",
                top: { xs: "70%", md: "20%" },
              }}
            />
            <Box
              component="span"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h4">
                {newShirts[0].gender.toUpperCase()}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  maxWidth: "100%",
                  textAlign: "center",
                  my: 2,
                  fontWeight: "regular",
                }}
              >
                {newShirts[0].name}
              </Typography>
              <Typography
                variant="h5"
                color="typography.money"
                sx={{ maxWidth: 300, textAlign: "center" }}
              >
                ${newShirts[0].price}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "secondary.main",
                  width: "100%",
                }}
                onClick={() =>
                  navigate(`/${newShirts[0].gender}/${newShirts[0].id}`)
                }
              >
                See More
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Container
          sx={{
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Container>
      )}
    </>
  );
}

export default Hero;

Hero.propTypes = {
  newShirts: PropTypes.array,
};

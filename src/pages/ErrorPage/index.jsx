import { Box, Button, Container, Typography } from "@mui/material";
import Header from "../../components/Header";
import ScrollToTop from "../../helpers/ScrollToTop";
import Footer from "../../components/Footer";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { changeURLDueToError } from "../../helpers/ChangeURL";

function ErrorPage() {
  useEffect(() => {
    changeURLDueToError();
  });
  return (
    <>
      <Header />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 8,
        }}
      >
        <>
          <Typography variant="h2" mt={5}>
            Error 404: Page Not Found
          </Typography>

          <Box sx={{ height: "50vh", display: "flex", alignItems: "center" }}>
            <Link to="/">
              <Button variant="outlined" sx={{ p: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                  <SportsSoccerIcon />
                </Box>
                Back To Home
              </Button>
            </Link>
          </Box>
        </>
        <ScrollToTop />
      </Container>
      <Footer />
    </>
  );
}

export default ErrorPage;

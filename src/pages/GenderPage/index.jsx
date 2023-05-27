import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink, useLocation } from "react-router-dom";
import AddNewItemBox from "./AddNewItemBox";

function GenderPage() {
  const gender = useLocation().pathname.replace("/", "");
  const currentShirts = useSelector((state) => state.shirts);
  const isAdmin = useSelector((state) => state.account.isAdmin);
  const [genderShirts, setGenderShirts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (Object.keys(currentShirts.shirts).length) {
      const shirts = currentShirts.shirts[gender];
      const loadedShirts = Object.keys(shirts).map(
        (shirtTitle) => shirts[shirtTitle]
      );
      setGenderShirts(loadedShirts);
    }
    setIsLoading(false);
  }, [gender, currentShirts]);

  return (
    <>
      <Typography variant="h2" sx={{ mt: 5, mb: 10 }}>
        {gender.toUpperCase()}
        {`'`}s JERSEYS
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid
          container
          justifyContent="center"
          rowSpacing={4}
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 6, md: 12 }}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {genderShirts.map((shirt) => {
            return (
              <Grid item xs={2} sm={4} key={shirt.id}>
                <Link
                  component={RouterLink}
                  to={`${shirt.id}`}
                  sx={{ textDecoration: "none" }}
                >
                  <Container
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-between",
                      bgcolor: "bg.light",
                      p: 1,
                      borderRadius: 2,
                      pt: 1,
                      height: 480,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        height: "100%",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        component="img"
                        src={shirt.imgs[0]}
                        sx={{
                          maxHeight: "380px",
                          borderRadius: 2,
                          width: "100%",
                          alignItems: "center",
                        }}
                      />
                    </Box>
                    <Box textAlign="center">
                      <Typography
                        fontSize="1.1rem"
                        mt={2}
                        maxWidth={{
                          lg: 300,
                          md: 200,
                          xs: 300,
                        }}
                        noWrap
                      >
                        {shirt.name}
                      </Typography>
                      <Typography variant="h6" color="green">
                        ${shirt.price}
                      </Typography>
                    </Box>
                  </Container>
                </Link>
              </Grid>
            );
          })}
          {isAdmin && <AddNewItemBox />}
        </Grid>
      )}
    </>
  );
}

export default GenderPage;

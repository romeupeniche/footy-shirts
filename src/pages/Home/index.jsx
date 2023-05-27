import {
  Box,
  CircularProgress,
  Grid,
  ImageListItem,
  Typography,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Home() {
  const [newShirts, setNewShirts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const currentShirts = useSelector((state) => state.shirts);

  useEffect(() => {
    setIsLoading(true);
    if (Object.keys(currentShirts.shirts).length) {
      setIsLoading(false);
      const shirts = currentShirts.shirts;
      let genderTitles = Object.keys(shirts);
      let firstKidsShirt = shirts.kids[Object.keys(shirts.kids)[0]];
      let firstMenShirt = shirts.men[Object.keys(shirts.men)[0]];
      let firstWomenShirt = shirts.women[Object.keys(shirts.women)[0]];

      setNewShirts([
        { ...firstKidsShirt, gender: genderTitles[0] },
        { ...firstMenShirt, gender: genderTitles[1] },
        { ...firstWomenShirt, gender: genderTitles[2] },
      ]);
    }
  }, [currentShirts]);

  return (
    <>
      <Typography
        variant="h2"
        sx={{
          mt: 10,
          letterSpacing: "-.75px",
          fontSize: "5rem",
        }}
      >
        Footy Shirts
      </Typography>
      <Typography
        variant="h3"
        sx={{
          mt: "70vh",
          fontSize: "2rem",
          color: "primary.main",
        }}
      >
        New Releases!
      </Typography>
      {newShirts && (
        <Box
          sx={{
            mt: 5,
          }}
        >
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 2, sm: 6, md: 12 }}
            sx={{
              justifyContent: "center",
            }}
          >
            {isLoading ? (
              <CircularProgress />
            ) : (
              <>
                {newShirts.map((title) => {
                  return (
                    <Grid item xs={2} sm={4} key={title.gender}>
                      <Link
                        to={`${title.gender}/0`}
                        component={RouterLink}
                        sx={{ color: "primary.main" }}
                      >
                        <ImageListItem
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            bgcolor: "bg.light",
                            p: 1,
                            borderRadius: 2,
                          }}
                        >
                          <Typography
                            variant="h5"
                            sx={{
                              my: 1,
                            }}
                          >
                            {title.gender.toUpperCase()}
                          </Typography>
                          <img src={title.imgs[0]} />
                          <Typography
                            fontSize="1.1rem"
                            mt={2}
                            maxWidth={300}
                            noWrap
                          >
                            {title.name}
                          </Typography>
                          <Typography variant="h6" color="green">
                            ${title.price}
                          </Typography>
                        </ImageListItem>
                      </Link>
                    </Grid>
                  );
                })}
              </>
            )}
          </Grid>
        </Box>
      )}
    </>
  );
}

export default Home;

import {
  Box,
  CircularProgress,
  Grid,
  ImageListItem,
  Typography,
  Link,
  Button,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

function Home() {
  const [newShirts, setNewShirts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const currentShirts = useSelector((state) => state.shirts);
  const navigate = useNavigate();

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

  const navigateToPageHandler = (event) => {
    navigate("/" + event.target.id);
  };

  return (
    <>
      <Box
        sx={{
          mt: "-1.5rem",
          width: "100vw",
          height: "85vh",
          backgroundSize: "cover",
          objectFit: "cover",
          backgroundPosition: "center",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1551854304-9235bf86ef71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)",
        }}
      >
        <Box
          sx={{
            ml: 5,
            mt: 15,
            color: "black",
          }}
        >
          <Typography
            sx={{
              letterSpacing: "-.75px",
              fontSize: "4.5rem",
            }}
          >
            Footy Shirts
          </Typography>
          <Typography sx={{ width: { xs: 200, md: 400 } }}>
            Unleash Your Team Spirit: Explore the Finest Soccer Jerseys at Footy
            Shirts
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", maxWidth: 170 }}>
            <Button
              sx={{ mt: 2, color: "black", borderColor: "black" }}
              variant="outlined"
              onClick={navigateToPageHandler}
              id="men"
            >
              Shop Men's <OpenInNewIcon sx={{ ml: 1 }} fontSize="2rem" />
            </Button>
            <Button
              sx={{ mt: 2, color: "black", borderColor: "black" }}
              variant="outlined"
              onClick={navigateToPageHandler}
              id="women"
            >
              Shop Women's <OpenInNewIcon sx={{ ml: 1 }} fontSize="2rem" />
            </Button>
            <Button
              sx={{ mt: 2, color: "black", borderColor: "black" }}
              variant="outlined"
              onClick={navigateToPageHandler}
              id="kids"
            >
              Shop Kids's <OpenInNewIcon sx={{ ml: 1 }} fontSize="2rem" />
            </Button>
          </Box>
        </Box>
      </Box>
      <Typography
        variant="h3"
        sx={{
          mt: "20vh",
          mb: 3,
          fontSize: "2rem",
          color: "primary.main",
        }}
      >
        New Releases!
      </Typography>
      {newShirts && (
        <Box>
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
                {newShirts.map((item) => {
                  return (
                    <Grid item xs={2} sm={4} key={item.gender}>
                      <Link
                        to={`${item.gender}/${item.id}`}
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
                            {item.gender.toUpperCase()}
                          </Typography>
                          <img src={item.imgs[0]} />
                          <Typography
                            fontSize="1.1rem"
                            mt={2}
                            maxWidth={300}
                            noWrap
                          >
                            {item.name}
                          </Typography>
                          <Typography variant="h6" color="green">
                            ${item.price}
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

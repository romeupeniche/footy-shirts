import { Box, Grid, ImageListItem, Typography } from "@mui/material";
import { db } from "../../firebase-config";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { Link } from "react-router-dom";

function Home() {
  const [newShirts, setNewShirts] = useState(null);

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const shirts = data.shirts;
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
    });
  }, []);

  return (
    <>
      <Typography
        variant="h2"
        sx={{
          mt: 10,
          fontFamily: "'Inter', sans-serif",
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
          color: "#646cff",
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
            {newShirts.map((title) => {
              return (
                <Grid item xs={2} sm={4} key={title.gender}>
                  <Link to={`${title.gender}/0`}>
                    <ImageListItem
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        bgcolor: "#111",
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
                      <Typography fontSize="1.1rem" mt={2}>
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
          </Grid>
        </Box>
      )}
    </>
  );
}

export default Home;

import {
  CircularProgress,
  Grid,
  ImageListItem,
  Typography,
} from "@mui/material";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebase-config";

function GenderPage() {
  const gender = useParams().gender;

  const [genderShirts, setGenderShirts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const shirts = data.shirts[gender];
        const loadedShirts = Object.keys(shirts).map(
          (shirtTitle) => shirts[shirtTitle]
        );

        setGenderShirts(loadedShirts);
      }
    });
    setIsLoading(false);
  }, [gender]);

  return (
    <>
      <Typography variant="h2" sx={{ mt: 5, mb: 10 }}>
        {gender.toUpperCase()}
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid
          container
          justifyContent="center"
          rowSpacing={4}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {genderShirts.map((shirt, i) => {
            return (
              <Grid item xs={2} sm={4} key={i}>
                <Link to={`${i}`}>
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
                    ></Typography>
                    <img src={shirt.imgs[0]} width={300} />
                    <Typography fontSize="1.1rem" mt={2}>
                      {shirt.name}
                    </Typography>
                    <Typography variant="h6" color="green">
                      ${shirt.price}
                    </Typography>
                  </ImageListItem>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
}

export default GenderPage;

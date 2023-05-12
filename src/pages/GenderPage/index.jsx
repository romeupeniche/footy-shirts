import {
  CircularProgress,
  Grid,
  ImageListItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

function GenderPage() {
  const gender = useLocation().pathname.replace("/", "");
  const currentShirts = useSelector((state) => state.shirts);
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

import {
  CircularProgress,
  Grid,
  ImageListItem,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

function SearchPage() {
  const currentShirts = useSelector((state) => state.shirts);
  const search = useParams().search;
  const [foundItems, setFoundItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setFoundItems([]);
    setIsLoading(true);

    for (let gender in currentShirts.shirts) {
      for (let team in currentShirts.shirts[gender]) {
        if (
          currentShirts.shirts[gender][team].name
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          currentShirts.shirts[gender][team].commonTypos
            .toLowerCase()
            .includes(search.toLowerCase())
        ) {
          setFoundItems((prev) => [
            ...prev,
            { ...currentShirts.shirts[gender][team], gender },
          ]);
        }
      }
    }

    setIsLoading(false);
  }, [search, currentShirts.shirts]);

  return (
    <>
      <Typography variant="h3" mt={2} maxWidth="80vw">
        Showing results for: "
        <Box display="inline" color="primary.main">
          {search}
        </Box>
        "
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {foundItems.length ? (
            <Grid
              container
              justifyContent="center"
              rowSpacing={4}
              mt={2}
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 2, sm: 6, md: 12 }}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {foundItems.map((shirt, i) => {
                return (
                  <Grid item xs={2} sm={4} key={i}>
                    <Typography variant="h6" textAlign="center">
                      {shirt.gender.toUpperCase()}
                    </Typography>
                    <Link to={`/${shirt.gender}/${shirt.id}`}>
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
          ) : (
            <Typography mt={10} variant="h5" mb={30}>
              No items were found.{" "}
              {search.length > 15
                ? "Try being less especific."
                : "Check if there's a typo."}
            </Typography>
          )}
        </>
      )}
    </>
  );
}

export default SearchPage;

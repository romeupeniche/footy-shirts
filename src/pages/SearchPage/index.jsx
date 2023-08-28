import { CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "../../components/Card";

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
        Showing results for: &quot;
        <Typography component="span" variant="h3" color="secondary">
          {search}
        </Typography>
        &quot;
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
              {foundItems.map((shirt) => {
                return (
                  <Card key={shirt.id} shirt={shirt} gender={shirt.gender} />
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

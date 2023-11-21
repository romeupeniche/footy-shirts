import { Box, Grid, Typography } from "@mui/material";
import Card from "../../../components/Card";
import useNewShirtsByGender from "../../../hooks/useNewShirtsByGender";
import { useEffect, useState } from "react";
import SkeletonCard from "../../../components/SkeletonCard";

function NewReleases() {
  const [newShirts, isLoading] = useNewShirtsByGender();
  const [pageIsLoading, setPageIsLoading] = useState(true);

  useEffect(() => {
    const onPageLoad = () => {
      setPageIsLoading(false);
    };

    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad, false);
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);
  return (
    <>
      <Typography
        variant="h3"
        sx={{
          mt: "20vh",
          mb: 3,
          fontSize: "2rem",
        }}
      >
        New Releases!
      </Typography>
      <Box>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 6, md: 12 }}
          sx={{
            justifyContent: "center",
          }}
        >
          {isLoading || pageIsLoading ? (
            [1, 2, 3].map((i) => {
              return <SkeletonCard key={i} />;
            })
          ) : (
            <>
              {newShirts.map((shirt) => {
                return (
                  <Card shirt={shirt} key={shirt.id} gender={shirt.gender} />
                );
              })}
            </>
          )}
        </Grid>
      </Box>
    </>
  );
}

export default NewReleases;

import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import Card from "../../../components/Card";
import useNewShirtsByGender from "../../../hooks/useNewShirtsByGender";

function NewReleases() {
  const [newShirts, isLoading] = useNewShirtsByGender();
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
                {newShirts.map((shirt) => {
                  return (
                    <Card shirt={shirt} key={shirt.id} gender={shirt.gender} />
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

export default NewReleases;

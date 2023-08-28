import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Card from "../../../components/Card";

function NewReleases({ newShirts, isLoading }) {
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

NewReleases.propTypes = {
  newShirts: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
};

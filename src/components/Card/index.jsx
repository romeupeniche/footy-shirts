import { Box, Container, Grid, Link, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";

function Card({ shirt, gender }) {
  return (
    <Grid item xs={2} sm={4}>
      <Link
        component={RouterLink}
        to={gender ? `/${gender}/${shirt.id}` : `${shirt.id}`}
        sx={{ textDecoration: "none" }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            p: 1,
            borderRadius: 2,
            transition: "400ms",
            "&:hover": {
              boxShadow: 1,
            },
          }}
        >
          {gender && (
            <Typography variant="h5">{gender.toUpperCase()}</Typography>
          )}
          <Box
            sx={{
              display: "flex",
              height: "100%",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={shirt.imgs[0]}
              sx={{
                maxHeight: "380px",
                borderRadius: 2,
              }}
            />
          </Box>
          <Box textAlign="center">
            <Typography
              fontSize="1.1rem"
              mt={2}
              maxWidth={{
                lg: 300,
                md: 200,
                xs: 300,
              }}
              noWrap
            >
              {shirt.name}
            </Typography>
            <Typography variant="h6" color="green">
              ${shirt.price}
            </Typography>
          </Box>
        </Container>
      </Link>
    </Grid>
  );
}

export default Card;

Card.propTypes = {
  shirt: PropTypes.object.isRequired,
  gender: PropTypes.string.isRequired,
};

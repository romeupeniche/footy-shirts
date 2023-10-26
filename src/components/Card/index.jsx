import { Box, Container, Grid, Link, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

function Card({ shirt = null, gender = null, newItemCard = false }) {
  let linkTo = "";
  if (newItemCard) {
    linkTo = "/add";
    shirt = {
      gender,
    };
  } else if (gender) {
    linkTo = `/${gender}/${shirt.id}`;
  } else if (!gender && shirt) {
    linkTo = `${shirt.id}`;
  }

  let title = "";

  if (gender && !newItemCard) {
    title = gender.toUpperCase();
  }
  return (
    <Grid item xs={2} sm={4}>
      <Link
        component={RouterLink}
        to={linkTo}
        state={{ shirt }}
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
            overflow: "hidden",
            "&:hover": {
              boxShadow: 1,
            },
          }}
        >
          <Typography variant="h5">{title}</Typography>
          <Box
            sx={{
              display: "flex",
              height: "100%",
              alignItems: "center",
            }}
          >
            {!newItemCard ? (
              <Box
                component="img"
                src={shirt.imgs[0]}
                sx={{
                  maxHeight: "380px",
                  borderRadius: 2,
                }}
              />
            ) : (
              <Box
                component="div"
                sx={{
                  width: "304px",
                  height: "380px",
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AddIcon sx={{ transform: "scale(10)" }} />
              </Box>
            )}
          </Box>
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
            {!newItemCard ? shirt.name : "Admin only!"}
          </Typography>
          <Typography variant="h6" color="green">
            {!newItemCard ? `$${shirt.price}` : "Add New Item"}
          </Typography>
        </Container>
      </Link>
    </Grid>
  );
}

export default Card;

Card.propTypes = {
  shirt: PropTypes.object,
  gender: PropTypes.string,
  newItemCard: PropTypes.bool,
};

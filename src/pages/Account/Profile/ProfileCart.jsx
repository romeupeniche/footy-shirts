import { Grid, ImageListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

function ProfileCart() {
  const currentCart = useSelector((state) => state.cart);
  return (
    <>
      <Typography mt={5} variant="h5" textAlign="center">
        Finish Your Checkout
      </Typography>
      <Box
        sx={{
          mt: 2,
          bgcolor: "#00000D",
          borderRadius: 10,
          p: 2,
        }}
      >
        <Link to="/cart">
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <OpenInNewIcon />
            <Typography sx={{ fontSize: 20, ml: 1 }}>Cart</Typography>
          </Box>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 2, sm: 6, md: 12 }}
            sx={{
              justifyContent: "space-evenly",
            }}
          >
            {currentCart.items.map((item) => {
              return (
                <Grid item xs={2} sm={4} key={item.id}>
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
                    <Typography>
                      {item.gender.toUpperCase()} : {item.size.toUpperCase()}
                    </Typography>
                    <img src={item.img} />
                    <Typography
                      noWrap
                      fontSize="1.1rem"
                      mt={2}
                      maxWidth={300}
                      textAlign="center"
                    >
                      {item.name}
                    </Typography>
                  </ImageListItem>
                </Grid>
              );
            })}
          </Grid>
        </Link>
      </Box>
    </>
  );
}

export default ProfileCart;

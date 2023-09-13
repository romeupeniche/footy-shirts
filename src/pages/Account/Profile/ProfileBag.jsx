import { Grid, Typography, Link } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

function ProfileBag() {
  const currentBag = useSelector((state) => state.bag);
  return (
    <>
      <Typography mt={5} variant="h5" textAlign="center">
        Finish Your Checkout
      </Typography>
      <Box
        sx={{
          mt: 2,
          bgcolor: "primary.darkest",
          borderRadius: 10,
          p: 2,
        }}
      >
        <Link
          component={RouterLink}
          to={"/bag"}
          sx={{ textDecoration: "none" }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <OpenInNewIcon />
            <Typography sx={{ fontSize: 20, ml: 1 }}>Bag</Typography>
          </Box>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 2, sm: 6, md: 12 }}
            sx={{
              justifyContent: "space-evenly",
            }}
          >
            {currentBag.items.map((item) => {
              return (
                <Grid item xs={2} sm={4} key={item.id}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      bgcolor: "bg.light",
                      p: 1,
                      borderRadius: 2,
                    }}
                  >
                    <Typography>
                      {item.gender.toUpperCase()} : {item.size.toUpperCase()}
                    </Typography>
                    <Box
                      component="img"
                      src={item.img}
                      sx={{ width: "100%" }}
                    />
                    <Typography
                      noWrap
                      fontSize="1.1rem"
                      mt={2}
                      maxWidth={{
                        xs: 250,
                        md: 300,
                      }}
                      textAlign="center"
                    >
                      {item.name}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Link>
      </Box>
    </>
  );
}

export default ProfileBag;

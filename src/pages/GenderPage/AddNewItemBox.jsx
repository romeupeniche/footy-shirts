import { Grid, Typography, Box, Link, Container } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

function AddNewItemBox() {
  return (
    <Grid item xs={2} sm={4}>
      <Link component={RouterLink} to="/add" sx={{ textDecoration: "none" }}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "bg.light",
            p: 1,
            borderRadius: 2,
            pt: 1,
            height: 480,
          }}
        >
          <Box
            sx={{
              maxHeight: "420px",
              borderRadius: 2,
              width: "100%",
              height: "100%",
              alignItems: "center",
              bgcolor: "bg.lightest",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <AddIcon sx={{ transform: "scale(10)" }} />
          </Box>
          <Typography fontSize="1.1rem" mt={2} color="warning.main">
            Admin only!
          </Typography>
          <Typography variant="h6" color="green">
            Add New Item
          </Typography>
        </Container>
      </Link>
    </Grid>
  );
}

export default AddNewItemBox;

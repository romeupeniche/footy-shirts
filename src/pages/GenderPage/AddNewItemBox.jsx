import { Grid, ImageListItem, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

function AddNewItemBox() {
  return (
    <Grid item xs={2} sm={4}>
      <Link to={`/add`}>
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
          <Box
            width="100%"
            height={{
              md: "34vw",
              sm: "70vw",
              xs: "100vw"
            }}
            maxHeight={{
              md: 425,

            }}
            bgcolor="#333"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <AddIcon sx={{transform: "scale(10)"}} />
          </Box>
          <Typography fontSize="1.1rem" mt={2} color="warning.main">
            Admin only!
          </Typography>
          <Typography variant="h6" color="green">
            Add New Item
          </Typography>
        </ImageListItem>
      </Link>
    </Grid>
  );
}

export default AddNewItemBox;

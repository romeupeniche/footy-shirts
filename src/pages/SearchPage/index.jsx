import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";

function SearchPage() {
  const search = useParams().search;

  return (
    <>
      <Typography variant="h3" mt={2}>
        Showing results for: "
        <Box display="inline" color="primary.main">
          {search}
        </Box>
        "
      </Typography>
    </>
  );
}

export default SearchPage;

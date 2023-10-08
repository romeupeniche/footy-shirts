import { Box, Typography } from "@mui/material";
import SuggestedItem from "../../../components/SuggestedItem";

function ProfileSuggestedItem() {
  return (
    <Box
      display="flex"
      sx={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mt: 8,
      }}
    >
      <Typography
        variant="h6"
        fontSize="1.8rem"
        maxWidth={500}
        textAlign="center"
      >
        Not Sure What to Buy? Check Out{" "}
        <Typography
          component="span"
          color="secondary.main"
          fontSize="inherit"
          fontWeight="inherit"
        >
          Our Recommendation
        </Typography>
        !
      </Typography>
      <SuggestedItem sx={{ maxWidth: 700 }} />
    </Box>
  );
}

export default ProfileSuggestedItem;

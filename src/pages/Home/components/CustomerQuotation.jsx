import { Avatar, Box, Typography } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import PropTypes from "prop-types";

function CustomerQuotation({ img, location, quotation, name }) {
  return (
    <Box
      sx={{
        width: { xs: 400, sm: 600 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: { xs: "center", lg: "stretch" },
      }}
    >
      <Typography
        fontWeight="medium"
        fontSize="1.4rem"
        sx={{ width: { xs: 300, sm: 500 } }}
      >
        &quot;{quotation}&quot;
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          mt: 2,
          mb: { xs: 5, lg: 2 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={img}
            sx={{ width: 70, height: "auto", pointerEvents: "none" }}
          />
          <Box ml={2} textAlign="left">
            <Typography fontSize="1.5rem" fontWeight="bold">
              {name}
            </Typography>
            <Typography>{location}</Typography>
          </Box>
        </Box>
        <FormatQuoteIcon sx={{ fontSize: "5rem", color: "secondary.main" }} />
      </Box>
    </Box>
  );
}

export default CustomerQuotation;

CustomerQuotation.propTypes = {
  img: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  quotation: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

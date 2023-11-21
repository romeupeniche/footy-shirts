import { Box, Button, Typography } from "@mui/material";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import { useNavigate } from "react-router-dom";
import useNewShirtsByGender from "../../hooks/useNewShirtsByGender";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import SkeletonCard from "../SkeletonCard";

function SuggestedItem({ sx = {} }) {
  const navigate = useNavigate();
  const [newShirts, isLoading] = useNewShirtsByGender();
  const [pageIsLoading, setPageIsLoading] = useState(true);

  useEffect(() => {
    const onPageLoad = () => {
      setPageIsLoading(false);
    };

    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad, false);
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);

  if (isLoading || pageIsLoading) {
    return <SkeletonCard type="suggested-item" />;
  }

  return (
    <>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
          ...sx,
        }}
      >
        <>
          <Box
            sx={{
              width: "auto",
              height: { xs: 480, md: 550 },
              pointerEvents: "none",
            }}
            component="img"
            loading="lazy"
            src={newShirts[0].imgs[0]}
          />
          <NewReleasesIcon
            fontSize="large"
            title="New Release"
            sx={{
              position: "absolute",
              right: "8%",
              top: { xs: "70%", md: "20%" },
            }}
          />
          <Box
            component="span"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: { xs: 4, md: 0 },
            }}
          >
            <Typography variant="h4">
              {newShirts[0].gender.toUpperCase()}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                maxWidth: "100%",
                textAlign: "center",
                my: 2,
                fontWeight: "regular",
              }}
            >
              {newShirts[0].name}
            </Typography>
            <Typography
              variant="h5"
              color="typography.money"
              sx={{ maxWidth: 300, textAlign: "center" }}
            >
              ${newShirts[0].price}
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "secondary.main",
                width: "100%",
              }}
              onClick={() =>
                navigate(`/${newShirts[0].gender}/${newShirts[0].id}`)
              }
            >
              See More
            </Button>
          </Box>
        </>
      </Box>
    </>
  );
}

export default SuggestedItem;

SuggestedItem.propTypes = {
  sx: PropTypes.object,
};

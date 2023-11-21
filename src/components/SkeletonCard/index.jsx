import { Box, Container, Grid } from "@mui/material";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import PropTypes from "prop-types";

const skeletonStyle = {
  background: "linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%)",
  borderRadius: "20px",
  backgroundSize: "400% 100%",
  animation: "3.5s shine linear infinite",
  "@keyframes shine": {
    to: {
      backgroundPositionX: "-400%",
    },
  },
};

function SkeletonCard({ type = "card" }) {
  if (type === "suggested-item") {
    return (
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          sx={{
            width: "360px",
            height: "480px",
            ...skeletonStyle,
            mr: { xs: 0, md: 4 },
          }}
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
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: { xs: 4, md: 0 },
          }}
        >
          <Box sx={{ width: "100px", height: "36px", ...skeletonStyle }}></Box>
          <Box
            sx={{
              height: "24px",
              width: "200px",
              my: 2,
              ...skeletonStyle,
            }}
          ></Box>
          <Box sx={{ height: "24px", width: "100px", ...skeletonStyle }}></Box>
          <Box
            sx={{
              mt: 2,
              width: "200px",
              height: "36px",
              ...skeletonStyle,
            }}
          ></Box>
        </Box>
      </Box>
    );
  } else if (type === "item") {
    return (
      <>
        <Container>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: {
                xs: "column",
                md: "row",
              },
            }}
          >
            <Box
              sx={{
                width: {
                  xs: 300,
                  md: 600,
                },
                display: "flex",
                alignItems: "center",
                flexDirection: {
                  xs: "column-reverse",
                  md: "row",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "row", md: "column" },
                  width: { xs: "70%", md: "auto" },
                  justifyContent: { xs: "space-around", md: "center" },
                  mt: { md: -10 },
                }}
              >
                <Box
                  sx={{
                    width: "60px",
                    height: "90px",
                    ...skeletonStyle,
                    mb: { md: 4 },
                  }}
                />
                <Box sx={{ width: "60px", height: "90px", ...skeletonStyle }} />
              </Box>
              <Box
                sx={{
                  width: { xs: "100%", md: "504px" },
                  height: "630px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    width: { xs: "300px", md: "400px" },
                    height: { xs: "480px", md: "580px" },
                    ...skeletonStyle,
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                minHeight: "60vh",
                mt: {
                  xs: 4,
                  md: 0,
                },
                width: {
                  xs: "100%",
                  md: 500,
                },
                borderRadius: 5,
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Box
                    sx={{
                      width: { xs: "300px", md: "400px" },
                      height: "48px",
                      ...skeletonStyle,
                    }}
                  ></Box>
                </Box>
                <Box
                  sx={{
                    width: { xs: "250px", md: "350px" },
                    height: "12px",
                    ...skeletonStyle,
                    mt: 1,
                  }}
                ></Box>
                <Box
                  sx={{
                    width: "90px",
                    height: "36px",
                    ...skeletonStyle,
                    mt: 4,
                  }}
                ></Box>
              </Box>
              <Box
                sx={{
                  width: "100px",
                  height: "24px",
                  ...skeletonStyle,
                  mt: 6,
                  ml: { xs: -20, md: -30 },
                }}
              ></Box>
              <Box
                sx={{ width: "300px", height: "36px", ...skeletonStyle }}
              ></Box>
              <Box
                sx={{
                  width: { xs: 300, md: 400 },
                  height: "54px",
                  ...skeletonStyle,
                  mb: 3,
                }}
              ></Box>
            </Box>
          </Box>
        </Container>
      </>
    );
  } else {
    return (
      <Grid item xs={2} sm={4}>
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
          <Box
            sx={{
              display: "flex",
              width: "304px",
              height: "380px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component="div"
              sx={{
                ...skeletonStyle,
                width: "254px",
                height: "350px",
                borderRadius: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Box>
          </Box>
          <Box
            mt={2}
            sx={{
              width: { xs: "70%", sm: "90%" },
              height: "24px",
              ...skeletonStyle,
            }}
          ></Box>
          <Box
            sx={{
              width: "30%",
              height: "24px",
              mt: 2,
              mb: 1,
              ...skeletonStyle,
            }}
          ></Box>
        </Container>
      </Grid>
    );
  }
}

export default SkeletonCard;

SkeletonCard.propTypes = {
  type: PropTypes.string,
};

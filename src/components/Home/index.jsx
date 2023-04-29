import { Typography } from "@mui/material";

function Home() {
  return (
    <>
      <Typography
        variant="h2"
        sx={{
          mt: 10,
          fontFamily: "'Inter', sans-serif",
          letterSpacing: "-.75px",
          fontSize: "5rem",
        }}
      >
        Footy Shirts
      </Typography>
    </>
  );
}

export default Home;

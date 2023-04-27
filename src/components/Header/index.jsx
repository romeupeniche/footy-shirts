import { AppBar, Slide, useScrollTrigger } from "@mui/material";

function Header() {
  const trigger = useScrollTrigger();

  return (
    <>
      <Slide in={!trigger}>
        <AppBar
          sx={{
            bg: "theme.palette.primary.mainGradient",
          }}
          //   style={{
          //     background: "linear-gradient(to right, tomato, cyan)",
          //   }}
        >
          Teste
        </AppBar>
      </Slide>
    </>
  );
}

export default Header;

import { ThemeProvider } from "@emotion/react";
import "./App.css";
import Header from "./components/Header";
import { createTheme } from "@mui/material";

function App() {
  const theme = createTheme({
    spacing: 10,
    palette: {
      primary: {
        main: "#000072",
        light: "#00009b",
        dark: "#000035",
        mainGradient: "linear-gradient(to right, tomato, cyan)",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}

      <Header />
      <div
        style={{ height: "200vh", backgroundColor: "#ccc", width: "99vw" }}
      ></div>
    </ThemeProvider>
  );
}

export default App;

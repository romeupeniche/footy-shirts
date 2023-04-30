import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { Container } from "@mui/material";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      {/* <CssBaseline /> */}
      <Header />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 8,
        }}
      >
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default App;

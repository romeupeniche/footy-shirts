import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { Container } from "@mui/material";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./firebase-config";
import { useDispatch } from "react-redux";
import { setUser } from "./store/accountSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
    });
  }, []);

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

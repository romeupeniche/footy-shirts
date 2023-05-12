import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { Container } from "@mui/material";
import Footer from "./components/Footer";
import { onAuthStateChanged } from "@firebase/auth";
import { auth, db } from "./firebase-config";
import { useDispatch } from "react-redux";
import { setUser } from "./store/accountSlice";
import { setItems } from "./store/cartSlice";
import { onValue, ref } from "firebase/database";
import { useEffect } from "react";
import { setShirts } from "./store/shirtsSlice";
import ScrollToTop from "./helpers/ScrollToTop";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const shirts = data.shirts;

        dispatch(setShirts(shirts));
      }
    });
  });

  onAuthStateChanged(auth, (user) => {
    dispatch(
      setUser({
        user: {
          displayName: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL,
          uid: user?.uid,
        },
      })
    );

    if (user) {
      const userCartRef = ref(db, "carts/" + user.uid + "/cart");
      onValue(userCartRef, (snapshot) => {
        const currentCart = snapshot.val();
        dispatch(setItems(currentCart));
      });
    }
  });

  return (
    <>
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
        <ScrollToTop />
      </Container>
      <Footer />
    </>
  );
}

export default App;

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

function App() {
  const dispatch = useDispatch();

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

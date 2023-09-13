import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Container } from "@mui/material";
import Footer from "./components/Footer";
import { onAuthStateChanged } from "@firebase/auth";
import { auth, db } from "./firebase-config";
import { useDispatch } from "react-redux";
import { setUser } from "./store/accountSlice";
import { setItems } from "./store/bagSlice";
import { onValue, ref } from "firebase/database";
import { useEffect } from "react";
import { setShirts } from "./store/shirtsSlice";
import ScrollToTop from "./helpers/ScrollToTop";
import ChangeURL from "./helpers/ChangeURL";

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
  }, [dispatch]);

  onAuthStateChanged(auth, (user) => {
    onValue(ref(db), async (snapshot) => {
      const data = await snapshot.val();
      if (data !== null) {
        const admins = data.admins;
        if (user) {
          const isAdmin =
            admins.filter((adminId) => adminId === user?.uid).length > 0;
          dispatch(
            setUser({
              user: {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
              },
              isAdmin,
            })
          );

          const userBagRef = ref(db, "carts/" + user.uid + "/cart");
          onValue(userBagRef, (snapshot) => {
            const currentBag = snapshot.val();
            dispatch(setItems(currentBag));
          });
        } else {
          dispatch(setUser(null));
        }
      }
    });
  });

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh",
          mt: 8,
        }}
      >
        <Header />
        <Outlet />
        <ScrollToTop />
        <ChangeURL />
      </Container>
      <Footer />
    </>
  );
}

export default App;

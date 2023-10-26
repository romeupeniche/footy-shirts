import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Container } from "@mui/material";
import Footer from "./components/Footer";
import { onAuthStateChanged } from "@firebase/auth";
import { auth, db } from "./firebase-config";
import { useDispatch } from "react-redux";
import { setUser } from "./store/accountSlice";
import { setItems } from "./store/bagSlice";
import { get, onValue, ref } from "firebase/database";
import ScrollToTop from "./helpers/ScrollToTop";
import ChangeURL from "./helpers/ChangeURL";
// import { useDatabaseSnapshot } from "@react-query-firebase/database";
// import { useState } from "react";

function App() {
  const dispatch = useDispatch();
  // const [currentUser, setCurrentUser] = useState(null);
  // const userBagRef = ref(db, "carts/" + currentUser.uid + "/bag");
  // const {data: bagData} = useDatabaseSnapshot(["shirts", "bag"], userBagRef);

  onAuthStateChanged(auth, async (user) => {
    const dataSnapshot = await get(ref(db));
    const data = dataSnapshot.val();

    if (user !== null) {
      const admins = data.admins || [];
      const isAdmin = admins.includes(user?.uid);

      dispatch(
        setUser({
          user: {
            email: user.email,
            uid: user.uid,
          },
          isAdmin,
        })
      );

      // setCurrentUser(user)
      const userBagRef = ref(db, "carts/" + user.uid + "/bag");
      onValue(userBagRef, (snapshot) => {
        const currentBag = snapshot.val();
        dispatch(setItems(currentBag));
      });
    } else {
      dispatch(setUser(null));
    }
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

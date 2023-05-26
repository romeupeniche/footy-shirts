import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Item from "./pages/Item";
import store from "./store";
import { Provider } from "react-redux";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import GenderPage from "./pages/GenderPage";
import SearchPage from "./pages/SearchPage";
import ErrorPage from "./pages/ErrorPage";
import AddNewShirtPage from "./pages/AddNewShirtPage";
import EditShirtPage from "./pages/EditShirtPage/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "men",
        element: <GenderPage />,
      },
      {
        path: "kids",
        element: <GenderPage />,
      },
      {
        path: "women",
        element: <GenderPage />,
      },
      {
        path: ":gender/:id",
        element: <Item />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "edit",
        element: <EditShirtPage />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "add",
        element: <AddNewShirtPage />,
      },
      {
        path: "search/:search",
        element: <SearchPage />,
      },
    ],
  },
]);

const theme = createTheme({
  spacing: 10,
  palette: {
    mode: "dark",
    primary: {
      main: "#646cff",
      dark: "#00009b",
      darker: "#00002b",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);

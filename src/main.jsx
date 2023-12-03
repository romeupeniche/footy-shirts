import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Item from "./pages/Item";
import store from "./store";
import { Provider, useSelector } from "react-redux";
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

function Main() {
  const mode = useSelector((state) => state.account).theme;

  const theme = createTheme({
    spacing: 10,
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            // dark mode settings
            background: {
              default: "#000",
            },
            primary: {
              main: "#3741ff",
              dark: "#00009b",
              darker: "#00002b",
              darkest: "#00000d",
              header: "#272727",
            },
            bg: {
              light: "#111",
              lighter: "#222",
              lightest: "#444",
              gray: "#999",
            },
          }
        : {
            // light mode settings
            background: {
              default: "#fff",
            },
            primary: {
              main: "#3741ff",
              dark: "#00009b",
              darker: "#75b1ff",
              darkest: "#888",
              header: "#c9c9c9",
            },
            bg: {
              light: "#c8c8c8",
              lighter: "#b4b4b4",
              lightest: "#ccc",
              gray: "#999",
            },
          }),
      typography: {
        money: "#3e9c35",
        light: "#ccc",
        ghost: "#888",
      },
      utils: {
        delete: "#ba0c00",
      },
    },
    typography: {
      fontFamily: "'Inter', sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Main />
  </Provider>
);

import Bag from "./pages/Bag";
import Account from "./pages/Account";
import GenderPage, { loader as genderLoader } from "./pages/GenderPage";
import SearchPage from "./pages/SearchPage";
import ErrorPage from "./pages/ErrorPage";
import AddNewShirtPage from "./pages/AddNewShirtPage";
import EditShirtPage from "./pages/EditShirtPage/index.jsx";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Item from "./pages/Item";
import App from "./App.jsx";
import Checkout from "./pages/Checkout";

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
        path: ":gender",
        element: <GenderPage />,
        loader: genderLoader,
      },
      {
        path: ":gender/:id",
        element: <Item />,
      },
      {
        path: "bag",
        element: <Bag />,
      },
      {
        path: "bag/checkout",
        element: <Checkout />,
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

function Root() {
  const theme = createTheme({
    spacing: 10,
    shadows: [
      "none",
      "rgba(55, 65, 255, 0.25) 0px 30px 60px -12px, rgba(0, 0, 155) 0px 18px 36px -18px",
      "rgba(0, 0, 155, 0.15) 48px 0px 100px 0px", // header
      ...Array(20).fill("none"),
    ],
    palette: {
      background: {
        default: "#f6f6f6", // background color (predefined word)
        header: "rgba(246, 246, 246, 0.7)", // header and bagNotification
      },
      primary: {
        main: "#000",
        dark: "#00009b", // hovering buttons
      },
      secondary: {
        main: "#3741ff",
        light: "#75b1ff",
        shade: "rgba(55, 65, 255, 0.25)",
      },
      typography: {
        money: "#3e9c35",
        light: "#b7b7b7",
        ghost: "#888",
        delete: "#ba0c00",
      },
    },
    typography: {
      button: {
        fontWeight: "700",
      },
      fontFamily: "'Inter', sans-serif",
      fontWeightRegular: "700",
      fontWeightMedium: "500",
      fontWeightBold: "800",
      fontWeightLight: "400",
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            color: "#000",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          iconSizeMedium: {
            "& > *:first-of-type": {
              fontSize: "1rem",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow:
              "rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default Root;

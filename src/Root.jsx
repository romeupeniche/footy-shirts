import Cart from "./pages/Cart";
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

function Root() {
  const theme = createTheme({
    spacing: 10,
    shadows: [
      "",
      "rgba(55, 65, 255, 0.25) 0px 30px 60px -12px, rgba(0, 0, 155) 0px 18px 36px -18px",
      "rgba(0, 0, 155, 0.15) 48px 0px 100px 0px", // header
    ],
    palette: {
      // light mode settings
      background: {
        default: "#f6f6f6",
        dark: "#f6f6f6af",
      },
      primary: {
        main: "#000",
        dark: "#00009b",
        darker: "#75b1ff",
        darkest: "#888",
        header: "#f6f6f6",
      },
      secondary: {
        main: "#3741ff",
        shade: "rgba(55, 65, 255, 0.25)",
      },
      bg: {
        main: "#f6f6f6",
        light: "#c8c8c8",
        lighter: "#b4b4b4",
        lightest: "#ccc",
        gray: "#999",
      },
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
            "& > *:first-child": {
              fontSize: "1rem",
            },
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

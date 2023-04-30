import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/index.jsx";
import Women from "./pages/Women/index.jsx";
import Men from "./pages/Men/index.jsx";
import Kids from "./pages/Kids/index.jsx";
import Item from "./pages/Item/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "women",
        element: <Women />,
      },
      {
        path: "women/:id",
        element: <Item />,
      },
      {
        path: "men",
        element: <Men />,
      },
      {
        path: "men/:id",
        element: <Item />,
      },
      {
        path: "kids",
        element: <Kids />,
      },
      {
        path: "kids/:id",
        element: <Item />,
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
  <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);

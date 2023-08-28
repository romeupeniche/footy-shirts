import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  Slide,
  Toolbar,
  useScrollTrigger,
  Link,
} from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux";
import SearchButton from "./Search";
import ResponsiveMenu from "./ResponsiveMenu";

function Header() {
  const path = useLocation().pathname.split("/")[1];

  const trigger = useScrollTrigger();
  const currentUser = useSelector((state) => state.account).user;
  const availablePaths = ["Men", "Women", "Kids"];

  return (
    <>
      <Slide in={!trigger}>
        <AppBar
          sx={{
            boxShadow: 2,
          }}
        >
          <Toolbar
            variant="dense"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              bgcolor: "primary.header",
              minHeight: "56px",
            }}
          >
            <Box
              minWidth={{
                xs: 10,
                md: 180,
              }}
            >
              <Link
                component={RouterLink}
                to="/"
                sx={{
                  color: path === "" ? "secondary.main" : "primary.main",
                }}
              >
                <IconButton edge="start" color="inherit" aria-label="menu">
                  <SportsSoccerIcon />
                </IconButton>
              </Link>
            </Box>
            <List
              sx={{
                display: { md: "flex", xs: "none" },
              }}
            >
              {availablePaths.map((singlePath) => (
                <ListItem key={singlePath}>
                  <Link
                    component={RouterLink}
                    to={`/${singlePath.toLowerCase()}`}
                    sx={{
                      color:
                        path === singlePath.toLowerCase()
                          ? "secondary.main"
                          : "primary.main",
                    }}
                  >
                    {singlePath}
                  </Link>
                </ListItem>
              ))}
            </List>
            <Box
              sx={{
                padding: 0,
                display: { md: "flex", xs: "none" },
                alignItems: "center",
                minWidth: 180,
              }}
            >
              <Link
                component={RouterLink}
                to="/cart"
                sx={{
                  color: path === "cart" ? "secondary.main" : "primary.main",
                }}
              >
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <ShoppingCartIcon />
                </IconButton>
              </Link>
              <SearchButton
                color={path === "search" ? "secondary.main" : "primary.main"}
              />
              <Link
                to="/account"
                component={RouterLink}
                sx={{
                  color: path === "account" ? "secondary.main" : "primary.main",
                }}
              >
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ ml: 2 }}
                >
                  {currentUser.photoURL ? (
                    <Avatar
                      sx={{ width: 24, height: 24 }}
                      src={currentUser.photoURL}
                    />
                  ) : (
                    <PersonIcon />
                  )}
                </IconButton>
              </Link>
            </Box>
            <ResponsiveMenu currentUser={currentUser} />
          </Toolbar>
        </AppBar>
      </Slide>
    </>
  );
}

export default Header;

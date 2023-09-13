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
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux";
import SearchButton from "./Search";
import ResponsiveMenu from "./ResponsiveMenu";
import BagNotification from "./BagNotification";
import PropTypes from "prop-types";

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

function Header(props) {
  const path = useLocation().pathname.split("/")[1];
  const currentUser = useSelector((state) => state.account).user;
  const availablePaths = ["Men", "Women", "Kids"];

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar
          sx={{
            boxShadow: 2,
            bgcolor: "background.header",
            backdropFilter: "blur(5px)",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
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
                to="/bag"
                sx={{
                  color: path === "bag" ? "secondary.main" : "primary.main",
                }}
              >
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <ShoppingBagIcon />
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
      </HideOnScroll>
      <BagNotification />
    </>
  );
}

export default Header;

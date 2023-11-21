import {
  AppBar,
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
import SearchButton from "../SearchInput";
import ResponsiveMenu from "./ResponsiveMenu";
import BagNotification from "./BagNotification";
import PropTypes from "prop-types";
import { useDatabaseSnapshot } from "@react-query-firebase/database";
import { useSelector } from "react-redux";
import { ref } from "firebase/database";
import { db } from "../../firebase-config";
import { useEffect, useState } from "react";

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
  const [currentBag, setCurrentBag] = useState({ items: [] });
  const currentUser = useSelector((state) => state.account).user;
  const userBagRef = ref(db, "carts/" + currentUser.uid);
  const path = useLocation().pathname.split("/")[1];
  const availablePaths = ["Men", "Women", "Kids"];
  const { data, isLoading } = useDatabaseSnapshot(
    ["bag", currentUser],
    userBagRef
  );

  useEffect(() => {
    if (!isLoading && currentUser.uid) {
      setCurrentBag(data.val());
    }
  }, [data, currentUser, isLoading]);

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
              minHeight: "64px",
              px: "30px",
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
                  <PersonIcon />
                </IconButton>
              </Link>
            </Box>
            <ResponsiveMenu currentBag={currentBag} />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <BagNotification />
    </>
  );
}

export default Header;

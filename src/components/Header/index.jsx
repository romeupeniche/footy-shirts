import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
  Link,
} from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link as RouterLink } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import SearchButton from "./Search";
import { useState } from "react";

function Header() {
  const trigger = useScrollTrigger();
  const currentUser = useSelector((state) => state.account).user;
  const currentCart = useSelector((state) => state.cart);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const displayMenuHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenuHandler = (e) => {
    if (e.target.type === "text") {
      return;
    } else {
      setAnchorEl(null);
    }
  };

  const closeMenuWhenDoneSearchHandler = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Slide in={!trigger}>
        <AppBar>
          <Toolbar
            variant="dense"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              bgcolor: "primary.header",
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
                sx={{ color: "primary.main" }}
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
              <ListItem>
                <Link
                  component={RouterLink}
                  to="/men"
                  sx={{ color: "primary.main" }}
                >
                  Men
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  component={RouterLink}
                  to="/women"
                  sx={{ color: "primary.main" }}
                >
                  Women
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  component={RouterLink}
                  to="/kids"
                  sx={{ color: "primary.main" }}
                >
                  Kids
                </Link>
              </ListItem>
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
                sx={{ color: "primary.main" }}
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
              <SearchButton />
              <Link
                to="/account"
                component={RouterLink}
                sx={{ color: "primary.main" }}
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
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ display: { xs: "inline-flex", md: "none" } }}
              onClick={displayMenuHandler}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={closeMenuHandler}
              onClick={closeMenuHandler}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <Link
                component={RouterLink}
                to="/men"
                sx={{ color: "primary.main" }}
              >
                <MenuItem>Men</MenuItem>
              </Link>
              <Link
                component={RouterLink}
                to="/women"
                sx={{ color: "primary.main" }}
              >
                <MenuItem>Women</MenuItem>
              </Link>
              <Link
                component={RouterLink}
                to="/kids"
                sx={{ color: "primary.main" }}
              >
                <MenuItem>Kids</MenuItem>
              </Link>
              <Divider />
              <SearchButton
                closeMenuWhenDoneSearchHandler={closeMenuWhenDoneSearchHandler}
                disableAnimation={true}
              />
              <Link
                to="/cart"
                component={RouterLink}
                sx={{ color: "primary.main" }}
              >
                <MenuItem>
                  <ShoppingCartIcon />{" "}
                  <Typography ml={1.35}>
                    {" "}
                    Cart ({currentCart.items?.length})
                  </Typography>
                </MenuItem>
              </Link>
              <Link
                component={RouterLink}
                to="/account"
                sx={{ color: "primary.main" }}
              >
                <MenuItem>
                  {currentUser.photoURL ? (
                    <Avatar
                      sx={{ width: 24, height: 24 }}
                      src={currentUser.photoURL}
                    />
                  ) : (
                    <PersonIcon />
                  )}{" "}
                  <Typography>Account</Typography>
                </MenuItem>
              </Link>
            </Menu>
          </Toolbar>
        </AppBar>
      </Slide>
    </>
  );
}

export default Header;

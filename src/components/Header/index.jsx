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
} from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
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
            }}
          >
            <Box
              minWidth={{
                xs: 10,
                md: 180,
              }}
            >
              <Link to="/">
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
                <Link to="/men">Men</Link>
              </ListItem>
              <ListItem>
                <Link to="/women">Women</Link>
              </ListItem>
              <ListItem>
                <Link to="/kids">Kids</Link>
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
              <Link to="/cart">
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
              <Link to="/account">
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
              <Link to="/men">
                <MenuItem>Men</MenuItem>
              </Link>
              <Link to="/women">
                <MenuItem>Women</MenuItem>
              </Link>
              <Link to="/kids">
                <MenuItem>Kids</MenuItem>
              </Link>
              <Divider />
              <SearchButton
                closeMenuWhenDoneSearchHandler={closeMenuWhenDoneSearchHandler}
                disableAnimation={true}
              />
              <Link to="/cart">
                <MenuItem>
                  <ShoppingCartIcon />{" "}
                  <Typography ml={1.35}>
                    {" "}
                    Cart ({currentCart.items.length})
                  </Typography>
                </MenuItem>
              </Link>
              <Link to="/account">
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

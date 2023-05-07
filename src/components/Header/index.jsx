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
} from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";

function Header() {
  const trigger = useScrollTrigger();
  const currentUser = useSelector((state) => state.account).user;

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
            <Link to="/">
              <IconButton edge="start" color="inherit" aria-label="menu">
                <SportsSoccerIcon />
              </IconButton>
            </Link>
            <List
              sx={{
                display: "flex",
              }}
            >
              <ListItem
                sx={{
                  ml: {
                    md: 10.5,
                  },
                }}
              >
                <Link to="/men">Men</Link>
              </ListItem>
              <ListItem>
                <Link to="/women">Women</Link>
              </ListItem>
              <ListItem>
                <Link to="/kids">Kids</Link>
              </ListItem>
            </List>
            <Box sx={{ padding: 0, display: { md: "flex", xs: "none" } }}>
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
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <SearchIcon />
              </IconButton>
              <Link to="/account">
                <IconButton edge="start" color="inherit" aria-label="menu">
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
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Slide>
    </>
  );
}

export default Header;

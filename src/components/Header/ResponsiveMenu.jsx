import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Link,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import SearchButton from "./Search";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PersonIcon from "@mui/icons-material/Person";
import PropTypes from "prop-types";

export default function ResponsiveMenu({ currentUser }) {
  const currentBag = useSelector((state) => state.bag);
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
      <IconButton
        aria-label="menu"
        aria-controls="long-menu"
        aria-haspopup="true"
        sx={{
          display: { xs: "", md: "none" },
          color: "primary.main",
        }}
        onClick={displayMenuHandler}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenuHandler}
        onClick={closeMenuHandler}
        getContentAnchorEl={null}
        keepMounted
        disableScrollLock
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "hidden",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "&:before": {
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 1,
            },
          },
        }}
      >
        <Link component={RouterLink} to="/men" sx={{ color: "primary.main" }}>
          <MenuItem>Men</MenuItem>
        </Link>
        <Link component={RouterLink} to="/women" sx={{ color: "primary.main" }}>
          <MenuItem>Women</MenuItem>
        </Link>
        <Link component={RouterLink} to="/kids" sx={{ color: "primary.main" }}>
          <MenuItem>Kids</MenuItem>
        </Link>
        <Divider />
        <SearchButton
          closeMenuWhenDoneSearchHandler={closeMenuWhenDoneSearchHandler}
          disableAnimation
        />
        <Link to="/bag" component={RouterLink} sx={{ color: "primary.main" }}>
          <MenuItem>
            <ShoppingBagIcon />{" "}
            <Typography ml={1.35}> Bag ({currentBag.items?.length})</Typography>
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
                sx={{ width: 24, height: 24, mr: 1 }}
                src={currentUser.photoURL}
              />
            ) : (
              <PersonIcon sx={{ width: 24, height: 24, mr: 1.35 }} />
            )}{" "}
            <Typography>Account</Typography>
          </MenuItem>
        </Link>
      </Menu>
    </>
  );
}

ResponsiveMenu.propTypes = {
  currentUser: {
    photoURL: PropTypes.string,
  },
};

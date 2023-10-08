import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Search = styled("div")(({ theme, isFilter }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  width: isFilter ? "auto" : "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: `${theme.palette.mode === "dark" ? "#fff" : "#000"}`,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "0ch",
      "&:focus": {
        width: "10ch",
      },
    },
  },
}));

const ResponsiveStyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

function SearchButton({
  closeMenuWhenDoneSearchHandler,
  disableAnimation,
  color,
  isFilter = false,
  setInput,
}) {
  const [searchInputValue, setSearchInputValue] = useState("");
  const navigate = useNavigate();

  const setSearchInputValueHandler = (e) => {
    const input = e.target.value;

    if (input.length <= 24 && !input.match(/[^a-zA-Z0-9 ]/g)) {
      setSearchInputValue(input);
      if (isFilter) {
        setInput(input);
      }
    }
  };

  const submitSearchHandler = (e) => {
    e.preventDefault();
    if (searchInputValue.trim().length && !isFilter) {
      navigate(`/search/${searchInputValue}`);
      setSearchInputValue("");
<<<<<<< HEAD:src/components/SearchInput/index.jsx
      closeMenuWhenDoneSearchHandler && closeMenuWhenDoneSearchHandler();
=======
      props.closeMenuWhenDoneSearchHandler &&
        props.closeMenuWhenDoneSearchHandler();
>>>>>>> 399de2e9d7f36096ed398b5be37e6d0332fbe13f:src/components/Header/Search/index.jsx
    }
  };

  return (
    <>
      {disableAnimation ? (
        <>
          <Search isFilter={isFilter}>
            <SearchIconWrapper>
<<<<<<< HEAD:src/components/SearchInput/index.jsx
              <SearchIcon sx={{ color: color }} />
=======
              <SearchIcon sx={{ color: props.color }} />
>>>>>>> 399de2e9d7f36096ed398b5be37e6d0332fbe13f:src/components/Header/Search/index.jsx
            </SearchIconWrapper>
            <form onSubmit={submitSearchHandler}>
              <ResponsiveStyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchInputValue}
                onChange={setSearchInputValueHandler}
              />
            </form>
          </Search>
        </>
      ) : (
        <>
          <Search>
            <SearchIconWrapper>
<<<<<<< HEAD:src/components/SearchInput/index.jsx
              <SearchIcon sx={{ color: color }} />
=======
              <SearchIcon sx={{ color: props.color }} />
>>>>>>> 399de2e9d7f36096ed398b5be37e6d0332fbe13f:src/components/Header/Search/index.jsx
            </SearchIconWrapper>
            <form onSubmit={submitSearchHandler}>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchInputValue}
                onChange={setSearchInputValueHandler}
              />
            </form>
          </Search>
        </>
      )}
    </>
  );
}

export default SearchButton;

SearchButton.propTypes = {
  disableAnimation: PropTypes.bool,
  color: PropTypes.string.isRequired,
  closeMenuWhenDoneSearchHandler: PropTypes.func,
<<<<<<< HEAD:src/components/SearchInput/index.jsx
  isFilter: PropTypes.bool,
  setInput: PropTypes.func,
=======
>>>>>>> 399de2e9d7f36096ed398b5be37e6d0332fbe13f:src/components/Header/Search/index.jsx
};

import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  width: "100%",
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
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
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

function SearchButton(props) {
  const [searchInputValue, setSearchInputValue] = useState("");
  const navigate = useNavigate();

  const setSearchInputValueHandler = (e) => {
    const input = e.target.value;

    if (input.length <= 24 && !input.match(/[^a-zA-Z0-9 ]/g)) {
      setSearchInputValue(input);
    }
  };

  const submitSearchHandler = (e) => {
    e.preventDefault();
    if (searchInputValue.trim().length) {
      navigate(`/search/${searchInputValue}`);
      setSearchInputValue("");
      props?.closeMenuWhenDoneSearchHandler();
    }
  };

  return (
    <>
      {props.disableAnimation ? (
        <>
          <Search>
            <SearchIconWrapper>
              <SearchIcon color="primary" />
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
              <SearchIcon color="primary" />
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

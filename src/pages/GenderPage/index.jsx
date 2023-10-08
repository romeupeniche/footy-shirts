import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import Filter from "../../components/Filter";
import Card from "../../components/Card";
<<<<<<< HEAD
import SearchButton from "../../components/SearchInput";
=======
>>>>>>> 399de2e9d7f36096ed398b5be37e6d0332fbe13f

function GenderPage() {
  const gender = useLoaderData();
  const currentShirts = useSelector((state) => state.shirts);
  const isAdmin = useSelector((state) => state.account.isAdmin);
  const [genderShirts, setGenderShirts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const capitalizedGender = gender.charAt(0).toUpperCase() + gender.slice(1);
<<<<<<< HEAD
  const [searchInput, setSearchInput] = useState("");
=======
>>>>>>> 399de2e9d7f36096ed398b5be37e6d0332fbe13f

  const [selectedOptions, setSelectedOptions] = useState([]);
  const filterOptions = [
    { name: "Small", value: "S" },
    { name: "Medium", value: "M" },
    { name: "Large", value: "L" },
    { name: "Extra Large", value: "XL" },
  ];

  useLayoutEffect(() => {
    setIsLoading(true);
    let filteredByNameShirts = [];
    if (Object.keys(currentShirts.shirts).length) {
      const shirts = currentShirts.shirts[gender];
      const loadedShirts = Object.keys(shirts).map(
        (shirtTitle) => shirts[shirtTitle]
      );
      if (searchInput.length > 2) {
        for (let i in loadedShirts) {
          if (
            loadedShirts[i].name
              .toLowerCase()
              .includes(searchInput.toLowerCase()) ||
            loadedShirts[i].commonTypos
              .toLowerCase()
              .includes(searchInput.toLowerCase())
          ) {
            filteredByNameShirts.push({ ...loadedShirts[i], gender });
            // setGenderShirts((prev) => [
            //   ...prev,
            //   { ...loadedShirts[i], gender },
            // ]);
          }
        }
        setGenderShirts(filteredByNameShirts);
      } else {
        setGenderShirts(loadedShirts);
      }
    }
    setIsLoading(false);
  }, [gender, currentShirts, searchInput]);

  const filteredShirts =
    selectedOptions.length === 0
      ? genderShirts
      : genderShirts.filter((shirt) =>
          selectedOptions.every((size) => shirt.sizes[size])
        );

  let fallbackText =
    "No shirts are currently available. Check back later for more selections.";
  if (selectedOptions.length > 0 && searchInput.length > 2) {
    fallbackText =
      "The selected size(s) have no available shirts in your search. Try different sizes or refine your search for other options.";
  } else if (selectedOptions.length > 0 && !(searchInput.length > 2)) {
    fallbackText =
      "No shirts are available in the selected size(s). Please explore other options.";
  } else {
    fallbackText =
      "No shirts found for this search. Refine criteria for more options.";
  }

  const filteredShirts =
    selectedOptions.length === 0
      ? genderShirts
      : genderShirts.filter((shirt) =>
          selectedOptions.every((size) => shirt.sizes[size])
        );

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h2" sx={{ mt: 5 }} fontWeight={500}>
            {capitalizedGender}
            {`'`}s Jerseys
          </Typography>
<<<<<<< HEAD
          <Typography variant="h6" sx={{ ml: 1, mb: 5 }}>
            /{gender}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "space-between" },
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <SearchButton isFilter setInput={setSearchInput} disableAnimation />
=======
          <Typography variant="h6" sx={{ ml: 1, mb: 10 }}>
            /{gender}
          </Typography>
        </Box>
        <Box sx={{ alignSelf: "flex-end" }}>
>>>>>>> 399de2e9d7f36096ed398b5be37e6d0332fbe13f
          <Filter
            options={filterOptions}
            label="Filter By Size"
            onSelectOptions={setSelectedOptions}
          />
        </Box>
      </Box>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid
          container
          justifyContent="center"
          rowSpacing={4}
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 6, md: 12 }}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {filteredShirts.length > 0 ? (
            filteredShirts.map((shirt) => {
              return <Card key={shirt.id} shirt={shirt} />;
            })
          ) : (
<<<<<<< HEAD
            <Typography mt={10}>{fallbackText}</Typography>
=======
            <Typography mt={10}>
              {selectedOptions.length > 0
                ? "No shirts are available in the selected size(s). Please explore other options."
                : "No shirts are currently available. Check back later for more selections."}
            </Typography>
>>>>>>> 399de2e9d7f36096ed398b5be37e6d0332fbe13f
          )}
          {isAdmin && <Card newItemCard={true} />}
        </Grid>
      )}
    </Container>
  );
}

export default GenderPage;

export function loader({ params }) {
  const gender = params.gender;
  if (gender !== "men" && gender !== "women" && gender !== "kids") {
    throw new Response("Not Found", { status: 404 });
  }

  return gender;
}

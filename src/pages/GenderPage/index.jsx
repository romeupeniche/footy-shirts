import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import Filter from "../../components/Filter";
import Card from "../../components/Card";
import SearchButton from "../../components/SearchInput";
import { ref } from "firebase/database";
import { db } from "../../firebase-config";
import { useDatabaseSnapshot } from "@react-query-firebase/database";

function GenderPage() {
  const gender = useLoaderData();
  const dbRef = ref(db, "shirts/" + gender);
  const { data, isLoading } = useDatabaseSnapshot(["shirts", gender], dbRef);
  const isAdmin = useSelector((state) => state.account.isAdmin);
  const [genderShirts, setGenderShirts] = useState([]);
  const capitalizedGender = gender.charAt(0).toUpperCase() + gender.slice(1);
  const [searchInput, setSearchInput] = useState("");

  const [selectedOptions, setSelectedOptions] = useState([]);
  const filterOptions = [
    { name: "Small", value: "S" },
    { name: "Medium", value: "M" },
    { name: "Large", value: "L" },
    { name: "Extra Large", value: "XL" },
  ];

  useLayoutEffect(() => {
    if (!isLoading) {
      const loadedShirts = [];
      data.forEach((snap) => {
        loadedShirts.push(snap.val());
      });

      const filteredByNameShirts = [];
      if (searchInput.length > 2) {
        loadedShirts.forEach((shirt) => {
          if (
            shirt.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            shirt.commonTypos.toLowerCase().includes(searchInput.toLowerCase())
          ) {
            filteredByNameShirts.push({ ...shirt, gender });
          }
        });
      } else {
        filteredByNameShirts.push(...loadedShirts);
      }

      setGenderShirts(filteredByNameShirts);
    }
  }, [gender, data, searchInput, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      const loadedShirts = [];
      data.forEach((snap) => {
        loadedShirts.push(snap.val());
      });
    }
  }, [data, isLoading]);

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
          <Filter
            options={filterOptions}
            label="Filter By Size"
            onSelectOptions={setSelectedOptions}
          />
        </Box>
      </Box>
      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={8}>
          <CircularProgress />
        </Box>
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
            <Typography mt={10}>{fallbackText}</Typography>
          )}
          {isAdmin && <Card newItemCard={true} gender={gender} />}
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

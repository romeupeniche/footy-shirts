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

function GenderPage() {
  const gender = useLoaderData();
  const currentShirts = useSelector((state) => state.shirts);
  const isAdmin = useSelector((state) => state.account.isAdmin);
  const [genderShirts, setGenderShirts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const capitalizedGender = gender.charAt(0).toUpperCase() + gender.slice(1);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const filterOptions = [
    { name: "Small", value: "S" },
    { name: "Medium", value: "M" },
    { name: "Large", value: "L" },
    { name: "Extra Large", value: "XL" },
  ];

  useLayoutEffect(() => {
    setIsLoading(true);
    if (Object.keys(currentShirts.shirts).length) {
      const shirts = currentShirts.shirts[gender];
      const loadedShirts = Object.keys(shirts).map(
        (shirtTitle) => shirts[shirtTitle]
      );
      setGenderShirts(loadedShirts);
    }
    setIsLoading(false);
  }, [gender, currentShirts]);

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
          <Typography variant="h6" sx={{ ml: 1, mb: 10 }}>
            /{gender}
          </Typography>
        </Box>
        <Box sx={{ alignSelf: "flex-end" }}>
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
            <Typography mt={10}>
              {selectedOptions.length > 0
                ? "No shirts are available in the selected size(s). Please explore other options."
                : "No shirts are currently available. Check back later for more selections."}
            </Typography>
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

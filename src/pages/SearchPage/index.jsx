import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/Card";
import { db } from "../../firebase-config";
import { ref } from "firebase/database";
import { useDatabaseSnapshot } from "@react-query-firebase/database";
import SkeletonCard from "../../components/SkeletonCard";

function SearchPage() {
  const dbRef = ref(db, "shirts");
  const [pageIsLoading, setPageIsLoading] = useState(true);
  const { data, isLoading } = useDatabaseSnapshot(["shirts"], dbRef);
  const search = useParams().search;
  const [foundItems, setFoundItems] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      const loadedShirts = [];
      data.forEach((snap) => {
        loadedShirts.push({ shirts: snap.val(), gender: snap.key });
      });
      const foundShirts = [];
      loadedShirts.forEach((genderObj) => {
        const gender = genderObj.gender;
        for (let shirtId in genderObj.shirts) {
          if (
            genderObj.shirts[shirtId].name
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            genderObj.shirts[shirtId].commonTypos
              .toLowerCase()
              .includes(search.toLowerCase())
          ) {
            foundShirts.push({ ...genderObj.shirts[shirtId], gender });
          }
        }
      });
      setFoundItems(foundShirts);
    }
  }, [data, isLoading, search]);

  useEffect(() => {
    const onPageLoad = () => {
      setPageIsLoading(false);
    };

    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad, false);
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);

  return (
    <>
      <Typography variant="h3" mt={2} maxWidth="80vw">
        Showing results for: &quot;
        <Typography component="span" variant="h3" color="secondary">
          {search}
        </Typography>
        &quot;
      </Typography>
      <Grid
        container
        justifyContent="center"
        rowSpacing={4}
        mt={2}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 6, md: 12 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {isLoading || pageIsLoading ? (
          [1, 2, 3, 4, 5, 6].map((i) => {
            return <SkeletonCard key={i} />;
          })
        ) : (
          <>
            {foundItems.length ? (
              foundItems.map((shirt) => {
                return (
                  <Card key={shirt.id} shirt={shirt} gender={shirt.gender} />
                );
              })
            ) : (
              <Typography mt={10} variant="h5" mb={30}>
                No items were found.{" "}
                {search.length > 15
                  ? "Try being less especific."
                  : "Check if there's a typo."}
              </Typography>
            )}
          </>
        )}
      </Grid>
    </>
  );
}

export default SearchPage;

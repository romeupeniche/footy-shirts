import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Hero from "./components/Hero";
import NewReleases from "./components/NewReleases";
import GetSize from "./components/GetSize";
import GettingShirtInfo from "./components/GettingShirtInfo";
import { Container } from "@mui/material";
import CustomerReviews from "./components/CustomerReviews";
import Faq from "./components/Faq";

function Home() {
  const [newShirts, setNewShirts] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const currentShirts = useSelector((state) => state.shirts);

  useEffect(() => {
    setIsPageLoading(true);
    if (Object.keys(currentShirts.shirts).length) {
      setIsPageLoading(false);
      const shirts = currentShirts.shirts;
      let genderTitles = Object.keys(shirts);
      let firstKidsShirt = shirts.kids[Object.keys(shirts.kids)[0]];
      let firstMenShirt = shirts.men[Object.keys(shirts.men)[0]];
      let firstWomenShirt = shirts.women[Object.keys(shirts.women)[0]];

      setNewShirts([
        { ...firstKidsShirt, gender: genderTitles[0] },
        { ...firstMenShirt, gender: genderTitles[1] },
        { ...firstWomenShirt, gender: genderTitles[2] },
      ]);
    }
  }, [currentShirts]);
  return (
    <Container maxWidth="xl">
      <Hero newShirts={newShirts} />
      <NewReleases newShirts={newShirts} isLoading={isPageLoading} />
      <GetSize />
      <GettingShirtInfo />
      <CustomerReviews />
      <Faq />
    </Container>
  );
}

export default Home;

import Hero from "./components/Hero";
import NewReleases from "./components/NewReleases";
import GetSize from "./components/GetSize";
import GettingShirtInfo from "./components/GettingShirtInfo";
import { Container } from "@mui/material";
import CustomerReviews from "./components/CustomerReviews";
import Faq from "./components/Faq";

function Home() {
  return (
    <Container maxWidth="xl">
      <Hero />
      <NewReleases />
      <GetSize />
      <GettingShirtInfo />
      <CustomerReviews />
      <Faq />
    </Container>
  );
}

export default Home;

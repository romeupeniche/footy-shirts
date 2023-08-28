import { Box, Container, Typography } from "@mui/material";
import ibra from "../../../../assets/ibra.jpg";
import neymar from "../../../../assets/neymar.jpg";
import CustomerQuotation from "./CustomerQuotation";

function CustomerReviews() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        my: { xs: 40, md: 0 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          width: 600,
        }}
      >
        <Typography variant="h3" fontSize="1.5rem" fontWeight="light">
          Loved by Fans
        </Typography>
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{ fontSize: { xs: "2.5rem", sm: "3rem" } }}
        >
          Customer Reviews
        </Typography>
        <Typography
          mt={2}
          color="typography.ghost"
          sx={{ width: { xs: 300, md: "fit-content" } }}
        >
          Explore how our fellow fans feel about our jerseys. Dive into their
          stories of satisfaction and find out why they can&apos;t wait to share
          their jersey experiences with you.
        </Typography>
        <Box
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            width: 1000,
          }}
        >
          <CustomerQuotation
            quotation="We got soccer jerseys from this store - an incredible experience! Ordering was simple, and prices were very fair."
            location="Osasco, SP - Brazil"
            img={ibra}
            name="Ibrahi Mović"
          />
          <CustomerQuotation
            quotation="Jerseys were top-notch, enhancing our matches. Highly recommend this store for sports enthusiasts!"
            location="Serrinha, BA - Brazil"
            img={neymar}
            name="Ney Marjunior"
          />
        </Box>
      </Box>
    </Container>
  );
}

export default CustomerReviews;

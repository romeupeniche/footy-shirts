import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ErrorIcon from "@mui/icons-material/Error";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import StraightenIcon from "@mui/icons-material/Straighten";
import { useState } from "react";
import { Container, ListItem, Typography } from "@mui/material";

const QA = [
  {
    question: "Are the jersey sizes true to standard measurements?",
    answer:
      "Yes, our jersey sizes follow standard measurements. Refer to our size guide for accurate measurements and fitting information.",
    icon: <StraightenIcon sx={{ color: "secondary.main" }} />,
  },
  {
    question: "How much time should I expect for the delivery of my order?",
    answer:
      "Shipping times vary based on your location. We provide estimated delivery times during checkout for each shipping option.",
    icon: <LocalShippingIcon sx={{ color: "secondary.main" }} />,
  },
  {
    question: "Are the jerseys authentic and officially licensed?",
    answer:
      "Yes, our jerseys are sourced from reputable manufacturers and are officially licensed products of their respective teams and brands.",
    icon: <VerifiedIcon sx={{ color: "secondary.main" }} />,
  },
  {
    question: "What if I have a problem with my order or need assistance?",
    answer:
      "Our dedicated customer support team is available 24/7 to help you with any inquiries, issues, or assistance you may need.",
    icon: <ErrorIcon sx={{ color: "secondary.main" }} />,
  },
];

function Faq() {
  const [open, setOpen] = useState(null);

  const handleClick = (index) => {
    if (open === index) {
      setOpen(null);
    } else {
      setOpen(index);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        my: { xs: 20, sm: 0 },
      }}
    >
      <Typography variant="h6" textAlign="center">
        FAQ
      </Typography>
      <Typography
        variant="h3"
        fontWeight="bold"
        textAlign="center"
        sx={{ mb: 1 }}
      >
        Frequently Asked Questions
      </Typography>
      <Typography
        fontSize="1rem"
        color="typography.ghost"
        textAlign="center"
        sx={{ mb: 5, width: { xs: 400, sm: 500 } }}
      >
        Discover Answers to Common Questions About Ordering Soccer Jerseys:
        Clearing Up Your Doubts and Providing Useful Information.
      </Typography>

      <List
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
          gap: "1rem",
        }}
        component="nav"
      >
        {QA.map(({ question, answer, icon }, index) => (
          <ListItem
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ListItemButton onClick={() => handleClick(index)}>
              <ListItemIcon>{icon}</ListItemIcon>
              <Typography fontSize="1.1rem">{question}</Typography>
              {open === index ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open === index} timeout="auto" unmountOnExit>
              <List component="div" sx={{ pl: 4 }}>
                <Typography>{answer}</Typography>
              </List>
            </Collapse>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Faq;

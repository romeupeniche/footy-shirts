import {
  Box,
  Container,
  IconButton,
  List,
  ListItem,
  Typography,
  Link as MUILink,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Footer() {
  const footerLinks = [
    { title: "About Us", links: ["Contact", "Careers", "News"] },
    { title: "About Us2", links: ["Contact", "Careers", "News"] },
    { title: "About Us3", links: ["Contact", "Careers", "News"] },
  ];

  return (
    <Box
      sx={{
        borderRadius: 2,
        bgcolor: "#111",
        mt: 5,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          pt: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        Footy Shirts
      </Typography>
      <Container sx={{ display: "flex", justifyContent: "space-between" }}>
        <List sx={{ display: "flex" }}>
          {footerLinks.map((item) => {
            return (
              <List key={item.title} sx={{ mx: 1 }}>
                <ListItem>{item.title}</ListItem>
                {item.links.map((link) => {
                  return (
                    <ListItem
                      key={link}
                      sx={{ color: "#999", fontSize: ".8rem" }}
                    >
                      <MUILink
                        underline="none"
                        sx={{ color: "#999", cursor: "pointer" }}
                      >
                        {link}
                      </MUILink>
                    </ListItem>
                  );
                })}
              </List>
            );
          })}
        </List>
        <List sx={{ my: 1.5 }}>
          <IconButton sx={{ mx: "5px" }}>
            <YouTubeIcon sx={{ fontSize: "2rem" }} />
          </IconButton>
          <IconButton sx={{ mx: "5px" }}>
            <InstagramIcon sx={{ fontSize: "2rem" }} />
          </IconButton>
          <IconButton sx={{ mx: "5px" }}>
            <FacebookIcon sx={{ fontSize: "2rem" }} />
          </IconButton>
          <IconButton sx={{ mx: "5px" }}>
            <TwitterIcon sx={{ fontSize: "2rem" }} />
          </IconButton>
        </List>
      </Container>
    </Box>
  );
}

export default Footer;

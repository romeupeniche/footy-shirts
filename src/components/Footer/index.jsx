import {
  Box,
  IconButton,
  Typography,
  Link as MUILink,
  TextField,
  Button,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { styled } from "@mui/material/styles";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  margin: "0 5px",
  color: theme.palette.primary.main,
  "&:hover": {
    color: theme.palette.secondary.main,
  },
}));

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderRadius: 2,
        boxShadow: 2,
        mt: 5,
        pb: 5,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          pt: 5,
          mb: 2,
          textAlign: "center",
        }}
      >
        Footy Shirts
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", lg: "space-around" },
          alignItems: { xs: "center", lg: "stretch" },
          flexDirection: { xs: "column", lg: "row" },
          overflowX: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 300,
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              width: 500,
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            ABOUT US
          </Typography>
          <MUILink
            underline="none"
            sx={{
              color: "bg.gray",
              cursor: "pointer",
              fontWeight: "light",
              mt: 1,
            }}
          >
            Careers
          </MUILink>
          <MUILink
            underline="none"
            sx={{
              color: "bg.gray",
              cursor: "pointer",
              fontWeight: "light",
              mt: 1,
            }}
          >
            News
          </MUILink>
          <MUILink
            underline="none"
            sx={{
              color: "bg.gray",
              cursor: "pointer",
              fontWeight: "light",
              mt: 1,
            }}
          >
            Blog
          </MUILink>
          <MUILink
            underline="none"
            sx={{
              color: "bg.gray",
              cursor: "pointer",
              fontWeight: "light",
              mt: 1,
            }}
          >
            How we work
          </MUILink>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            my: 1,
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              width: { xs: 350, md: 500 },
              color: "typography.ghost",
            }}
          >
            Browse through our extensive collection of soccer jerseys for all
            your fandom needs. We have the perfect jerseys to match your style.
          </Typography>
          <Typography
            sx={{
              display: "flex",
              width: 500,
              my: 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PhoneIcon sx={{ mr: 1 }} /> (123) 456-789
          </Typography>
          <Typography
            sx={{
              display: "flex",
              width: 500,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <EmailIcon sx={{ mr: 1 }} /> footyshirts@email.com
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
            }}
          >
            <StyledIconButton>
              <YouTubeIcon sx={{ fontSize: "2rem" }} />
            </StyledIconButton>
            <StyledIconButton>
              <InstagramIcon sx={{ fontSize: "2rem" }} />
            </StyledIconButton>
            <StyledIconButton>
              <FacebookIcon sx={{ fontSize: "2rem" }} />
            </StyledIconButton>
            <StyledIconButton>
              <TwitterIcon sx={{ fontSize: "2rem" }} />
            </StyledIconButton>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 300,
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              width: 500,
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            NEWSLETTER
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "light",
              width: 300,
            }}
          >
            Stay updated with our newsletter for the latest jersey releases and
            news.
          </Typography>
          <Box sx={{ width: 250 }}>
            <TextField
              sx={{ my: 1 }}
              label="Enter Email Address"
              placeholder="john@doe.com"
              type="email"
            />
            <Button variant="outlined" sx={{ width: "100%" }}>
              Subscribe
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;

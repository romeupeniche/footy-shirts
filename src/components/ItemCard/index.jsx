import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import ZoomableImage from "../ZoomableImage";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const defaultImg1 =
  "https://i.pinimg.com/originals/e6/38/19/e638193bdac6bd30429e2a2c0271ba57.jpg";
const defaultImg2 =
  "https://i.pinimg.com/474x/e6/38/19/e638193bdac6bd30429e2a2c0271ba57.jpg";

function ItemCard({ itemCardProps }) {
  const defaultShirt = {
    imgs: [defaultImg1, defaultImg2],
    name: "No Name",
    price: "0",
    sizes: {
      sizeS: false,
      sizeM: false,
      sizeL: false,
      sizeXL: false,
    },
    gender: "No Gender",
  };
  const img1 =
    itemCardProps?.imgs[0].length > 0 ? itemCardProps?.imgs[0] : defaultImg1;
  const img2 =
    itemCardProps?.imgs[1].length > 0 ? itemCardProps?.imgs[1] : defaultImg2;
  const name =
    itemCardProps?.name.length > 0 ? itemCardProps?.name : defaultShirt.name;
  const gender =
    itemCardProps?.gender?.length > 0
      ? itemCardProps?.gender.charAt(0).toUpperCase() +
        itemCardProps?.gender.slice(1)
      : defaultShirt.gender.charAt(0).toUpperCase() +
        defaultShirt.gender.slice(1);
  const price =
    itemCardProps?.price.toString().length > 0
      ? itemCardProps?.price.toString()
      : defaultShirt.price;
  const [shirtImg, setShirtImg] = useState(img1);
  const [capitalizedGender, setCapitalizedGender] = useState("No Gender");
  const [shirt, setShirt] = useState(defaultShirt);

  useEffect(() => {
    setShirt({
      name,
      imgs: [img1, img2],
      price,
      sizes: itemCardProps?.sizes,
    });
    setCapitalizedGender(gender);
  }, [img1, img2, name, price, gender, itemCardProps]);

  return (
    <>
      <Container maxWidth="md">
        <Typography mb={2} fontWeight={500} color="secondary.main">
          Preview:
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: { xs: "column", lg: "row" },
            border: "2px dashed",
            borderColor: "secondary.main",
            borderRadius: 10,
            p: 2,
          }}
        >
          <Box
            sx={{
              width: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column-reverse",
            }}
          >
            <RadioGroup
              defaultValue="0"
              sx={{
                flexDirection: "row",
                mt: 4,
              }}
            >
              {shirt.imgs.map((img, i) => {
                return (
                  <FormControlLabel
                    key={i}
                    sx={{ height: "45px", mb: 5 }}
                    control={
                      <Box
                        component="img"
                        sx={{
                          transition: "400ms",
                          boxShadow: shirtImg === img ? 1 : 0,
                          borderRadius: 5,
                        }}
                        onMouseOver={() => setShirtImg(img)}
                        width={80}
                        src={img}
                      />
                    }
                  />
                );
              })}
            </RadioGroup>
            <ZoomableImage
              src={shirtImg}
              alt={shirt.name}
              sx={{ width: "auto", height: 400 }}
            />
          </Box>
          <Box
            sx={{
              minHeight: "60vh",
              mt: {
                xs: 4,
                md: 0,
              },
              width: {
                xs: "100%",
                md: 300,
              },
              borderRadius: 5,
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box width="inherit">
              <Box display="flex">
                <Typography variant="h4" fontWeight={500} sx={{ mt: 3 }}>
                  {shirt.name}
                </Typography>
              </Box>
              <Typography fontWeight={400}>
                {capitalizedGender}&apos;s Nike Dri-FIT ADV Football Shirt
              </Typography>
              <Typography variant="h5" sx={{ mt: 2 }} fontWeight={400}>
                ${shirt.price}
              </Typography>
            </Box>
            <Box width="100%">
              <Typography sx={{ mt: 6 }}>Sizes:</Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <RadioGroup row>
                  {["sizeS", "sizeM", "sizeL", "sizeXL"].map((size) => {
                    const trimmedSize = size.replace("size", "");
                    return (
                      <FormControlLabel
                        key={size}
                        value={shirt.sizes[size] ? size : "disabled"}
                        disabled={!shirt.sizes[size]}
                        control={<Radio />}
                        label={trimmedSize}
                      />
                    );
                  })}
                </RadioGroup>
              </Box>
            </Box>
            <Button
              variant="contained"
              sx={{
                mb: 3,
                borderRadius: 5,
                fontSize: "1.3rem",
                width: {
                  xs: "90%",
                  md: "inherit",
                },
              }}
            >
              Add To Bag
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default ItemCard;

ItemCard.propTypes = {
  itemCardProps: PropTypes.shape({
    imgs: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    gender: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    sizes: PropTypes.shape({
      sizeS: PropTypes.bool,
      sizeM: PropTypes.bool,
      sizeL: PropTypes.bool,
      sizeXL: PropTypes.bool,
    }),
  }),
};

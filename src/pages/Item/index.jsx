import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { db } from "../../firebase-config";
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  ImageList,
  ImageListItem,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addItem } from "../../store/cartSlice";

function Item() {
  const [shirt, setShirt] = useState(null);
  const [img, setImg] = useState(null);
  const [size, setSize] = useState(null);
  const url = useLocation().pathname;
  const page = url.split("/")[1];
  const id = useParams().id;
  const dispatch = useDispatch();

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        let shirtsList = data.shirts[page];
        for (let team in shirtsList) {
          if (shirtsList[team].id == id) {
            setShirt(shirtsList[team]);
            setImg(shirtsList[team].imgs[0]);
          }
        }
      }
    });
  }, [page, id]);

  // console.log(shirt);

  const changeImg = (e) => {
    const i = e.target.value;
    setImg(shirt.imgs[i]);
  };

  const setSizeHandler = (e) => {
    const value = e.target.value;
    if (value) {
      setSize(value);
    }
  };

  const addToCartHandler = () => {
    const item = {
      id: page + id + size,
      name: shirt.name,
      price: shirt.price,
      img: shirt.imgs[0],
      size,
    };
    dispatch(addItem(item));
  };

  return (
    <>
      {shirt && (
        <>
          <Typography variant="h3" sx={{ mb: 5 }}>
            {page.toUpperCase()}
          </Typography>
          <Container key={shirt.id}>
            <ImageList
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
              }}
            >
              <ImageListItem
                sx={{
                  width: 400,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  defaultValue="0"
                  sx={{ ml: 1 }}
                >
                  <FormControlLabel
                    value="0"
                    sx={{ height: "45px" }}
                    control={<Radio />}
                    onChange={changeImg}
                  />
                  <FormControlLabel
                    value="1"
                    sx={{ height: "45px" }}
                    control={<Radio />}
                    onChange={changeImg}
                  />
                </RadioGroup>
                <img src={img} style={{ borderRadius: "20px" }} />
              </ImageListItem>
              <Box
                sx={{
                  bgcolor: "#111",
                  minHeight: "60vh",
                  mt: {
                    xs: 4,
                    md: 0,
                  },
                  width: {
                    xs: "80vw",
                    md: 500,
                  },
                  borderRadius: 5,
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h4" sx={{ mt: 3, ml: 2 }}>
                  {shirt.name}
                </Typography>
                <Typography color="green" variant="h5">
                  ${shirt.price}
                </Typography>
                <Typography sx={{ mt: 6 }}>Sizes:</Typography>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value={shirt.sizes.S ? "s" : "disabled"}
                    disabled={!shirt.sizes.S}
                    control={<Radio />}
                    onClick={setSizeHandler}
                    label="S"
                  />
                  <FormControlLabel
                    value={shirt.sizes.M ? "m" : "disabled"}
                    disabled={!shirt.sizes.M}
                    control={<Radio />}
                    onClick={setSizeHandler}
                    label="M"
                  />
                  <FormControlLabel
                    value={shirt.sizes.L ? "l" : "disabled"}
                    disabled={!shirt.sizes.L}
                    control={<Radio />}
                    onClick={setSizeHandler}
                    label="L"
                  />
                  <FormControlLabel
                    value={shirt.sizes.XL ? "xl" : "disabled"}
                    disabled={!shirt.sizes.XL}
                    control={<Radio />}
                    onClick={setSizeHandler}
                    label="XL"
                  />
                </RadioGroup>
                <Button
                  variant="contained"
                  sx={{
                    mb: 3,
                    borderRadius: 5,
                    fontSize: "1.3rem",
                    width: 400,
                  }}
                  disabled={!size}
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </Button>
              </Box>
            </ImageList>
          </Container>
        </>
      )}
    </>
  );
}

export default Item;

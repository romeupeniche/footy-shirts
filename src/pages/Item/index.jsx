import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  Modal,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../store/cartSlice";
import { changeURLWithShirtTitle } from "../../helpers/ChangeURL";
import { ref, remove } from "firebase/database";
import { db } from "../../firebase-config";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
};

function Item() {
  const currentShirts = useSelector((state) => state.shirts);
  const isAdmin = useSelector((state) => state.account.isAdmin);
  const [shirt, setShirt] = useState(null);
  const [img, setImg] = useState(null);
  const [size, setSize] = useState(null);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const gender = useParams().gender;
  const id = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentShirts !== null) {
      let shirtsList = currentShirts.shirts[gender];
      for (let team in shirtsList) {
        if (shirtsList[team].id === id) {
          setShirt(shirtsList[team]);
          setImg(shirtsList[team].imgs[0]);
          changeURLWithShirtTitle(shirtsList[team].name);
        }
      }
    }
  }, [gender, id, currentShirts]);

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

  const addToCartHandler = async () => {
    const item = {
      id,
      gender,
      quantity: 1,
      totalPrice: shirt.price,
      name: shirt.name,
      price: shirt.price,
      img: shirt.imgs[0],
      size,
    };
    dispatch(addItem(item));
  };

  const editHandler = () => {
    navigate("/edit", {
      state: {
        currentGender: gender,
        item: shirt,
      },
    });
  };

  const deleteHandler = () => {
    remove(ref(db, `/shirts/${gender}/${shirt.id}`));
    closeConfirmDeleteModalHandler();
    navigate(`/${gender}`);
  };

  const setIsConfirmDeleteModalOpenHandler = () => {
    setIsConfirmDeleteModalOpen(true);
  };

  const closeConfirmDeleteModalHandler = () => {
    setIsConfirmDeleteModalOpen(false);
  };

  return (
    <>
      {shirt && (
        <>
          <Typography variant="h3" sx={{ mb: 5 }}>
            {gender.toUpperCase()}
          </Typography>
          <Container>
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
                  width: {
                    xs: 300,
                    md: 400,
                  },
                  display: "flex",
                  flexDirection: {
                    xs: "column-reverse",
                    md: "row",
                  },
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
                <img
                  src={img}
                  style={{ borderRadius: "20px", width: "100%" }}
                />
              </ImageListItem>
              <Box
                sx={{
                  bgcolor: "bg.light",
                  minHeight: "60vh",
                  mt: {
                    xs: 4,
                    md: 0,
                  },
                  width: {
                    xs: "100%",
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
                    width: {
                      xs: "90%",
                      md: 400,
                    },
                  }}
                  disabled={!size}
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </Button>
                {isAdmin && (
                  <Box
                    sx={{
                      bgcolor: "primary.darker",
                      width: "90%",
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      py: 1,
                      borderRadius: 5,
                    }}
                  >
                    <Button variant="outlined" onClick={editHandler}>
                      Edit
                    </Button>
                    <Button
                      color="error"
                      variant="outlined"
                      onClick={setIsConfirmDeleteModalOpenHandler}
                    >
                      Delete
                    </Button>
                  </Box>
                )}
              </Box>
            </ImageList>
            <Modal
              open={isConfirmDeleteModalOpen}
              onClose={closeConfirmDeleteModalHandler}
            >
              <Box sx={modalStyle}>
                <Typography variant="h6" component="h2">
                  Are you sure you want to{" "}
                  <Box component="span" sx={{ color: "utils.delete" }}>
                    DELETE
                  </Box>{" "}
                  this item?
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "100%",
                    mt: 3,
                  }}
                >
                  <Button
                    color="info"
                    variant="contained"
                    onClick={closeConfirmDeleteModalHandler}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={deleteHandler}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </Modal>
          </Container>
        </>
      )}
    </>
  );
}

export default Item;

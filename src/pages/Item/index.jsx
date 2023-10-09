import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Modal,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../store/bagSlice";
import { changeURLWithShirtTitle } from "../../helpers/ChangeURL";
import { ref, remove } from "firebase/database";
import { db } from "../../firebase-config";
import ZoomableImage from "./ZoomableImage";
import useBagNotification from "../../hooks/useBagNotification";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const [shirtImg, setShirtImg] = useState(null);
  const [size, setSize] = useState(null);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const gender = useParams().gender;
  const capitalizedGender = gender.charAt(0).toUpperCase() + gender.slice(1);
  const id = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const triggerBagNotification = useBagNotification();

  useEffect(() => {
    if (currentShirts !== null) {
      let shirtsList = currentShirts.shirts[gender];
      for (let team in shirtsList) {
        if (shirtsList[team].id === id) {
          setShirt(shirtsList[team]);
          setShirtImg(shirtsList[team].imgs[0]);
          changeURLWithShirtTitle(shirtsList[team].name);
        }
      }
    }
  }, [gender, id, currentShirts]);

  const setSizeHandler = (e) => {
    const value = e.target.value;
    if (value) {
      setSize(value);
    }
  };

  const addToBagHandler = () => {
    triggerBagNotification({
      name: shirt.name,
      gender: capitalizedGender,
      size,
    });
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
          <Container>
            <Box
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
              <Box
                sx={{
                  width: {
                    xs: 300,
                    md: 600,
                  },
                  display: "flex",
                  alignItems: "center",
                  flexDirection: {
                    xs: "column-reverse",
                    md: "row",
                  },
                }}
              >
                <RadioGroup
                  defaultValue="0"
                  sx={{
                    flexDirection: { xs: "row", md: "column" },
                    mt: { xs: 4, md: 0 },
                  }}
                >
                  {shirt.imgs.map((img, i) => {
                    return (
                      <FormControlLabel
                        key={i}
                        sx={{ height: "45px", mb: 10 }}
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
                <ZoomableImage src={shirtImg} alt={shirt.name} />
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
                    md: 500,
                  },
                  borderRadius: 5,
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    // flexDirection="column-reverse"
                  >
                    <Typography variant="h4" fontWeight={500}>
                      {shirt.name}
                    </Typography>
                    {isAdmin && (
                      <Box sx={{ ml: 1 }}>
                        <IconButton onClick={editHandler}>
                          <EditIcon color="secondary" />
                        </IconButton>
                        <IconButton
                          onClick={setIsConfirmDeleteModalOpenHandler}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Box>
                    )}
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
                      {["S", "M", "L", "XL"].map((size) => (
                        <FormControlLabel
                          key={size}
                          value={shirt.sizes[size] ? size : "disabled"}
                          disabled={!shirt.sizes[size]}
                          control={<Radio />}
                          onClick={setSizeHandler}
                          label={size}
                        />
                      ))}
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
                      md: 400,
                    },
                  }}
                  disabled={!size}
                  onClick={addToBagHandler}
                >
                  Add To Bag
                </Button>
              </Box>
            </Box>
            <Modal
              open={isConfirmDeleteModalOpen}
              onClose={closeConfirmDeleteModalHandler}
            >
              <Box sx={modalStyle}>
                <Typography variant="h6" component="h2">
                  Are you sure you want to{" "}
                  <Typography component="span" sx={{ color: "utils.delete" }}>
                    DELETE
                  </Typography>{" "}
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

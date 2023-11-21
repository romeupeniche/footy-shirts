import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import { useSelector } from "react-redux";
import { changeURLWithShirtTitle } from "../../helpers/ChangeURL";
import { ref } from "firebase/database";
import { db } from "../../firebase-config";
import ZoomableImage from "../../components/ZoomableImage";
import useBagNotification from "../../hooks/useBagNotification";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useDatabaseRemoveMutation,
  useDatabaseSnapshot,
  useDatabaseTransaction,
} from "@react-query-firebase/database";
import { queryClient } from "../../util/http";
import SkeletonCard from "../../components/SkeletonCard";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "white",
};

function Item() {
  const { gender, id } = useParams();
  const shirtRef = ref(db, `shirts/${gender}/${id}`);
  const { data, isLoading: isSnapLoading } = useDatabaseSnapshot(
    ["shirts", gender, id],
    shirtRef
  );

  const { state: locationState } = useLocation();

  const [shirt, setShirt] = useState(null);

  useEffect(() => {
    if (!isSnapLoading) {
      let _shirt;
      if (!locationState) {
        _shirt = data.val();
      } else {
        _shirt = locationState.shirt;
      }

      setShirt(_shirt);
      changeURLWithShirtTitle(_shirt.name);
      setShirtImg(_shirt.imgs[0]);
    }
  }, [locationState, isSnapLoading, data]);

  const { mutate: deleteMutate } = useDatabaseRemoveMutation(shirtRef, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shirts", gender] });
      navigate(`/${gender}`);
    },
  });
  const isAdmin = useSelector((state) => state.account.isAdmin);
  const currentUser = useSelector((state) => state.account).user;
  const userBagRef = ref(db, "carts/" + currentUser.uid);
  const triggerBagNotification = useBagNotification();

  const { mutate: addToBagTrans, isLoading: isAddLoading } =
    useDatabaseTransaction(
      userBagRef,
      (currentBag) => {
        const item = {
          id,
          gender,
          quantity: 1,
          name: shirt.name,
          price: shirt.price,
          imgs: shirt.imgs,
          size,
          sizes: shirt.sizes,
        };
        if (!isAddLoading) {
          if (!currentBag?.items) {
            currentBag = { totalAmount: 0, items: [] };
          }

          const existingItemIndex = currentBag.items.findIndex(
            (prevItem) => prevItem.id === item.id && prevItem.size === item.size
          );

          if (existingItemIndex !== -1) {
            currentBag.items[existingItemIndex].quantity++;
            item.price = currentBag.items[existingItemIndex].price;
          } else {
            currentBag.items.push(item);
          }

          currentBag.totalAmount += item.price;
        }

        return currentBag;
      },
      undefined,
      {
        onSuccess: async (data) => {
          const snapshot = data.snapshot;
          await queryClient.cancelQueries({ queryKey: ["bag", currentUser] });
          const prevData = queryClient.getQueryData(["bag", currentUser]);
          queryClient.setQueryData(["bag", currentUser], snapshot);
          triggerBagNotification({
            name: shirt.name,
            gender: capitalizedGender,
            size,
          });

          return { prevData };
        },
        onError: (error, data, context) => {
          queryClient.setQueryData(["bag", currentUser], context.prevData);
        },
      }
    );

  const [shirtImg, setShirtImg] = useState(null);
  const [pageIsLoading, setPageIsLoading] = useState(true);
  const [size, setSize] = useState(null);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const capitalizedGender = gender.charAt(0).toUpperCase() + gender.slice(1);
  const navigate = useNavigate();

  const setSizeHandler = (e) => {
    const value = e.target.value;
    if (value) {
      setSize(value);
    }
  };

  const addToBagHandler = () => {
    if (Object.keys(currentUser).length === 0) {
      navigate("/account");
    } else {
      addToBagTrans();
    }
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
    deleteMutate();
    closeConfirmDeleteModalHandler();
  };

  useEffect(() => {
    const onPageLoad = () => {
      setPageIsLoading(false);
    };

    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad, false);
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);

  const setIsConfirmDeleteModalOpenHandler = () => {
    setIsConfirmDeleteModalOpen(true);
  };

  const closeConfirmDeleteModalHandler = () => {
    setIsConfirmDeleteModalOpen(false);
  };

  if (isSnapLoading || pageIsLoading) {
    return <SkeletonCard type="item" />;
  }

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
                  <Typography
                    component="span"
                    sx={{ color: "typography.delete" }}
                  >
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

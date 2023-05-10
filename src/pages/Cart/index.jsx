import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { addItem, deleteAllItems, removeItem } from "../../store/cartSlice";
import { auth } from "../../firebase-config";
import { Link } from "react-router-dom";

function Cart() {
  const currentCart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addItemHandler = async (id, size) => {
    dispatch(addItem({ id, size }));
  };

  const removeItemHandler = (id) => {
    dispatch(removeItem(id));
  };

  const deleteAllItemsHandler = (id) => {
    dispatch(deleteAllItems(id));
  };

  const shippingValue = currentCart.totalAmount > 250 ? 16.0 : 8.0;

  return (
    <>
      {auth.currentUser ? (
        <>
          <Typography variant="h2" mb={4}>
            Your Cart
          </Typography>
          {!currentCart.items.length ? (
            <Typography>Your cart is empty! Start buying!</Typography>
          ) : (
            <>
              <Grid
                container
                spacing={2}
                columns={16}
                sx={{
                  justifyContent: "space-between",
                  alignItems: {
                    xs: "center",
                    md: "normal",
                  },
                  flexDirection: {
                    md: "row",
                    xs: "column-reverse",
                  },
                }}
              >
                <Grid item>
                  {currentCart.items.map((item) => {
                    const itemIdx = item.id.match(/\d+/)[0];
                    return (
                      <Container
                        key={item.id}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          bgcolor: "#111",
                          my: 2,
                          flexDirection: {
                            md: "row",
                            xs: "column",
                          },
                          width: { xs: "80vw", sm: 500, md: 600 },
                        }}
                      >
                        <Box
                          m={{ xs: 1 }}
                          sx={{ width: { xs: "fit-content" } }}
                        >
                          <img src={item.img} width="100%" />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            bgcolor: "#222",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            ml: {
                              md: 4,
                            },
                            width: {
                              xs: 270,
                              sm: 400,
                              md: 500,
                            },
                            height: {
                              xs: 200,
                              md: 270,
                            },
                            p: {
                              xs: 1,
                              sm: 0,
                            },
                          }}
                        >
                          <Typography
                            variant="h6"
                            textAlign="center"
                            lineHeight={1}
                          >
                            <Link to={`/${item.gender}/${itemIdx}`}>
                              {item.name}
                            </Link>
                          </Typography>
                          <Typography color="#ccc" fontSize=".8rem">
                            {item.gender?.toUpperCase()}
                            {`'`}s Jersey, Size: {item.size?.toUpperCase()}
                          </Typography>
                          <Typography color="#3e9c35">
                            ${item.price * item.quantity}{" "}
                            <span style={{ fontSize: ".9rem", color: "#ccc" }}>
                              (x{item.quantity})
                            </span>{" "}
                            <span style={{ fontSize: ".7rem", color: "#888" }}>
                              (${item.price}/item)
                            </span>
                          </Typography>
                          <Box>
                            <IconButton
                              onClick={() => addItemHandler(item.id, item.size)}
                            >
                              <AddCircleOutlineIcon color="success" />
                            </IconButton>
                            <IconButton
                              onClick={() => removeItemHandler(item.id)}
                            >
                              <RemoveCircleOutlineIcon color="error" />
                            </IconButton>
                            <IconButton
                              onClick={() => deleteAllItemsHandler(item.id)}
                            >
                              <DeleteIcon sx={{ color: "#ba0c00" }} />
                            </IconButton>
                          </Box>
                        </Box>
                      </Container>
                    );
                  })}
                </Grid>
                <Grid item>
                  <Container
                    sx={{
                      bgcolor: "#111",
                      width: { xs: "80vw", md: 300 },
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      mt: {
                        md: 2,
                      },
                    }}
                  >
                    <Typography variant="h5" mb={2}>
                      Summary
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        minWidth: "100%",
                      }}
                    >
                      <Typography>Subtotal:</Typography>
                      <Typography color="#3e9c35">
                        ${currentCart.totalAmount.toFixed(2)}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 1,
                        minWidth: "100%",
                      }}
                    >
                      <Typography>Shipping:</Typography>
                      <Typography color="#3e9c35">${shippingValue}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 1,
                        minWidth: "100%",
                      }}
                    >
                      <Typography>Tax:</Typography>
                      <Typography color="#3e9c35">
                        ${(currentCart.totalAmount * 0.13).toFixed(2)}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 2,
                        minWidth: "100%",
                      }}
                    >
                      <Typography>Total:</Typography>
                      <Typography color="#3e9c35">
                        $
                        {(
                          currentCart.totalAmount * 1.13 +
                          shippingValue
                        ).toFixed(2)}
                      </Typography>
                    </Box>

                    <Button sx={{ mt: 2, width: "100%" }} variant="outlined">
                      Checkout
                    </Button>
                  </Container>
                </Grid>
              </Grid>
            </>
          )}
        </>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", height: "80vh" }}>
          <Typography variant="h4" textAlign="center">
            You are not logged. Try <Link to="/account">logging in</Link> to
            setup your cart.
          </Typography>
        </Box>
      )}
    </>
  );
}

export default Cart;

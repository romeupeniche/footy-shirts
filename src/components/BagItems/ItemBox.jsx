import { Box, Typography, Link, TextField } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDatabaseTransaction } from "@react-query-firebase/database";
import { db } from "../../firebase-config";
import { ref } from "firebase/database";
import { queryClient } from "../../util/http";
import useBagNotification from "../../hooks/useBagNotification";

function ItemBox({ item, readOnly }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const currentUser = useSelector((state) => state.account).user;
  const userBagRef = ref(db, "carts/" + currentUser.uid);
  const triggerBagNotification = useBagNotification();

  const { mutate: removeAllItemsTrans } = useDatabaseTransaction(
    userBagRef,
    (currentBag) => {
      if (currentBag) {
        const { id, size } = item;

        const existingItemIdx = currentBag.items.findIndex(
          (item) => item.id === id && item.size === size
        );

        const existingItem = currentBag.items[existingItemIdx];

        const itemTotal = existingItem.price * existingItem.quantity;
        currentBag.totalAmount -= itemTotal;

        currentBag.items = currentBag.items.filter(
          (item, idx) => idx !== existingItemIdx
        );
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
          name: item.name,
          gender: capitalizedGender,
          size: item.size,
          isRemoving: true,
        });

        return { prevData };
      },
      onError: (error, data, context) => {
        queryClient.setQueryData(["bag", currentUser], context.prevData);
      },
    }
  );
  const { mutate: changeItemQuantityTrans } = useDatabaseTransaction(
    userBagRef,
    (currentBag) => {
      if (currentBag) {
        const { id, size } = item;
        const existingItemIndex = currentBag.items.findIndex(
          (item) => item.id === id && item.size === size
        );
        const existingItem = currentBag.items[existingItemIndex];
        const valueToBeAdded =
          existingItem.price * (+quantity - existingItem.quantity);
        currentBag.totalAmount += valueToBeAdded;
        currentBag.items[existingItemIndex].quantity = +quantity;
      }

      return currentBag;
    },
    undefined,
    {
      onSuccess: async (data) => {
        const snapshot = data.snapshot;
        await queryClient.cancelQueries({ queryKey: ["bag", currentUser] });
        queryClient.setQueryData(["bag", currentUser], snapshot);
      },
    }
  );
  const capitalizedGender =
    item.gender.charAt(0).toUpperCase() + item.gender.slice(1);

  const deleteAllItemsHandler = () => {
    removeAllItemsTrans();
  };

  const setQuantityHandler = (event) => {
    const input = event.target.value;
    if (/^(?:[1-9]|10)$/.test(input) || input === "") {
      setQuantity(input);
    }
  };

  const handleQuantityBlur = () => {
    if (quantity === "" || +quantity <= 0) {
      setQuantity("1");
    }

    changeItemQuantityTrans();
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        my: 2,
        flexDirection: {
          md: "row",
          xs: "column",
        },
      }}
    >
      <Box
        component="img"
        src={item.imgs[0]}
        m={{ xs: 1 }}
        sx={{ width: { xs: 250 }, borderRadius: 10 }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "stretch" },
            p: {
              xs: 1,
              sm: 0,
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{ textAlign: { xs: "center", md: "start" } }}
            lineHeight={1}
          >
            {readOnly ? (
              item.name
            ) : (
              <Link
                to={`/${item.gender}/${item.id}`}
                state={{ shirt: item }}
                component={RouterLink}
                sx={{
                  color: "primary.main",
                  textDecoration: "none",
                }}
              >
                {item.name}
              </Link>
            )}
          </Typography>
          <Typography fontWeight={500}>
            {capitalizedGender}&apos;s Nike Dri-FIT ADV Football Shirt
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              mt: 0.5,
              fontSize: ".8rem",
            }}
          >
            <Typography fontSize="inherit" fontWeight={400}>
              Size: {item.size?.toUpperCase()}
            </Typography>
            <Box display="flex" alignItems="center" ml={4}>
              <Typography fontSize="inherit" fontWeight={400} mr={1}>
                Qty.
              </Typography>
              {readOnly ? (
                <Typography fontSize="inherit" fontWeight={400}>
                  {quantity}
                </Typography>
              ) : (
                <TextField
                  type="number"
                  size="small"
                  sx={{ width: "45px", p: 0 }}
                  onChange={setQuantityHandler}
                  onBlur={handleQuantityBlur}
                  value={quantity}
                  inputProps={{
                    style: { padding: 1, paddingLeft: 8 },
                  }}
                />
              )}
            </Box>
          </Box>
          {!readOnly && (
            <Box
              sx={{
                cursor: "pointer",
                fontSize: "0.8rem",
                fontWeight: "500",
                color: "typography.ghost",
                width: "fit-content",
                "&:hover": {
                  color: "typography.light",
                },
              }}
              onClick={deleteAllItemsHandler}
            >
              Remove
            </Box>
          )}
        </Box>
        <Box>
          <Typography
            fontWeight={500}
            sx={{
              ml: { xs: 0, md: 4 },
              textAlign: { xs: "center", md: "start" },
            }}
          >
            ${(item.price * item.quantity).toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ItemBox;

ItemBox.propTypes = {
  item: PropTypes.object.isRequired,
  readOnly: PropTypes.bool.isRequired,
};

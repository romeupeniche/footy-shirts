import { useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import ItemCard from "../../components/ItemCard";
import PropTypes from "prop-types";

const defaultItem = {
  imgs: ["", ""],
  name: "No Name",
  price: "0",
  sizes: {
    sizeS: false,
    sizeM: false,
    sizeL: false,
    sizeXL: false,
  },
};

function ShirtForm({
  currentGender,
  item = defaultItem,
  onSubmit,
  isEditing = false,
}) {
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.account.isAdmin);
  const [itemCardProps, setItemCardProps] = useState(item);

  const submitHandler = (providedInfo) => {
    onSubmit(providedInfo);
  };

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  });

  let formProps = {
    submitHandler,
    setInputs: setItemCardProps,
    currentGender,
  };

  if (isEditing) {
    formProps = {
      ...formProps,
      isNotAbleToChangeGender: true,
      currentGender,
      currentItem: item,
    };
  }

  return (
    <Container>
      <Typography
        fontSize={{ xs: "2em", sm: "3rem" }}
        mt={5}
        sx={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
        }}
      >
        {isEditing ? (
          <>
            Edit:{" "}
            <Typography
              component="span"
              fontSize={{ xs: "2rem", sm: "3rem" }}
              ml={1}
              fontWeight="inherit"
              noWrap
            >
              {item.name}
            </Typography>
          </>
        ) : (
          "New product"
        )}
      </Typography>
      <Typography sx={{ fontWeight: 500, fontSize: "1.5rem", mt: 5, mb: 2 }}>
        Enter your shirt information:
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "center", sm: "stretch" },
          flexDirection: { xs: "column-reverse", sm: "row" },
        }}
      >
        <Form {...formProps} />
        <ItemCard itemCardProps={itemCardProps} />
      </Box>
    </Container>
  );
}

export default ShirtForm;

ShirtForm.propTypes = {
  currentGender: PropTypes.string.isRequired,
  item: PropTypes.shape({
    imgs: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    sizes: PropTypes.shape({
      sizeS: PropTypes.bool,
      sizeM: PropTypes.bool,
      sizeL: PropTypes.bool,
      sizeXL: PropTypes.bool,
    }),
  }),
  onSubmit: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
};

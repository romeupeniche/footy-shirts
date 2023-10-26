import { Box, Button, FormGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import FormInput from "./FormInput";

function Form({
  submitHandler,
  isNotAbleToChangeGender,
  currentGender,
  currentItem,
  setInputs,
}) {
  const [name, setName] = useState(currentItem ? currentItem.name : "");
  const [img1, setImg1] = useState(currentItem ? currentItem.imgs[0] : "");
  const [gender, setGender] = useState(currentGender ? currentGender : "");
  const [img2, setImg2] = useState(currentItem ? currentItem.imgs[1] : "");
  const [price, setPrice] = useState(currentItem ? currentItem.price : "");
  const [isInvalid, setIsInvalid] = useState(false);
  const [commonTypos, setCommonTypos] = useState(
    currentItem ? currentItem.commonTypos : ""
  );
  const [availableSizes, setAvailableSizes] = useState(
    currentItem
      ? {
          sizeS: currentItem.sizes.S,
          sizeM: currentItem.sizes.M,
          sizeL: currentItem.sizes.L,
          sizeXL: currentItem.sizes.XL,
        }
      : {
          sizeS: false,
          sizeM: false,
          sizeL: false,
          sizeXL: false,
        }
  );
  const navigate = useNavigate();
  const urlPattern =
    /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
  const { sizeS, sizeM, sizeL, sizeXL } = availableSizes;
  const isNameValid = name.trim().length > 12;
  const areImgsEqual = img1 === img2;
  const isImg1Valid = urlPattern.test(img1) && !areImgsEqual;
  const isImg2Valid = urlPattern.test(img2) && !areImgsEqual;
  const isCommonTyposValid = commonTypos.trim().length > 12;
  const isPriceValid = price > 0;
  const isGenderValid =
    gender === "kids" || gender === "women" || gender === "men";
  const isSizeValid =
    [sizeS, sizeM, sizeL, sizeXL].filter((v) => v).length >= 1;
  const isAllValid =
    isNameValid &&
    isImg1Valid &&
    isImg2Valid &&
    isCommonTyposValid &&
    isPriceValid &&
    isGenderValid &&
    isSizeValid;

  const resetInvalidHandler = () => {
    setIsInvalid(false);
  };

  const handleNameChange = (text) => {
    if (text.length <= 100) {
      setName(text);
    }
  };
  const handleImg1Change = (text) => {
    if (text.length <= 300) {
      setImg1(text);
    }
  };
  const handleImg2Change = (text) => {
    if (text.length <= 300) {
      setImg2(text);
    }
  };
  const handleCommonTyposChange = (text) => {
    if (text.length <= 100) {
      setCommonTypos(text);
    }
  };

  useEffect(() => {
    setInputs({
      name,
      imgs: [img1, img2],
      gender,
      price,
      sizes: availableSizes,
    });
  }, [name, img1, img2, gender, price, availableSizes, setInputs]);

  const handlePriceChange = (value) => {
    if (value <= 500 && value >= 0) {
      setPrice(value);
    }
  };

  const verifySubmitHandler = () => {
    if (!isAllValid) {
      setIsInvalid(true);
      return;
    }
    submitHandler({
      id: currentItem?.id,
      name: name.trim(),
      imgs: [img1.trim(), img2.trim()],
      price: +price,
      sizes: {
        S: sizeS,
        M: sizeM,
        L: sizeL,
        XL: sizeXL,
      },
      commonTypos: commonTypos.trim(),
      gender,
    });
  };

  const handleSizeChange = (event) => {
    setAvailableSizes((prev) => ({
      ...prev,
      [event.target.name]: event.target.checked,
    }));
  };

  const cancelHandler = () => {
    navigate(-1);
  };

  const neededTextInputs = [
    {
      title: "Shirt Title",
      value: name,
      onChange: handleNameChange,
      error: !isNameValid,
      areImgsEqual: false,
      infoText:
        'This is the name that will appear for the shirt. Example: "Barcelona 2021/22 Vapor Match Home".',
    },
    {
      title: "Front Image (Link)",
      isLink: true,
      value: img1,
      onChange: handleImg1Change,
      error: !isImg1Valid,
      areImgsEqual,
      infoText:
        "This is the image that will appear on the front of the shirt page. You should add A LINK TO AN IMAGE of the front of your shirt.",
    },
    {
      title: "Secondary Image (Link)",
      value: img2,
      isLink: true,
      onChange: handleImg2Change,
      error: !isImg2Valid,
      areImgsEqual,
      infoText:
        "This is the image that will appear as the secondary image in the shirt page. You can add A LINK TO AN IMAGE of the back of your shirt.",
    },
    {
      title: "Common Typos",
      value: commonTypos,
      onChange: handleCommonTyposChange,
      error: !isCommonTyposValid,
      areImgsEqual: false,
      infoText:
        "This is a helper for the search function. You may add some common typos, or names that you want your shirt to be displayed when typed, separated by commas.",
    },
    {
      title: "Gender",
      value: gender,
      onChange: setGender,
      error: !isGenderValid,
      type: "radio",
      inputs: ["Men", "Women", "Kids"],
      infoText:
        "This is the gender of your shirt. For who you want to sell? Which fits the best for your shirt?",
    },
    {
      title: "Available Sizes",
      onChange: handleSizeChange,
      error: !isSizeValid,
      type: "checkbox",
      inputs: [
        {
          title: "S",
          name: "sizeS",
          value: sizeS,
        },
        {
          title: "M",
          name: "sizeM",
          value: sizeM,
        },
        {
          title: "L",
          name: "sizeL",
          value: sizeL,
        },
        {
          title: "XL",
          name: "sizeXL",
          value: sizeXL,
        },
      ],
      infoText: "These are the available sizes of the shirt.",
    },
    {
      title: "Price",
      onChange: handlePriceChange,
      value: price,
      error: !isPriceValid,
      type: "number",
      infoText: "This is the price of the shirt. Be fair.",
    },
  ];

  return (
    <Box>
      <FormGroup>
        {neededTextInputs.map((inputProps) => {
          return (
            <FormInput
              key={inputProps.title}
              inputProps={{
                ...inputProps,
                isNotAbleToChangeGender,
                isInvalid,
                resetInvalidHandler,
              }}
            />
          );
        })}
        <Box my={2}>
          <Button
            variant="contained"
            onClick={verifySubmitHandler}
            size="large"
            sx={{
              borderRadius: 5,
              mr: 2,
            }}
          >
            {isNotAbleToChangeGender ? "Update Shirt" : "Add New Shirt"}
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={cancelHandler}
            sx={{
              borderRadius: 2,
              borderColor: "typography.delete",
              color: "typography.delete",
              "&:hover": {
                borderColor: "primary.dark",
                color: "primary.dark",
              },
            }}
          >
            Cancel
          </Button>
        </Box>
      </FormGroup>
    </Box>
  );
}

export default Form;

Form.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  isNotAbleToChangeGender: PropTypes.bool,
  currentGender: PropTypes.string.isRequired,
  currentItem: PropTypes.object,
  setInputs: PropTypes.func.isRequired,
};

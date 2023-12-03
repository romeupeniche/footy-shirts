import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Input,
  Popover,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";

function Form({
  submitHandler,
  isNotAbleToChangeGender,
  currentGender,
  currentItem,
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
  const [anchorEl, setAnchorEl] = useState(null);
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

  const handlePriceChange = (value) => {
    if (value <= 500 && value >= 0) {
      setPrice(value);
    }
  };

  const resetInvalidHandler = () => {
    setIsInvalid(false);
  };

  const verifySubmitHandler = () => {
    if (!isAllValid) {
      setIsInvalid(true);
      return;
    }
    submitHandler({
      gender,
      newItem: {
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
      },
    });
  };

  const handleSizeChange = (event) => {
    setAvailableSizes((prev) => ({
      ...prev,
      [event.target.name]: event.target.checked,
    }));
  };

  const open = Boolean(anchorEl);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const urlPattern =
    /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;

  const { sizeS, sizeM, sizeL, sizeXL } = availableSizes;
  const isNameValid = name.trim().length > 12;
  const isImg1Valid = urlPattern.test(img1);
  const isImg2Valid = urlPattern.test(img2);
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

  const neededTextInputs = [
    {
      title: "Shirt Title",
      value: name,
      onChange: setName,
      error: !isNameValid,
      infoText:
        'This is the name that will appear for the shirt. Example: "Barcelona 2021/22 Vapor Match Home".',
    },
    {
      title: "Front Image (Link)",
      isLink: true,
      value: img1,
      onChange: setImg1,
      error: !isImg1Valid,
      infoText:
        "This is the image that will appear on the front of the shirt page. You should add A LINK TO AN IMAGE of the front of your shirt.",
    },
    {
      title: "Secondary Image (Link)",
      value: img2,
      isLink: true,
      onChange: setImg2,
      error: !isImg2Valid,
      infoText:
        "This is the image that will appear as the secondary image in the shirt page. You can add A LINK TO AN IMAGE of the back of your shirt.",
    },
    {
      title: "Common Typos",
      value: commonTypos,
      onChange: setCommonTypos,
      error: !isCommonTyposValid,
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
    <>
      {neededTextInputs.map(
        ({ title, value, onChange, error, infoText, type, inputs, isLink }) => {
          const onChangeFunc = (e) => onChange(e.target.value);
          return (
            <Box key={`${title} box`} my={2} onFocus={resetInvalidHandler}>
              {!type ? (
                <TextField
                  id={title}
                  label={title}
                  variant="standard"
                  required
                  type="text"
                  value={value}
                  onChange={onChangeFunc}
                  error={error && isInvalid}
                  helperText={
                    error &&
                    isInvalid &&
                    (!isLink
                      ? `Your shirt ${title.toLowerCase()} must be > 12.`
                      : "Please give a valid url.")
                  }
                />
              ) : type === "radio" ? (
                <FormControl error={error && isInvalid} required>
                  <FormLabel>{title}</FormLabel>
                  <RadioGroup row value={value} onChange={onChangeFunc}>
                    {inputs.map((label) => (
                      <FormControlLabel
                        key={`${title} radio ${label}`}
                        value={label.toLowerCase()}
                        control={<Radio />}
                        disabled={isNotAbleToChangeGender}
                        label={label}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              ) : type === "checkbox" ? (
                <FormControl error={error && isInvalid} required>
                  <FormLabel>{title}</FormLabel>
                  <FormGroup row>
                    {inputs.map(({ title, value, name }) => {
                      return (
                        <FormControlLabel
                          key={`${title} checkbox`}
                          control={
                            <Checkbox checked={value} onChange={onChange} />
                          }
                          label={title}
                          name={name}
                        />
                      );
                    })}
                  </FormGroup>
                </FormControl>
              ) : (
                <FormControl variant="standard" required>
                  <FormLabel>{title}</FormLabel>
                  <Input
                    startAdornment="$"
                    type="number"
                    onChange={onChangeFunc}
                    value={value}
                    error={error && isInvalid}
                  />
                </FormControl>
              )}
              <InfoIcon
                fontSize="10px"
                id={title}
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
              />
              <Popover
                sx={{
                  pointerEvents: "none",
                }}
                open={open && anchorEl.id === title}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <Typography sx={{ p: 1, width: "300px" }}>
                  {infoText}
                </Typography>
              </Popover>
            </Box>
          );
        }
      )}
      <Button onClick={verifySubmitHandler}>
        {isNotAbleToChangeGender ? "Update Shirt" : "Add New Shirt"}
      </Button>
    </>
  );
}

export default Form;

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  Popover,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import { setNewShirt } from "../../store/shirtsSlice";

function AddNewShirtPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.account.isAdmin);
  const [name, setName] = useState("");
  const [img1, setImg1] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [gender, setGender] = useState("");
  const [img2, setImg2] = useState("");
  const [price, setPrice] = useState(0);
  const [availableSizes, setAvailableSizes] = useState({
    sizeS: false,
    sizeM: false,
    sizeL: false,
    sizeXL: false,
  });
  const [commonTypos, setCommonTypos] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const resetInvalidHandler = () => {
    setIsInvalid(false);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handlePriceChange = (value) => {
    if (value <= 500 && value >= 0) {
      setPrice(value);
    }
  };

  const handleSizeChange = (event) => {
    setAvailableSizes((prev) => ({
      ...prev,
      [event.target.value]: event.target.checked,
    }));
  };

  const submitHandler = () => {
    if (!isAllValid) {
      setIsInvalid(true);
      return;
    }
    dispatch(
      setNewShirt({
        gender,
        newItem: {
          name: name.trim(),
          imgs: [img1.trim(), img2.trim()],
          price: +price,
          sizes: availableSizes,
          commonTypos: commonTypos.trim(),
        },
      })
    );
  };

  const open = Boolean(anchorEl);

  const { sizeS, sizeM, sizeL, sizeXL } = availableSizes;
  const isNameValid = name.trim().length > 12;
  const isImg1Valid = img1.trim().length > 12;
  const isImg2Valid = img2.trim().length > 12;
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
      value: img1,
      onChange: setImg1,
      error: !isImg1Valid,
      infoText:
        "This is the image that will appear on the front of the shirt page. You should add A LINK TO AN IMAGE of the front of your shirt.",
    },
    {
      title: "Secondary Image (Link)",
      value: img2,
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
          value: "sizeS",
        },
        {
          title: "M",
          value: "sizeM",
        },
        {
          title: "L",
          value: "sizeL",
        },
        {
          title: "XL",
          value: "sizeXL",
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

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  });

  return (
    <>
      <Typography variant="h3" mt={2}>
        New product
      </Typography>
      {neededTextInputs.map(
        ({ title, value, onChange, error, infoText, type, inputs }) => {
          const onChangeFunc = (e) => onChange(e.target.value);
          return (
            <>
              <Box key={title} my={2} onFocus={resetInvalidHandler}>
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
                      `Your shirt must have a ${title.toLowerCase()} > 12.`
                    }
                  />
                ) : type === "radio" ? (
                  <FormControl error={error && isInvalid} required>
                    <FormLabel>{title}</FormLabel>
                    <RadioGroup row value={value} onChange={onChangeFunc}>
                      {inputs.map((label) => (
                        <FormControlLabel
                          key={label}
                          value={label.toLowerCase()}
                          control={<Radio />}
                          label={label}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                ) : type === "checkbox" ? (
                  <FormControl error={error && isInvalid} required>
                    <FormLabel>{title}</FormLabel>
                    <RadioGroup row value={value}>
                      {inputs.map(({ title, value }) => (
                        <FormControlLabel
                          key={title}
                          value={value}
                          control={<Checkbox />}
                          label={title}
                          onChange={onChange}
                        />
                      ))}
                    </RadioGroup>
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
            </>
          );
        }
      )}
      <Button onClick={submitHandler}>Add New Shirt</Button>
    </>
  );
}

export default AddNewShirtPage;

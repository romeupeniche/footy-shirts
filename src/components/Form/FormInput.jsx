import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  TextField,
  InputAdornment,
  Typography,
  Popover,
  Box,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import PropTypes from "prop-types";

function FormInput({
  inputProps: {
    title,
    value,
    onChange,
    error,
    infoText,
    type = "text",
    isLink,
    inputs,
    isNotAbleToChangeGender,
    isInvalid,
    resetInvalidHandler,
    areImgsEqual,
  },
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const onChangeFunc = (e) => onChange(e.target.value);
  const open = Boolean(anchorEl);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  let input;
  if (type === "text") {
    input = (
      <TextField
        id={title}
        label={title}
        required
        type="text"
        value={value}
        onChange={onChangeFunc}
        error={error && isInvalid}
        sx={{ width: "270px" }}
        helperText={
          error &&
          isInvalid &&
          (!isLink
            ? `Your shirt ${title.toLowerCase()} must be > 12.`
            : areImgsEqual
            ? "Images cannot be equal."
            : "Please give a valid url.")
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <InfoIcon
                fontSize="10px"
                id={title}
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
              />
            </InputAdornment>
          ),
        }}
      />
    );
  } else if (type === "radio") {
    input = (
      <>
        <FormControl
          error={error && isInvalid}
          required
          sx={{ width: "270px" }}
        >
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
        <InfoIcon
          fontSize="10px"
          id={title}
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        />
      </>
    );
  } else if (type === "checkbox") {
    input = (
      <FormControl error={error && isInvalid} required>
        <FormLabel>{title}</FormLabel>
        <FormGroup
          row
          sx={{
            width: "270px",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          {inputs.map(({ title, value, name }) => {
            return (
              <FormControlLabel
                key={`${title} checkbox`}
                control={<Checkbox checked={value} onChange={onChange} />}
                label={title}
                name={name}
              />
            );
          })}
        </FormGroup>
      </FormControl>
    );
  } else {
    input = (
      <FormControl variant="standard" required sx={{ width: "270px" }}>
        <FormLabel>{title}</FormLabel>
        <Input
          startAdornment="$"
          type="number"
          onChange={onChangeFunc}
          value={value}
          error={error && isInvalid}
        />
      </FormControl>
    );
  }
  return (
    <Box
      key={`${title} box`}
      width={300}
      my={2}
      onFocus={resetInvalidHandler}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {input}
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
        disableRestoreFocus
      >
        <Typography sx={{ p: 1, width: "300px" }}>{infoText}</Typography>
      </Popover>
    </Box>
  );
}

export default FormInput;

FormInput.propTypes = {
  inputProps: PropTypes.shape({
    type: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    error: PropTypes.bool,
    infoText: PropTypes.string,
    isInvalid: PropTypes.bool,
    isLink: PropTypes.bool,
    isNotAbleToChangeGender: PropTypes.bool,
    inputs: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    resetInvalidHandler: PropTypes.func.isRequired,
    areImgsEqual: PropTypes.bool,
  }).isRequired,
};

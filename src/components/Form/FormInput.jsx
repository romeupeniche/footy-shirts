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
  } from "@mui/material";
  import InfoIcon from "@mui/icons-material/Info";
  import { useState } from "react";
  import PropTypes from "prop-types";
  
  function FormInput({
    type = "text",
    title,
    value,
    onChangeFunc,
    error,
    infoText,
    isInvalid,
    isLink,
    inputs,
  }) {
    const [anchorEl, setAnchorEl] = useState(null);
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
      <>
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
      </>
    );
  }
  
  export default FormInput;

  FormInput.propTypes = {
    type: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string,
    onChangeFunc: PropTypes.func,
    error: PropTypes.bool,
    infoText: PropTypes.string,
    isInvalid: PropTypes.bool,
    isLink: PropTypes.bool,
    inputs: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        value: PropTypes.string,
        name: PropTypes.string,
      })
    ),
  }
  
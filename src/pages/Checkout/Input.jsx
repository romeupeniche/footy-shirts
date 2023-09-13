import { MenuItem, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

function Input({
  type = "string",
  label,
  required = true,
  fullWidth = true,
  sx = {},
  defaultValue = "",
  data = [],
  placeholder = "",
}) {
  const [input, setInput] = useState("");
  const [isError, setIsError] = useState(false);

  const onStringChange = (e) => {
    setIsError(false);
    setInput(e.target.value);
  };

  const onBlur = () => {
    if (input.trim().length === 0 && required) {
      setIsError(true);
    }
  };

  const onPostalAndPhoneChange = (e, type) => {
    const replacement = "-";

    let inputValue = e.target.value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    if (type === "phone") {
      inputValue = e.target.value.replace(/\D/g, "");
    }

    if (inputValue.length > 3) {
      inputValue = inputValue.slice(0, 3) + replacement + inputValue.slice(3);
    }

    if (type === "postal") {
      if (inputValue.length > 7) {
        inputValue = inputValue.slice(0, 7);
      }
    } else {
      // type === "phone"
      if (inputValue.length > 7) {
        inputValue = inputValue.slice(0, 7) + replacement + inputValue.slice(7);
      }
      if (inputValue.length > 12) {
        inputValue = inputValue.slice(0, 12);
      }
    }

    if (inputValue.length === (type === "postal" ? 7 : 12)) {
      setIsError(false);
    } else {
      setIsError(true);
    }

    setInput(inputValue);
  };

  let onChange = onStringChange;
  let inputType = "text";

  if (type === "postal") {
    onChange = (e) => onPostalAndPhoneChange(e, "postal");
  }

  if (type === "phone") {
    onChange = (e) => onPostalAndPhoneChange(e, "phone");
    inputType = "tel";
  }

  if (type === "email") {
    inputType = "email";
  }

  let fieldProps = {
    fullWidth,
    label,
    value: input,
    onChange,
    error: isError,
    required,
    onBlur,
    placeholder,
    sx: { ...sx, mb: 2 },
  };

  if (defaultValue) {
    fieldProps = {
      label,
      fullWidth,
      defaultValue,
      InputProps: {
        readOnly: true,
      },
      sx: { ...sx, mb: 2 },
    };
  }

  let content = (
    <TextField
      {...fieldProps}
      InputLabelProps={{ sx: { fontWeight: 200 } }}
      inputProps={{
        maxLength: 60,
        style: {
          fontWeight: 200,
        },
      }}
      type={inputType}
    />
  );

  if (type === "select") {
    content = (
      <TextField
        {...fieldProps}
        select
        InputLabelProps={{ sx: { fontWeight: 200 } }}
        SelectProps={{
          sx: {
            fontWeight: 200,
          },
          MenuProps: {
            height: 100,
            PaperProps: {
              sx: {
                height: 200,
              },
            },
          },
          fullWidth: true,
        }}
      >
        {data.map((item) => (
          <MenuItem key={item} value={item} sx={{ fontWeight: 200 }}>
            {item}
          </MenuItem>
        ))}
      </TextField>
    );
  }
  return <>{content}</>;
}

export default Input;

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  sx: PropTypes.object,
  defaultValue: PropTypes.string,
  data: PropTypes.array,
  placeholder: PropTypes.string,
};

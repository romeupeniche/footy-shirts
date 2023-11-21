import { TextField } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";

const capitalizeEveryWord = (string) => {
  const words = string.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  return words.join(" ");
};

function CardInput({
  label,
  placeholder,
  type = "string",
  sx,
  setAllInputsValidity,
}) {
  const [input, setInput] = useState("");
  const [isError, setIsError] = useState(false);

  const setIsErrorTrue = () => {
    setIsError(true);
    setAllInputsValidity(label, false);
  };
  const setIsErrorFalse = () => {
    setIsError(false);
    setAllInputsValidity(label, true);
  };

  const onStringBlur = () => {
    let value;
    if (input.length > 2) {
      value = capitalizeEveryWord(input);
    } else {
      value = input;
    }
    setInput(value);
    if (value.length <= 2) {
      setIsErrorTrue();
    }
  };
  const onStringChange = (e) => {
    setIsErrorFalse();

    if (e.target.value.length <= 40) {
      setInput(e.target.value);
    }
  };
  const onCvvChange = (e) => {
    setIsErrorFalse();
    let inputValue = e.target.value.replace(/\D/g, "");
    if (inputValue.length <= 3) {
      setInput(inputValue);
    }
  };
  const onNumberBlur = () => {
    if (type === "expDate") {
      const month = +input.split("/")[0];
      const year = +input.split("/")[1];
      const todayMonth = +new Date().getMonth() + 1;
      const todayYear = +new Date().getFullYear().toString().substr(-2);
      if (input.length < 5) {
        setIsErrorTrue();
      } else if (month <= todayMonth && year <= todayYear) {
        setIsErrorTrue();
      } else if (month > 12 || year > 50 || year < todayYear) {
        setIsErrorTrue();
      } else if (month < todayMonth && year === todayYear) {
        setIsErrorTrue();
      }
    } else if (type === "cvv") {
      if (input.length < 3) {
        setIsErrorTrue();
      }
    } else {
      if (input.length < 19) {
        setIsErrorTrue();
      }
    }
  };
  const onExpDateChange = (e) => {
    setIsErrorFalse();
    let inputValue = e.target.value.replace(/\D/g, "");
    if (inputValue.length > 2) {
      inputValue = inputValue.slice(0, 2) + "/" + inputValue.slice(2);
    }

    if (inputValue.length <= 5) {
      setInput(inputValue);
    }
  };
  const onCardNumberChange = (e) => {
    setIsErrorFalse();
    let inputValue = e.target.value.replace(/\D/g, "");
    if (inputValue.length > 4) {
      inputValue = inputValue.slice(0, 4) + " " + inputValue.slice(4);
    }
    if (inputValue.length > 9) {
      inputValue = inputValue.slice(0, 9) + " " + inputValue.slice(9);
    }
    if (inputValue.length > 14) {
      inputValue = inputValue.slice(0, 14) + " " + inputValue.slice(14);
    }

    if (inputValue.length <= 19) {
      setInput(inputValue);
    }
  };

  let onChange = onStringChange;
  let onBlur = onStringBlur;

  if (type === "expDate") {
    onChange = onExpDateChange;
    onBlur = onNumberBlur;
  } else if (type === "cvv") {
    onChange = onCvvChange;
    onBlur = onNumberBlur;
  } else if (type === "cardNumber") {
    onChange = onCardNumberChange;
    onBlur = onNumberBlur;
  }

  let fieldProps = {
    fullWidth: true,
    label,
    value: input,
    onChange,
    error: isError,
    required: true,
    onBlur,
    placeholder,
    sx: { ...sx, mb: 2 },
  };

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
    />
  );

  if (type === "cvv" || type === "expDate" || type === "cardNumber") {
    content = (
      <TextField
        {...fieldProps}
        InputLabelProps={{ sx: { fontWeight: 200 } }}
        inputProps={{
          inputMode: "numeric",
          pattern: "[0-9]*",
          style: {
            fontWeight: 200,
          },
        }}
      />
    );
  }

  return <>{content}</>;
}

export default CardInput;

CardInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  sx: PropTypes.object,
  setAllInputsValidity: PropTypes.func.isRequired,
};

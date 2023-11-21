import { Checkbox, FormControlLabel } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function CheckboxGroup({ data, setIsFullyChecked }) {
  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    const newInputs = data.map((label, i) => {
      return {
        label,
        checked: false,
        i,
      };
    });
    setInputs(newInputs);
  }, [setInputs, data]);

  const handleChange = (event) => {
    setInputs((prevState) => {
      const targetIndex = prevState.findIndex((input) => {
        return input.i === +event.target.name;
      });
      const target = prevState[targetIndex];
      const newState = [...prevState];
      newState[targetIndex] = { ...target, checked: !target.checked };
      return newState;
    });
  };
  let content = inputs.map(({ label, checked, i }) => {
    return (
      <FormControlLabel
        key={i}
        required
        control={
          <Checkbox checked={checked} onChange={handleChange} name={`${i}`} />
        }
        label={label}
      />
    );
  });
  const allChecked = inputs.reduce((accumulator, currentObj) => {
    if (!currentObj.checked) {
      return false;
    } else {
      return accumulator;
    }
  }, true);

  useEffect(() => {
    if (allChecked) {
      setIsFullyChecked(true);
    } else {
      setIsFullyChecked(false);
    }
  }, [allChecked, setIsFullyChecked]);

  return <>{content}</>;
}

export default CheckboxGroup;

CheckboxGroup.propTypes = {
  data: PropTypes.array,
  setIsFullyChecked: PropTypes.func,
};

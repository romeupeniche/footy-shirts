import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import PropTypes from "prop-types";
import { useState } from "react";

function getStyles(name, selectedOptions, theme) {
  return {
    fontWeight:
      selectedOptions.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Filter({ options, label, onSelectOptions }) {
  const theme = useTheme();
  const [selectedOptionsNames, setSelectedOptionsNames] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedOptionsNames(
      typeof value === "string" ? value.split(",") : value,
    );

    const nameToValueMap = {};
    options.forEach((option) => {
      nameToValueMap[option.name] = option.value;
    });

    const matchedValues = value.map((name) => nameToValueMap[name]);

    onSelectOptions(matchedValues);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="select-label">{label}</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          multiple
          value={selectedOptionsNames}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {options.map(({ name }) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, selectedOptionsNames, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

Filter.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  onSelectOptions: PropTypes.func.isRequired,
};

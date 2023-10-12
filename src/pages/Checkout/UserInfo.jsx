import { Box, Button, FormGroup, Typography } from "@mui/material";
import BagSummary from "../../components/BagSummary";
import Input from "./Input";
import CheckboxGroup from "./CheckboxGroup";
import { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const provinces = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Northwest Territories",
  "Nova Scotia",
  "Nunavut",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Yukon Territory",
];

const agreementInputs = [
  <Typography key="input1">
    I agree to the{" "}
    <Typography
      component="span"
      sx={{
        color: "secondary.main",
        "&:hover": { opacity: 0.8 },
      }}
    >
      Terms and Conditions
    </Typography>
  </Typography>,
  "I confirm my order details are correct.",
  "I acknowledge Footy Shirts is not liable for any information errors.",
  // "I understand that I will receive email updates about the status and delivery of my order.",
  "I acknowledge that this website is a personal project and not a real store.",
  "I acknowledge that my information won't be stored or used for any other purposes.",
];
const firstInputs = [
  "First Name",
  "Last Name",
  "Address Line 1",
  "Address Line 2",
];

function UserInfo({ setIsProceedingToPaymentHandler }) {
  const [isAllCheckboxesChecked, setIsAllCheckboxesChecked] = useState(false);
  const allInputsValidity = useSelector((state) => state.bag.checkoutInputs);
  const setIsAllCheckboxesCheckedHandler = (value) => {
    setIsAllCheckboxesChecked(value);
  };

  const isAllInputsValid = allInputsValidity.reduce((prevBool, item) => {
    return item.isValid && prevBool;
  }, true);

  const isAbleToContinueToPayment = isAllCheckboxesChecked && isAllInputsValid;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 5,
          flexDirection: { xs: "column-reverse", md: "row" },
        }}
      >
        <FormGroup sx={{ maxWidth: 450 }}>
          <Box>
            <Typography sx={{ fontWeight: 500, fontSize: "1.5rem", mb: 2 }}>
              Enter your name and address:
            </Typography>
            {firstInputs.map((input) => {
              const required = input === "Address Line 2" ? false : true;
              return <Input label={input} required={required} key={input} />;
            })}
            <Box>
              <Box display="flex">
                <Input label="Postal Code" type="postal" sx={{ mr: 2 }} />
                <Input label="City" />
              </Box>
              <Box display="flex">
                <Input
                  label="Province"
                  sx={{ mr: 2 }}
                  type="select"
                  data={provinces}
                />
                <Input label="Country" defaultValue="Canada" />
              </Box>
            </Box>
            <Box mt={8}>
              <Typography sx={{ fontWeight: 500, fontSize: "1.5rem", mb: 2 }}>
                Enter your contact info:
              </Typography>
              <Input label="Email" placeholder="john@doe.com" type="email" />
              <Input
                label="Phone Number"
                placeholder="123-456-7890"
                type="phone"
              />
            </Box>
            <Box display="flex" flexDirection="column" mt={8}>
              <CheckboxGroup
                data={agreementInputs}
                setIsFullyChecked={setIsAllCheckboxesCheckedHandler}
              />
              <Button
                disabled={!isAbleToContinueToPayment}
                sx={{ mt: 4 }}
                variant="contained"
                fullWidth
                onClick={setIsProceedingToPaymentHandler}
              >
                Proceed to payment
              </Button>
            </Box>
          </Box>
        </FormGroup>
        <BagSummary />
      </Box>
    </>
  );
}

export default UserInfo;

UserInfo.propTypes = {
  setIsProceedingToPaymentHandler: PropTypes.func.isRequired,
};

import { Box } from "@mui/material";
import ItemBox from "./ItemBox";
import BagSummary from "../BagSummary";
import PropTypes from "prop-types";

function BagItems({ disableSummary = false, currentBag }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: { xs: "column-reverse", md: "row" },
      }}
    >
      <Box>
        {currentBag.items.map((item) => {
          const uniqueItemId = item.gender + item.id + item.size;

          return (
            <ItemBox item={item} key={uniqueItemId} readOnly={disableSummary} />
          );
        })}
      </Box>
      {!disableSummary && (
        <BagSummary checkoutButton={true} currentBag={currentBag} />
      )}
    </Box>
  );
}

export default BagItems;

BagItems.propTypes = {
  disableSummary: PropTypes.bool,
  currentBag: PropTypes.object.isRequired,
};

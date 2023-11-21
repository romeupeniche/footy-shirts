import { Box, Typography, styled, useScrollTrigger } from "@mui/material";
import { useSelector } from "react-redux";

const HLText = styled(Typography)(({ theme }) => ({
  display: "inline",
  color: theme.palette.secondary.light,
  fontSize: "inherit",
}));

function BagNotification() {
  const trigger = useScrollTrigger();
  const [isBagShown, item] = useSelector((state) => state.bag.bagNotification);
  const isRemoving = !!item.isRemoving;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        position: "fixed",
        top: !trigger ? 60 : 0,
        left: 0,
        right: 0,
        backgroundColor: "background.header",
        backdropFilter: "blur(5px)",
        color: "white",
        transition: "all 0.3s ease-in-out",
        transform: isBagShown ? "translateY(0)" : "translateY(-200%)",
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        zIndex: 100,
      }}
    >
      <Typography
        component="span"
        textAlign="center"
        sx={{ fontSize: { xs: ".8rem", md: "1rem" } }}
      >
        <HLText>{item.name}</HLText> for <HLText>{item.gender}</HLText>, Size{" "}
        <HLText>{item.size}</HLText>,{" "}
        {isRemoving ? "was removed from your bag." : "was added to your bag."}
      </Typography>
    </Box>
  );
}

export default BagNotification;

import {
  Box,
  Button,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

function calculateSize(userChest, userWaist) {
  const sizes = [
    { name: "S", chestRange: [88, 96], waistRange: [73, 81] },
    { name: "M", chestRange: [96, 104], waistRange: [81, 89] },
    { name: "L", chestRange: [104, 112], waistRange: [89, 97] },
    { name: "XL", chestRange: [112, 124], waistRange: [97, 109] },
  ];

  let closestSize = null;
  let minDistance = Number.MAX_SAFE_INTEGER;

  for (const size of sizes) {
    const chestDistance = Math.min(
      Math.abs(userChest - size.chestRange[0]),
      Math.abs(userChest - size.chestRange[1])
    );
    const waistDistance = Math.min(
      Math.abs(userWaist - size.waistRange[0]),
      Math.abs(userWaist - size.waistRange[1])
    );
    const totalDistance = chestDistance + waistDistance;

    if (totalDistance < minDistance) {
      closestSize = size.name;
      minDistance = totalDistance;
    }
  }

  return closestSize;
}

const rows = [
  {
    bodyPart: "Chest Size",
    s: "88 - 96",
    m: "96 - 104",
    l: "104 - 112",
    xl: "112 - 124",
  },
  {
    bodyPart: "Waist Size",
    s: "73 - 81",
    m: "81 - 89",
    l: "89 - 97",
    xl: "97-  109",
  },
  {
    bodyPart: "Hip Size",
    s: "88 - 96",
    m: "96 - 104",
    l: "104 - 112",
    xl: "112 - 124",
  },
];

function GetSize() {
  const [userWaist, setUserWaist] = useState(null);
  const [userChest, setUserChest] = useState(null);
  const [idealSize, setIdealSize] = useState(null);

  const setIdealSizeHandler = () => {
    setIdealSize(calculateSize(userChest, userWaist));
  };

  const handleUserWaistChange = (event) => {
    setUserWaist(+event.target.value);
  };

  const handleUserChestChange = (event) => {
    setUserChest(+event.target.value);
  };

  const isButtonClickable =
    userChest !== 0 &&
    userWaist !== 0 &&
    userChest !== null &&
    userWaist !== null;

  return (
    <Box
      sx={{
        mt: 10,
        p: { xs: 3, md: 10 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        borderRadius: 5,
      }}
    >
      <Typography variant="h4" sx={{ mb: 4 }}>
        Don&apos;t know your ideal size? Try this.
      </Typography>
      {idealSize && (
        <Typography
          variant="h5"
          component="span"
          color="secondary"
          sx={{ mb: 2 }}
        >
          Your ideal size is: {idealSize}
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          width: { xs: "100%", md: "fit-content" },
        }}
      >
        <TextField
          label="Waist Size"
          placeholder="74"
          type="number"
          onChange={handleUserWaistChange}
          InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
          }}
        />
        <TextField
          label="Chest Size"
          placeholder="90"
          type="number"
          onChange={handleUserChestChange}
          sx={{ mx: { xs: 0, md: 2 } }}
          InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
          }}
        />
        <Button
          variant="outlined"
          disabled={!isButtonClickable}
          onClick={setIdealSizeHandler}
        >
          Calculate
        </Button>
      </Box>
      <TableContainer sx={{ mt: 5, boxShadow: "none" }}>
        <Typography sx={{ textAlign: "center", fontSize: "1.5rem" }}>
          Size Guide
        </Typography>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Size</TableCell>
              <TableCell align="right">S</TableCell>
              <TableCell align="right">M</TableCell>
              <TableCell align="right">L</TableCell>
              <TableCell align="right">XL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.bodyPart}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.bodyPart}
                </TableCell>
                <TableCell align="right">{row.s}</TableCell>
                <TableCell align="right">{row.m}</TableCell>
                <TableCell align="right">{row.l}</TableCell>
                <TableCell align="right">{row.xl}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default GetSize;

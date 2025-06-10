import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function sortOrder() {
  return (
    <Box>
      <FormControl>
        <InputLabel></InputLabel>
        <Select>
          <MenuItem>5</MenuItem>
          <MenuItem>10</MenuItem>
          <MenuItem>15</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function SelectedPageSize({
  SelectedPageSize,
  onChangePageSize
}) {
  const handleChange = (event: SelectChangeEvent) => {
    onChangePageSize(Number(event.target.value))
  };

  return (
    <div>
      <FormControl sx={{ m: 0.5, minWidth: 70 }}>
        <InputLabel id="demo label">Page Size</InputLabel>
        <Select
          labelId="demo-label"
          id="demo"
          value={SelectedPageSize}
          onChange={handleChange}
          autoWidth
          label="Page Size"
        >
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={12}>12</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

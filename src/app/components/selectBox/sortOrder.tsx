import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function SortOrder({ selectedOrder, searchParams, router }) {
  const handleChange = (event: SelectChangeEvent) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortField", "createdDate");
    params.set("order", event.target.value ?? "");
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };
  return (
    <div className="h-8">
      <FormControl sx={{ m: 0.5, minWidth: 90 }}>
        <InputLabel id="demo-label">Created Date</InputLabel>
        <Select
          labelId="demo-label"
          id="demo"
          value={selectedOrder}
          onChange={handleChange}
          autoWidth
          label="Created Date"
        >
          <MenuItem value="asc">Asc</MenuItem>
          <MenuItem value="desc">Desc</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

"use client"

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';

export default function selectStatus({
    selectStatus,
    searchParams,
    router
}) {
    const handleChange = (event: SelectChangeEvent) => {
        console.log(event.target.value)
        const params = new URLSearchParams(searchParams.toString());
        params.set("status", event.target.value ?? "");
        params.set("page","1");
        router.push(`?${params.toString()}`)
    }

    return(
        <div>
            <FormControl sx={{ m: 0.5, minWidth:90}}>
                <InputLabel id="demo-label">Status</InputLabel>
                <Select 
                labelId='demo-label'
                id = 'demo'
                value={selectStatus}
                onChange={handleChange}
                autoWidth
                label="Status"
                >
                    <MenuItem value = "">All
                    </MenuItem>
                    <MenuItem value="true">Done</MenuItem>
                    <MenuItem value="false">Pending</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}
'use client'
import Box from "@mui/material/Box";
import MenuItem from "./menuItem";
import { Drawer } from "./drawerUtils";
import CssBaseline from "@mui/material/CssBaseline";

interface Props {
  open?: boolean;
}

export default function DrawerContent(props: Props) {
  const { open } = props;
  return (
    <Box display={"flex"} position={"relative"} sx={{mt: 8}} color="Background">
      <CssBaseline />
      <Drawer variant="permanent" open={open} color="primary" anchor="left">
        <MenuItem open />
      </Drawer>
    </Box>
  );
}

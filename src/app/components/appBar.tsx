import React from "react";
import AppBar, { AppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

interface Props extends AppBarProps {
  open?: boolean;
  handleMenu: () => void;
}

export const ButtonAppBar = (props: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={props.handleMenu}
          >
            {props.open ? <MenuIcon /> : <MenuOpenIcon />}
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            DashBoard
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

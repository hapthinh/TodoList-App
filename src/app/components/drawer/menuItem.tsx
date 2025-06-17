import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from '@mui/icons-material/Home';
import { signOutBtn as SignOutBtn} from "../btn/signOutBtn";
import ListItemText from "@mui/material/ListItemText";
import { signOut } from "next-auth/react";

export default function MenuItem({ open }: { open: boolean }) {
  return (
    <List>
      {["Home", "Sign Out"].map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton
            sx={[
              { minHeight: 8 },
              open
                ? {
                    justifyContent: "initial",
                  }
                : {
                    justifyContent: "center",
                  },
            ]}
          >
            <ListItemIcon>
              {index % 2 == 0 ? <HomeIcon /> : <SignOutBtn />}
            </ListItemIcon>
            <ListItemText primary={text} sx={[open ? {opacity: 1} : {opacity: 0}]} onClick={() => signOut({redirect:true, callbackUrl:"/"})}>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

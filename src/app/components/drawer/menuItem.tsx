import {ListItem,ListItemButton, List, ListItemIcon, ListItemText } from '@mui/material'

import HomeIcon from '@mui/icons-material/Home';
import { signOutBtn as SignOutBtn} from "../btn/signOutBtn";
import { signOut } from "next-auth/react";
import { redirect } from 'next/navigation';

export default function MenuItem({ open }: { open: boolean }) {
  const handleOnClick = (index) => {
    if(index%2 == 0) {
      redirect("/todolist")
    }else{
      signOut({redirect: true, callbackUrl:"/"})
    }
  }
  return (
    <>
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
            onClick={() => handleOnClick(index)}
          >
            <ListItemIcon>
              {index % 2 == 0 ? <HomeIcon /> : <SignOutBtn />}
            </ListItemIcon>
            <ListItemText primary={text} sx={[open ? {opacity: 1} : {opacity: 0}]}>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    </>
  );
}

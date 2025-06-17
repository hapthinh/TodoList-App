import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from '@mui/icons-material/Home';
import { signOutBtn as SignOutBtn} from "../btn/signOutBtn";
import ListItemText from "@mui/material/ListItemText";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function MenuItem({ open }: { open: boolean }) {
  /*
  const {data} = useSession()
  const userName = data.user.name;
  console.log(userName);
  */
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
            onClick={() => {index%2 == 0 ? redirect("/todolist") : signOut({redirect: true, callbackUrl:"/"})}}
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

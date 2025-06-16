import { signOut } from "next-auth/react";
import LogoutIcon from "@mui/icons-material/Logout";

export function signOutBtn() {
  return (
      <button
        className="text-black hover:scale-150 text-3xl"
        onClick={() => signOut({ redirect: false, callbackUrl: "/" })}
      >
        <LogoutIcon fontSize="large" />
      </button>
  );
}

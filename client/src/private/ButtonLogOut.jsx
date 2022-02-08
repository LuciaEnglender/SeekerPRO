import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ButtonLogOut = ({ estilo }) => {
  const { logout } = useAuth0();
  return (
    <button className={estilo} onClick={() => logout()} id="qsLogOutBtn">
      Log Out
    </button>
  );
};

export default ButtonLogOut;

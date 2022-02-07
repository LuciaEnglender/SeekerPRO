import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ButtonLogout = ({ estilo }) => {
  const { logout } = useAuth0();

  return (
    <div>
      <button className={estilo} onClick={() => logout()}>
        Log Out
      </button>
    </div>
  );
};

export default ButtonLogout;

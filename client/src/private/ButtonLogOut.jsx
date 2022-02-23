import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ButtonLogOut = ({ estilo }) => {
  const { logout } = useAuth0();
  return (
    <button className="bg-gray-50 ml-4 justify-start hover:bg-nuevoFondo text-black hover:text-white" onClick={() => logout()} id="qsLogOutBtn">
      LogOut
    </button>
  );
};

export default ButtonLogOut;

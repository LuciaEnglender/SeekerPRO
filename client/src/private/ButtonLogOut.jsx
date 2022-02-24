import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ButtonLogOut = ({ estilo }) => {
  const { logout } = useAuth0();
  return (
    <button
      className=" justify-start w-full hover:text-white hover:bg-nuevoFondo text-gray-500"
      onClick={() => logout()}
      id="qsLogOutBtn"
    >
      LogOut
    </button>
  );
};

export default ButtonLogOut;

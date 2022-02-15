import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const ButtonLogIn = ({ estilo }) => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="p-4 py-1 inline-block bg-gradient-to-r to-gray-700 from-colorFondo3 text-white font-bold rounded-3xl filter hover:drop-shadow"
      onClick={() => loginWithRedirect()}
      id="qsLoginBtn"
    >
      LogIn
    </button>
  );
};

export const ButtonLogOutLanding = ({ estilo }) => {
  const { logout } = useAuth0();
  return (
    <button
      className="p-4 py-1 inline-block bg-gradient-to-r to-colorBoton from-colorFondo3 text-white font-bold rounded-3xl filter hover:drop-shadow"
      onClick={() => logout()}
      id="qsLoginBtn"
    >
      LogOut
    </button>
  );
};

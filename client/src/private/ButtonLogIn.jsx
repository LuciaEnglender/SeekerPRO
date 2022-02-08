import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ButtonLogIn = ({ estilo }) => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="p-4 py-2 inline-block bg-gradient-to-r from-verdeClaro to-verdeMedio text-white font-bold rounded-3xl filter hover:drop-shadow"
      onClick={() => loginWithRedirect()}
      id="qsLoginBtn"
    >
      Log In
    </button>
  );
};

export default ButtonLogIn;

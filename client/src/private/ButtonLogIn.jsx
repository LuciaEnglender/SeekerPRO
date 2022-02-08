import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ButtonLogIn = ({ estilo }) => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className={estilo}
      onClick={() => loginWithRedirect()}
      id="qsLoginBtn"
    >
      Log In
    </button>
  );
};

export default ButtonLogIn;

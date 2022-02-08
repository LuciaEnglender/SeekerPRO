import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ButtonLogIn = () => {
  const { loginWithRedirect } = useAuth0;
  return (
    <button
      className="hover:opacity-100 opacity-70 text-lg"
      onClick={() => loginWithRedirect()}
      id="qsLoginBtn"
    >
      Log In
    </button>
  );
};

export default ButtonLogIn;

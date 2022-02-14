import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ButtonSignIn = () => {
  const { signUp } = useAuth0();
  return (
    <button
      className="p-4 ml-2 py-2 inline-block bg-gradient-to-r to-verdeClaro from-verdeMedio text-white font-bold rounded-3xl filter hover:drop-shadow"
      onClick={() => signUp()}
      id="qsLogOutBtn"
    >
      Sign In
    </button>
  );
};

export default ButtonSignIn;

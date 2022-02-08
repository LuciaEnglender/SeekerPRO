import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ButtonLogOut = () => {
  const { logout } = useAuth0;
  return (
    <button
      className="block px-4 hover:bg-verdeHover py-2 text-sm text-gray-700"
      onClick={() => logout()}
      id="qsLogoutBtn"
    >
      Log Out
    </button>
  );
};

export default ButtonLogOut;

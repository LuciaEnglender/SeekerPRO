import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ButtonLogin = () => {
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();

  return (
    <div>
      <button onClick={() => loginWithRedirect()}>{isAuthenticated? isAuthenticated && (
   <div ><img className="h-100 w-100 rounded-full" alt=""
     src={user.picture} /> <p> Come in..</p></div>
 ) : <p>LOG IN</p>}</button>
    </div>
  );
};

export default ButtonLogin;

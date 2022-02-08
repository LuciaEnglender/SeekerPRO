import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import JSONPretty from "react-json-pretty";

const Info = () => {
  const { user, isAuthenticated } = useAuth0();
  console.log(user);
  return (
    <div>
      {isAuthenticated ? (
        <div>
          {" "}
          <h2>{user.name}</h2> <JSONPretty data={user} />{" "}
        </div>
      ) : (
        <p>asdas</p>
      )}
    </div>
  );
};

export default Info;

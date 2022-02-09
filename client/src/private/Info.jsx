import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import JSONPretty from "react-json-pretty";
import { postEmail } from "../redux/actions/indexL";

const Info = () => {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    email: "",
    photo: "",
    profile: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postEmail(input));
    console.log(input);
    setInput({
      name: user.name,
      email: user.email,
      photo: user.picture,
      profile: "BUSINESS",
    });
  }

  return (
    <div>
      <button onClick={(e) => handleSubmit(e)}> MANDELE</button>
      <JSONPretty data={user} />
    </div>
  );
};

export default Info;

import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getEmail } from "../redux/actions";

const Info = () => {
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const email = user.email;
  
  console.log(email);
  function handleSubmit() {
    e.preventDefault()
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getEmail({email: email,
      profile: "BUSINESS",}));
      
    };
  }
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div>
      <form onClick={(e) => handleSubmit(e)}>
        <input value={input.name} onChange={(e) => handleChange(e)} />
        <input value={input.profile} onChange={(e) => handleChange(e)} />
      </form>
    </div>
  );
};

export default Info;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/actions/indexL";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import SectionNuevo from "../component/pages/SectionNuevo";
import Carganding from "../component/pages/Carganding";

function Register() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();
  const [input, setInput] = useState(<Carganding />);
  const profileState = useSelector(
    (state) => state.rootReducerLanding.perfiles
  );
  const email = JSON.stringify(user.email);
  const email2 = email.substring(1, email.length - 1);

  useEffect(() => {
    dispatch(getUsers(email2));
    const timer = setTimeout(() => {
      setInput(<SectionNuevo />);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {profileState.email === undefined ? (
        input
      ) : profileState.profile === "DEVELOPER" ? (
        <Navigate to="/homep" />
      ) : (
        <Navigate to="/homee" />
      )}
    </>
  );
}

export default Register;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SectionNuevo from "../component/pages/SectionNuevo";
import { getUsers } from "../redux/actions/indexL";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

function Register() {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const profileState = useSelector(
    (state) => state.rootReducerLanding.perfiles
  );

  const email = JSON.stringify(user.email);

  const email2 = email.substring(1, email.length - 1);

  useEffect(() => {
    dispatch(getUsers(email2));
  }, []);

  return (
    <>
      {email === undefined ? (
        <h2> Cargando.... </h2>
      ) : profileState.email === undefined ? (
        <SectionNuevo></SectionNuevo>
      ) : profileState.profile === "DEVELOPER" ? (
        <Navigate to="/homep" />
      ) : (
        <Navigate to="/homee" />
      )}
    </>
  );
}

export default Register;

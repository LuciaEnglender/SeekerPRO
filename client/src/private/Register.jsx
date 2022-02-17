import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SectionViejo from "../component/pages/SectionViejo";
import SectionNuevo from "../component/pages/SectionNuevo";
import { getUsers } from "../redux/actions/indexL";
import { ButtonLogOutLanding } from "./ButtonLogIn";
import { useAuth0 } from "@auth0/auth0-react";

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
      {profileState.email === undefined ? (
        <SectionNuevo></SectionNuevo>
      ) : (
        <SectionViejo></SectionViejo>
      )}
    </>
  );
}

export default Register;

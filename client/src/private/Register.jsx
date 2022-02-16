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
    console.log(profileState.email);
    dispatch(getUsers(email2));
  }, []);

  return (
    <div className="bg-colorFondo2 h-screen">
      <nav className="p-4 px-10 md:px-16 grid grid-cols-2">
        <h3 className="font-bold md:text-5xl text-2xl">JSeekers</h3>
        <div>
          <div className="float-right">
            <div className="float-right">
              <ButtonLogOutLanding />
            </div>
          </div>
        </div>
      </nav>
      <section>
        {profileState.email === undefined ? (
          <SectionNuevo></SectionNuevo>
        ) : (
          <SectionViejo></SectionViejo>
        )}
      </section>
    </div>
  );
}

export default Register;

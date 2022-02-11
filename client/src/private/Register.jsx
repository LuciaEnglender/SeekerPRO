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
    const element = email2;
    console.log(profileState.email);
    dispatch(getUsers(element));
  }, []);

  return (
    <div className="p-9 bg-gray-300">
      <nav className=" grid grid-cols-2">
        <h3 className="font-bold  text-2xl">JSeekers</h3>
        <div>
          <div className="float-right">
            <div className="float-right">
              <ButtonLogOutLanding />
            </div>
          </div>
        </div>
      </nav>
      <section className="px-16 mt-32 mb-32">
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

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SectionViejo from "../component/pages/SectionViejo";
import SectionNuevo from "../component/pages/SectionNuevo";
import { getUsers } from "../redux/actions/indexL";
import { ButtonLogOutLanding } from "./ButtonLogIn";

function Register() {
  const dispatch = useDispatch();
  const perfiles = useSelector((state) => state.rootReducerLanding.perfiles);

  useEffect(() => {
    console.log(perfiles);
    dispatch(getUsers(perfiles));
  }, [dispatch]);

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
        {perfiles ? (
          <SectionNuevo></SectionNuevo>
        ) : (
          <SectionViejo></SectionViejo>
        )}
      </section>
    </div>
  );
}

export default Register;

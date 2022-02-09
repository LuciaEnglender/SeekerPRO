import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ButtonLogOutLanding } from "./ButtonLogIn";
import { getUsers } from "../redux/actions/indexL";
import { useDispatch, useSelector } from "react-redux";
import SectionNuevo from "../component/pages/SectionNuevo";
import SectionViejo from "../component/pages/SectionViejo";

function Register() {
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.rootReducer.perfiles);

  useEffect(() => {
    dispatch(getUsers(profileState.email));
  });

  return (
    <body className="p-9 bg-gray-300">
      <nav className=" grid grid-cols-2">
        <Link to="/">
          <h3 className="font-bold  text-2xl">JSeekers</h3>
        </Link>
        <div>
          <div className="float-right">
            <div className="float-right">
              <ButtonLogOutLanding />
            </div>
            <a
              href="#about"
              className="hover:opacity-100 opacity-70 text-lg mr-4"
            >
              About
            </a>
            <a
              href="#about"
              className="hover:opacity-100 mr-4 opacity-70 text-lg"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>
      <div>
        <div className="px-16 mt-32 mb-32">
          {/* {profileState.profile === "nuevo" ? (
            <SectionNuevo></SectionNuevo>
          ) : (
            <SectionViejo></SectionViejo>
          )} */}
        </div>
      </div>
      ;
    </body>
  );
}

export default Register;

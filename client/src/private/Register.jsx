import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SectionViejo from "../component/pages/SectionViejo";
import SectionNuevo from "../component/pages/SectionNuevo";
import { getUsers } from "../redux/actions/indexL";
import { ButtonLogOutLanding } from "./ButtonLogIn";

function Register() {
  const dispatch = useDispatch();
  const profileState = useSelector(
    (state) => state.rootReducerLanding.perfiles
  );

  let asdasd = profileState.email;

  useEffect(() => {
    console.log(asdasd);
    dispatch(getUsers("devmontini@gmail.com"));
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
        <div className="grid grid-cols-2">
          <div>
            <h2 className="text-5xl font-bold pb-4">Welcome!</h2>
            <p className="pb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora,
              sapiente vero temporibus ullam voluptatibus modi maxime quis
              minima dicta iure hic, molestiae libero veritatis quos.
            </p>
            {asdasd === undefined ? (
              <SectionNuevo></SectionNuevo>
            ) : (
              <SectionViejo></SectionViejo>
            )}
          </div>
          <div>
            <img className="max-w-sm" src="/Landing.png" alt="asd" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;

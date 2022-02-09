import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ButtonsHomeE, ButtonsHomeP } from "../../private/ButtonsHome";
import { getUsers } from "../../redux/actions/indexL";
import { useDispatch, useSelector } from "react-redux";

const SectionViejo = () => {
  const dispatch = useDispatch();
  const profileState = useSelector(
    (state) => state.rootReducerLanding.perfiles
  );

  useEffect(() => {
    dispatch(getUsers(profileState.email));
  }, [dispatch, profileState]);

  return (
    <div className="grid grid-cols-2">
      <div>
        <h2 className="text-5xl font-bold pb-4">Welcome!</h2>
        <p className="pb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora,
          sapiente vero temporibus ullam voluptatibus modi maxime quis minima
          dicta iure hic, molestiae libero veritatis quos.
        </p>

        <h3 className="text-xl pl-3 font-bold pb-4">
          {profileState.profile === "BUSINESS" ? (
            <ButtonsHomeE />
          ) : (
            <ButtonsHomeP />
          )}
        </h3>
      </div>
      <div>
        <img className="max-w-sm" src="/Landing.png" alt="asd" />
      </div>
    </div>
  );
};

export default SectionViejo;

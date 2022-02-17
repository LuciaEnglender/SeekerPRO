import React, { useEffect } from "react";
import { ButtonsHomeE } from "../../private/ButtonsHomeE";
import { ButtonsHomeP } from "../../private/ButtonsHomeP";
import { getUsers } from "../../redux/actions/indexL";
import { useDispatch, useSelector } from "react-redux";

const SectionViejo = () => {
  const dispatch = useDispatch();
  const profileState = useSelector(
    (state) => state.rootReducerLanding.perfiles
  );

  useEffect(() => {
    dispatch(getUsers(profileState.email));
  }, []);

  return (
    <div className="grid grid-cols-2">
      <div>
        <h2 className="text-5xl font-bold pb-4">Welcome!</h2>
        <p className="pb-4">
        JSeeker, the application that emerges to efficiently connect developers and recruiters.
        
        
        </p>
        <h3 className="text-xl pl-3 font-bold pb-4">
          {profileState.profile === "DEVELOPER" ? (
            <ButtonsHomeP />
          ) : (
            <ButtonsHomeE />
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
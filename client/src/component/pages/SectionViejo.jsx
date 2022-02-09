import React, { useEffect } from "react";
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
        <h3 className="text-xl pl-3 font-bold pb-4">
          {profileState.profile === "DEVELOPER" ? (
            <ButtonsHomeP />
          ) : (
            <ButtonsHomeE />
          )}
        </h3>
      </div>
    </div>
  );
};

export default SectionViejo;

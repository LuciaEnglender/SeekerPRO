import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/actions/index";

import NavHomeE from "./modules/NavHomeE";

const PerfilEmp = () => {
  const dispatch = useDispatch();
  const empresa = useSelector((state) => state.rootReducer.business);
  console.log(empresa);
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    dispatch(getProfile("franco"));
  }, [dispatch]);

  return (
    <div>
      <NavHomeE titulo={"PerfilUser"} />

      <div>
        {isAuthenticated && (
          <div>
            <h1> Nombre: {empresa[0].name} </h1>
            <img
              className="h-300 w-300 rounded-full"
              src={user.picture}
              alt=""
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PerfilEmp;

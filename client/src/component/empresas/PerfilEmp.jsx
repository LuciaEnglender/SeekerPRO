import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/actions/index";

import NavHomeE from "./modules/NavHomeE";

const PerfilEmp = () => {
  const dispatch = useDispatch();
  
  const { user, isAuthenticated } = useAuth0();

  const email = JSON.stringify(user.email);
  const email2 = email.substring(1, email.length - 1);

  useEffect(() => {
    dispatch(getProfile(email2));
    console.log(empresa);
  }, [dispatch]);
  //lo pongo abajo porque primero se monta la action
  const empresa = useSelector((state) => state.rootReducer.business);
  return (
    <div>
      <NavHomeE titulo={"PerfilUser"} />
      <div className={"lex m-0 justify-content"}>
        <div className="flex m-0 justify-content">
          <h1> Nombre: {empresa.name} </h1>
        </div>
        <div className="flex m-0 justify-content">
          {isAuthenticated && (
            <img
              className="h-300 w-300 rounded-full"
              src={user.picture}
              alt=""
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PerfilEmp;

import React from "react";
import { Link } from "react-router-dom";
import NavHomeE from "./modules/NavHomeE";

const NotiEmp = () => {
  return (
    <div>
      <NavHomeE titulo={"Notificaciones"} />
      <Link to="/homee">
        <button>go back</button>
      </Link>
    </div>
  );
};

export default NotiEmp;

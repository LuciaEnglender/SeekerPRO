import React from "react";
import { Link } from "react-router-dom";
import NavHomeE from "./modules/NavHomeE";

const SetingsEmp = () => {
  return (
    <div>
      <NavHomeE titulo={"Setings"} />
      <Link to="/homee">
        <button>Volver</button>
      </Link>
    </div>
  );
};

export default SetingsEmp;

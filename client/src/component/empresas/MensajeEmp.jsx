import React from "react";
import { Link } from "react-router-dom";
import NavHomeE from "./modules/NavHomeE";

const MensajeEmp = () => {
  return (
    <div>
      <NavHomeE titulo={"Mensajes"} />
      <Link to="/homee">
        <button>Volver</button>
      </Link>
    </div>
  );
};

export default MensajeEmp;

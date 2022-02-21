import React from "react";
import { Link } from "react-router-dom";
import NavHomeE from "./modules/NavHomeE";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, getProfile } from "../../redux/actions/index";
import { useAuth0 } from "@auth0/auth0-react";

const CompraPlan = () => {
  const { user } = useAuth0();

  const email = JSON.stringify(user.email);
  const email2 = email.substring(1, email.length - 1);

  const dispatch = useDispatch();

  function handleClick(e) {
    dispatch(createOrder(email2));
  }

  return (
    <div className="min-h-full">
      {/* NAVEGACION */}
      <NavHomeE />
      {/* BODY */}

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Home</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div>
            <h1>Suscribite a nuestro plan premium!</h1>
            {/* <button onClick={(e) => handleClick(e)}> */}
            <Link to="/homee/mercado">Hacé click acá!</Link>
            {/* </button> */}
          </div>
          <Link to="/homee">
            <button>Volver</button>
          </Link>
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
};

export default CompraPlan;

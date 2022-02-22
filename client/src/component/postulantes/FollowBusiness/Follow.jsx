import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { followBusiness } from "../../../redux/actions/indexP";

/*recibo por destructuring id de la vacante y dispatcho un post?*/

function Follow({ id }) {
  const postulanteId = useSelector(
    (state) => state.rootReducerPostulante.profile[0].id
  );
  console.log("postulanteId", postulanteId, "businessId", id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick() {
    dispatch(followBusiness(postulanteId, id));
    alert("Now you're following this business");
    navigate("/homep");
  }

  return (
    <div>
      <button
        className="rounded-xl  bg-gradient-to-t px-3 text-white hover:opacity-25 to-black from-nuevoFondo mt-1 mx-1"
        onClick={() => handleClick()}
      >
        follow
      </button>
    </div>
  );
}

export default Follow;

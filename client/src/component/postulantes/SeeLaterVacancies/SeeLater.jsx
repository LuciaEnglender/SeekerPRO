import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { seeLater } from "../../../redux/actions/indexP";

function SeeLater({ id }) {
  const postulanteId = useSelector(
    (state) => state.rootReducerPostulante.profile[0].id
  );
  //console.log(id, postulanteId)
  const dispatch = useDispatch();

  function handleMasTarde() {
    dispatch(seeLater(id, postulanteId));
    alert("You can see this vacancy later, dont forget it!");
  }

  return (
    <div>
      <button
        className="rounded-xl  bg-gradient-to-t px-3 text-white hover:opacity-25 to-black from-nuevoFondo mt-1 mx-1"
        onClick={() => handleMasTarde()}
      >
        {" "}
        Fav{" "}
      </button>
    </div>
  );
}

export default SeeLater;

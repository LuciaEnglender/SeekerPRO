import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { seeLater } from "../../../redux/actions/indexP";
import swal from "sweetalert";

function SeeLater({ id }) {
  const postulanteId = useSelector(
    (state) => state.rootReducerPostulante.profile[0].id
  );
  //console.log(id, postulanteId)
  const dispatch = useDispatch();

  function handleMasTarde() {
    dispatch(seeLater(id, postulanteId));
    swal({
      icon: "info",
      title: "Saved",
      text: "You can see this vacancy later, dont forget it!",
      width: "90%",
      padding: "2em",
      color: "#716add",
    });
  }

  return (
    <div>
      <button
        className="rounded-xl  bg-gradient-to-t px-3 text-white hover:opacity-25 to-black from-nuevoFondo mt-1 mx-1"
        onClick={() => handleMasTarde()}
      >
        {" "}
        Save{" "}
      </button>
    </div>
  );
}

export default SeeLater;

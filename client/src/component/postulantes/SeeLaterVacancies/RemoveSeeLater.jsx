import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeSeeLater } from "../../../redux/actions/indexP";

function RemoveSeeLater({ id }) {
  const postulanteId = useSelector(
    (state) => state.rootReducerPostulante.profile[0].id
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleRemove(e) {
    e.preventDefault();
    dispatch(removeSeeLater(id, postulanteId));
    navigate(-1);
  }
  return (
    <div>
      <button
        className="rounded-xl  bg-gradient-to-t px-3 text-white  hover:opacity-25 to-black from-nuevoFondo mt-1 mx-1"
        onClick={(e) => handleRemove(e)}
      >
        {" "}
        Remove{" "}
      </button>
    </div>
  );
}

export default RemoveSeeLater;

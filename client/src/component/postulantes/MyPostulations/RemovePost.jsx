import React, { useEffect } from "react";
import { removePost, removePipeline } from "../../../redux/actions/indexP";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function RemovePost({ id }) {
  const postulanteId = useSelector(
    (state) => state.rootReducerPostulante.profile[0].id
  );
  // console.log(id)
  //console.log(postulanteId)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleRemove() {
    dispatch(removePost(id, postulanteId));
    alert("This applied was remove");
    dispatch(removePipeline(id, postulanteId));
    navigate("/homep");
  }
  return (
    <div>
      <button
        className="h-fit mx-4 px-2  my-2 shadow-lg mt-1 
  shadow-black rounded-2xl 
   text-white bg-nuevoFondo hover:bg-verdeClaro hover:text-black"
        onClick={() => handleRemove()}
      >
        {" "}
        Remove{" "}
      </button>
    </div>
  );
}

export default RemovePost;

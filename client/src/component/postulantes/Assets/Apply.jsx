import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  apply,
  toPipeline,
  getProfile,
  chatRoomPost,
} from "../../../redux/actions/indexP";
import { useAuth0, isAuthenticated } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function Apply({ id, businessId }) {
  const postulanteId = useSelector(
    (state) => state.rootReducerPostulante.profile[0].id
  );

  const navigate = useNavigate();
  //console.log("apply", id)
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const email = JSON.stringify(user.email);
  const email2 = email.substring(1, email.length - 1);

  function handleApply() {
    dispatch(apply(id, postulanteId));
    swal({
      icon: "success",
      title: "Great!",
      text: "You applied for this job... good luck!",
      width: "90%",
      padding: "2em",
      color: "#716add",
    });
    dispatch(toPipeline(id, postulanteId));
    dispatch(chatRoomPost(postulanteId, businessId));
    navigate("/homep");
  }

  useEffect(() => {
    dispatch(getProfile(email2));
  }, [dispatch]);

  return (
    <div>
      <button
        className="rounded-xl  bg-gradient-to-t px-3 text-white  hover:opacity-25 to-black from-nuevoFondo mt-1 mx-1"
        onClick={() => handleApply()}
      >
        Apply
      </button>
    </div>
  );
}

export default Apply;

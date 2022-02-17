import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  apply,
  getMyPostulations,
  getProfile,
} from "../../../redux/actions/indexP";
import { useAuth0, isAuthenticated } from "@auth0/auth0-react";

function Apply(id) {
const postulanteId= useSelector((state) => state.rootReducerPostulante.profile[0].id)
console.log("apply", postulanteId)
const  dispatch = useDispatch()
const { user } = useAuth0();
const email = JSON.stringify(user.email);
const email2 = email.substring(1, email.length - 1);

  function handleApply() {
    dispatch(apply(id, postulanteId));
  
    alert("you applied for this job... Good luck!");
  }


  useEffect(() => {
    dispatch(getProfile(email2));
  }, [dispatch]);


  return (
    <div>
      <button onClick={() => handleApply()}> Apply </button>
    </div>
  );
}

export default Apply;

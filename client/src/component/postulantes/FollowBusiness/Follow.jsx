import React from 'react';
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom';
import {followBusiness} from '../../../redux/actions/indexP'

/*recibo por destructuring id de la vacante y dispatcho un post?*/

function Follow({id}) {
  const postulanteId= useSelector((state) => state.rootReducerPostulante.profile[0].id)
  console.log("postulanteId", postulanteId, "businessId", id)
 
const  dispatch = useDispatch()
const navigate = useNavigate()

function handleClick () {
    dispatch(followBusiness(postulanteId, id));
    alert("Now you're following this business")
    navigate("/homep")
}

  return <div>
       <button 
        className="h-fit mx-4 px-2  my-2 shadow-lg mt-1 
        shadow-black rounded-2xl 
         text-verdeHover bg-verdeOscuro hover:bg-verdeClaro"
         onClick ={() => handleClick()}> follow </button>
  </div>;
}

export default Follow;

import React from 'react';
import {useDispatch, useSelector} from "react-redux"
import {followBusiness} from '../../../redux/actions/indexP'

/*recibo por destructuring id de la vacante y dispatcho un post?*/

function Follow(id) {
  const postulanteId= useSelector((state) => state.rootReducerPostulante.profile.id)
const  dispatch = useDispatch()

function handleClick () {
    dispatch(followBusiness(id, postulanteId));
}

  return <div>
       <button onClick ={() => handleClick()}> follow </button>
  </div>;
}

export default Follow;

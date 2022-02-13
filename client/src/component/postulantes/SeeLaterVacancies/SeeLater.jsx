import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {seeLater} from '../../../redux/actions/indexP'


function SeeLater(id) {

const postulanteId= useSelector((state) => state.rootReducerPostulante.profile.id)

const  dispatch = useDispatch()

function handleMasTarde() {
  dispatch(seeLater(id, postulanteId));
}

  return <div>
    <button onClick={()=>handleMasTarde()}> See later... </button>
  </div>;


}

export default SeeLater;

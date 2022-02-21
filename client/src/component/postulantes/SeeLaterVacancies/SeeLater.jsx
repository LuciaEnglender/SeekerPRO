import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {seeLater} from '../../../redux/actions/indexP'


function SeeLater({id}) {

const postulanteId= useSelector((state) => state.rootReducerPostulante.profile[0].id)
console.log(id, postulanteId)
const  dispatch = useDispatch()

function handleMasTarde() {
  dispatch(seeLater(id, postulanteId));
  alert("You can see this vacancy later, dont forget it!")
}

  return <div>
    <button onClick={()=>handleMasTarde()}> See later... </button>
  </div>;


}

export default SeeLater;

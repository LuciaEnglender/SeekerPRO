import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {apply} from '../../../redux/actions/indexP'

function Apply(id) {
const postulanteId= useSelector((state) => state.rootReducerPostulante.profile[0].id)
console.log(id)
console.log(postulanteId)
const  dispatch = useDispatch()

function handleApply() {
  dispatch(apply(id, postulanteId));
}

  return <div>
    <button onClick={()=>handleApply()}> Apply </button>
  </div>;
}

export default Apply;

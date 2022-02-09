import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {apply} from '../../../redux/actions/indexP'

function Apply(id) {
const postulanteId= useSelector((state) => state.rootReducerPostulante.profile[0].id)
console.log(id)
console.log(postulanteId)
const  dispatch = useDispatch()
const navigate = useNavigate()

function handleApply() {
  dispatch(apply(id, postulanteId));
  navigate(1)
}
  return <div>
    <button onClick={()=>handleApply()}> Apply </button>
  </div>;
}

export default Apply;

import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {apply, getMyPostulations} from '../../../redux/actions/indexP'

function Apply(id) {
const postulanteId= useSelector((state) => state.rootReducerPostulante.profile[0].id)
//console.log(id)
//console.log(postulanteId)
const  dispatch = useDispatch()


function handleApply() {
  dispatch(apply(id, postulanteId));
  alert("you applied for this job... Good luck!")
}

useEffect(()=>{
  dispatch(getMyPostulations())
}, [dispatch])

  return <div>
    <button onClick={()=>handleApply()}> Apply </button>
  </div>;
}

export default Apply;

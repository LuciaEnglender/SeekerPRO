import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {removeSeeLater} from '../../../redux/actions/indexP'

function RemoveSeeLater({id}) {
    const postulanteId= useSelector((state) => state.rootReducerPostulante.profile[0].id)
    const  dispatch = useDispatch()
    const navigate = useNavigate()
    function handleRemove(e) {
      e.preventDefault();
        dispatch(removeSeeLater(id, postulanteId));
        navigate(-1)
      }
  return (
    <div><button onClick={(e)=>handleRemove(e)}> Remove </button></div>
  )
}

export default RemoveSeeLater
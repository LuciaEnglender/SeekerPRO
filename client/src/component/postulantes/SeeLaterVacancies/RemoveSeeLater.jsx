import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {removeSeeLater} from '../../../redux/actions/indexP'

function RemoveSeeLater({id}) {
    const postulanteId= useSelector((state) => state.rootReducerPostulante.profile[0].id)
    const  dispatch = useDispatch()
    function handleRemove() {
        dispatch(removeSeeLater(id, postulanteId));
      }
  return (
    <div><button onClick={()=>handleRemove()}> Remove </button></div>
  )
}

export default RemoveSeeLater
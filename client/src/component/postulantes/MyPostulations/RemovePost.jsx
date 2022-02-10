import React, {useEffect} from 'react';
import {removePost} from '../../../redux/actions/indexP'
import {useDispatch, useSelector} from 'react-redux'

function RemovePost({id}) {
    const postulanteId= useSelector((state) => state.rootReducerPostulante.profile[0].id)
   // console.log(id)
    //console.log(postulanteId)
    const  dispatch = useDispatch()
    function handleRemove() {
        dispatch(removePost(id, postulanteId));
      }
  return <div>
 <button onClick={()=>handleRemove()}> Remove Post </button>
  </div>;
}

export default RemovePost;

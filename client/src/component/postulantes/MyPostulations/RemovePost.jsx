import React, {useEffect} from 'react';
import {removePost} from '../../../redux/actions/indexP'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

function RemovePost({id}) {
    const postulanteId= useSelector((state) => state.rootReducerPostulante.profile[0].id)
   // console.log(id)
    //console.log(postulanteId)
    const  dispatch = useDispatch()
    const navigate = useNavigate()
    function handleRemove() {
        dispatch(removePost(id, postulanteId));
        alert ("This applied was remove")
        navigate("/homep")
      }
  return <div>
 <button 
  className="h-fit mx-4 px-2  my-2 shadow-lg mt-1 
  shadow-black rounded-2xl 
   text-verdeHover bg-verdeOscuro hover:bg-verdeClaro"
 onClick={()=>handleRemove()}> Remove Post </button>
  </div>;
}

export default RemovePost;

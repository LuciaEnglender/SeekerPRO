import React, {useEffect} from 'react';
import {unfollow} from '../../../redux/actions/indexP'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

function Unfollow({id}) {
    const postulanteId= useSelector((state) => state.rootReducerPostulante.profile[0].id)
   console.log(id)
    //console.log(postulanteId)
    const  dispatch = useDispatch()
    const navigate = useNavigate()
    function handleUnfollow() {
        dispatch(unfollow(postulanteId, id));
        alert ("Unfollowed business")
        navigate(-1)
      }
  return <div>
 <button 
  className="h-fit mx-4 px-2  my-2 shadow-lg mt-1 
  shadow-black rounded-2xl 
   text-verdeHover bg-verdeOscuro hover:bg-verdeClaro"
   onClick={()=>handleUnfollow()}> unfollow </button>
  </div>;
}

export default Unfollow;

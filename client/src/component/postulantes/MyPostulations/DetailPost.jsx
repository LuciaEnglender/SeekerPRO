import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getMyPostulations } from "../../../redux/actions/indexP"
import RemovePost from './RemovePost';

function DetailPost(props) {
  const dispatch = useDispatch();
 // const id = props.match.params.id 
  const id = 2
const post = useSelector((state) => state.rootReducerPostulante.postulations);
console.log(post)
const detail = post.filter(el => el.postulant_vacancy.vacancyId === id)
//console.log(detail)
useEffect(()=>{
  dispatch(getMyPostulations());  
         
  },[dispatch])
  return (<div> 
        <div
      tabindex="0"
      aria-label="card 1"
      class="focus:outline-none shadow-lg shadow-black rounded-2xl 2xl:w-full mb-7 bg-gray-300 p-6"
    >
   <div class="flex items-center  border-b border-gray-400 pb-6">
     <div class="flex items-start justify-between w-full">
       <div class="pl-3 w-full">
         <p
           tabindex="0"
           class="focus:outline-none text-xl font-medium leading-5 
text-verdeOscuro"
         >
    <div>Apply # {detail[0].postulant_vacancy.vacancyId} </div>
    </p>
    <h1> Empresa: {detail[0].name}</h1>
    <h1> Descripcion: {detail[0].description} </h1>
    <h1> Fecha de creacion: {detail[0].postulant_vacancy.createdAt} </h1>
    <h1>Estado de la postulacion:</h1>
    <div class="py-2 px-4 text-xs leading-3 text-verdeHover rounded-full bg-verdeOscuro">
    <RemovePost
        id= {detail[0].postulant_vacancy.vacancyId}/>
        </div>
        </div>
        </div>
      </div>

    </div>
    </div>
  )
}

export default DetailPost
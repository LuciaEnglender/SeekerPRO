import React, {useEffect}  from "react";
import {useDispatch, useSelector} from 'react-redux'
import {getSeeLater} from '../../../redux/actions/indexP'
import SeeLaterCard from "./SeeLaterCard";
import NavBar from "../NavBar";



function SeeLaterVacancies() {
  const postulanteId= useSelector((state) => state.rootReducerPostulante.profile[0].id)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getSeeLater(postulanteId))
  },[dispatch])
  const pending = useSelector((state) =>state.rootReducerPostulante.pending)
 console.log(pending)

  return (
    <div>
         <div>
    <NavBar />
  </div>
       <div>
        {pending.length === 0  ?<p className=" font-bold text-center my-4 mb-3"> Nothing to see  </p> 
        : 
        <div> 
{pending?.map ( (el)=> {
  return (
    <div className="m-4" key={el.id}>
    <SeeLaterCard
      id = {el.id}
      name={el.name}
      description={el.description}
      languages={el.languages?.map((l) => l.name).join(", ")}
      seniorities={el.seniorities?.map((s) => s.name).join(", ")}
      skills={el.skills?.map((sk) => sk.name).join(", ")}
      technologies={el.technologies?.map((t) => t.name).join(", ")}
    />
  </div>
  )
}) }       
        </div>  } 
        </div>
    </div>
  );
}

export default SeeLaterVacancies;

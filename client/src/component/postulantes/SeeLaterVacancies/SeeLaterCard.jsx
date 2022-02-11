import React from "react";
import {seeLater} from '../../../redux/actions/indexP'
import SeeLaterVacancy from "./SeeLaterVacancies";

function SeeLaterCard() {
  const dispatch = useDispatch();
  useDispatch(()=>{
    dispatch(getSeeLater())
  },[])
  const pending = useSelector((state) =>state.rootReducerPostulante.later)
 console.log(pending)



  return (
    <div
      tabindex="0"
      aria-label="card 1"
      class="focus:outline-none shadow-lg shadow-black rounded-2xl 2xl:w-full mb-7 bg-gray-300 p-6"
    >
      <div>
        {pending.length === 0  ?<p className=" font-bold text-center my-4 mb-3"> Nothing to see  </p> 
        : 
        <div> 
{pending?.map ( (el)=> {
  return (
    <div className="m-4" key={el.id}>
    <SeeLaterVacancy
      id = {el.id}
      name={el.name}
      description={el.description}
      languages={el.languages?.map((l) => l.name) .join(", ")}
      seniorities={el.seniorities  ?.map((s) => s.name).join(", ")}
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

export default SeeLaterCard;

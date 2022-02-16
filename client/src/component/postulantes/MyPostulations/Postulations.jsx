import React from 'react';
import {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPostulations} from '../../../redux/actions/indexP'
import PostCard from '../MyPostulations/PostCard';
import NavBar from '../NavBar';

function Postulations() {

    const dispatch = useDispatch();
    const postulations = useSelector((state) =>state.rootReducerPostulante.postulations)
    console.log(postulations)

    const postulanteId= useSelector((state) => state.rootReducerPostulante.profile[0].id)
    console.log("postulante id", postulanteId)

  useEffect(() => {
      dispatch(getMyPostulations(postulanteId))
  }, []);

  return <div>
          
          <div><NavBar/></div>
          <h1 className=' bg-gray-300 text-center pt-4 font-bold text-xl ' > My applications </h1>
    <div >
    {postulations.length === 0 ? (
    <p className=" font-bold text-center mb-3">No applies? Search know!</p>
  ) : (
    <div  className="focus:outline-none bg-gray-300 w-screen h-screen pt-7">
      {postulations?.map((el) => {
        return (
          <div className="m-4" key={el.postulant_vacancy.vacancyId}>
            <PostCard
              id = {el.postulant_vacancy.vacancyId}
              name={el.name}
              description={el.description}
              languages={el.languages
                ?.map((l) => l.name)
                .join(", ")}
              seniorities={el.seniorities
                ?.map((s) => s.name)
                .join(", ")}
              skills={el.skills?.map((sk) => sk.name).join(", ")}
              technologies={el.technologies
                ?.map((t) => t.name)
                .join(", ")}
                date= {el.postulant_vacancy.createdAt}
                
            />
          </div>
        );
      })}
    </div>
  )}
        </div>  

  </div>;
}

export default Postulations;

import React from 'react';
import {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPostulations} from '../../../redux/actions/indexP'
import PostCard from '../MyPostulations/PostCard';

function Postulations() {

    const dispatch = useDispatch();
    const postulations = useSelector((state) =>state.rootReducerPostulante.postulations)
    console.log(postulations)

    const postulanteId= useSelector((state) => state.rootReducerPostulante.profile[0].id)
    //console.log(postulanteId)

  useEffect(() => {
      dispatch(getMyPostulations(postulanteId))
  }, []);

  return <div>
          <h1> My applications </h1>
    <div>
    {postulations.length === 0 ? (
    <p className=" font-bold text-center mb-3">No applies? Search know!</p>
  ) : (
    <div>
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

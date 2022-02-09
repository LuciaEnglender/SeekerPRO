import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPostulations} from '../../redux/actions/indexP'
import PostCard from './PostCard';

function Postulations() {

    const dispatch = useDispatch();
    const postulations = useSelector((state) =>state.rootReducerPostulante.postulations)
    console.log(postulations)

    const postulanteId= useSelector((state) => state.rootReducerPostulante.profile.id)

  useEffect(() => {
      dispatch(getMyPostulations(postulanteId))
  }, [dispatch]);
  return <div>
          <h1> My applications </h1>
    <div>
    {postulations.length === 0 ? (
    <p className=" font-bold text-center mb-3">No applies? Search know!</p>
  ) : (
    <div>
      {postulations?.map((el) => {
        return (
          <div className="m-4" key={el.id}>
            <PostCard
              id = {el.id}
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

import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
//import { follow} from '../../../redux/actions/indexP'
import BusinessCard from '../MyPostulations/PostCard';

function Business() {
  const dispatch = useDispatch();
  const business = useSelector((state) =>state.rootReducerPostulante.business)
  const postulanteId= useSelector((state) => state.rootReducerPostulante.profile[0].id)

  return <div>
          <h1> Business followed </h1>
    <div>
    {business.length === 0 ? (
    <p className=" font-bold text-center mb-3">No followed business? Search know!</p>
  ) : (
    <div>
      {business?.map((el) => {
        return (
          <div className="m-4" key={el.id}>
            <BusinessCard
              id = {el.id}
              name={el.name}
              description={el.description}
              location={el.location} 
              
            />
          </div>
        );
      })}
    </div>
  )}
        </div>  

  </div>;
}

export default Business;

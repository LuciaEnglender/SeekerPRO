import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getBusiness, getFollowed } from '../../../redux/actions/indexP';
//import { follow} from '../../../redux/actions/indexP'
import BusinessCard from '../MyPostulations/PostCard';
import NavBar from '../NavBar';
import MiPerfil from '../MiPerfil';

function Business() {
  const dispatch = useDispatch();
  useDispatch(()=>{
    dispatch(getBusiness())
    dispatch(getFollowed())
  },[dispatch])
const followedBusiness = useSelector((state) =>state.rootReducerPostulante.followedBusiness)
 console.log(followedBusiness)
 const business = useSelector((state) =>state.rootReducerPostulante.business)
 console.log(business)


  return  ( 
  <div className="absolute bg-verdeOscuro h-screen w-screen">
  {/* NAVBAR */}
  <div>
    <NavBar />
  </div>
   <div className="focus:outline-none grid sm:grid-rows-4 
grid-cols-3 bg-verdeOscuro  h-auto pt-7">
   {/* MI PERFIL */}
   <div className="bg-verdeOscuro p-2">
     <div className="bg-verdeMedio rounded-2xl p-2 w-full 
h-full">        
           <MiPerfil /> 
     </div>
    </div>
    <div
      tabindex="0"
      aria-label="card 1"
      class="focus:outline-none shadow-lg shadow-black rounded-2xl 2xl:w-full mb-7 bg-gray-300 p-6"
    >
     <div className="col-span-3 bg-verdeOscuro p-2">
          <div className=" bg-verdeMedio rounded-2xl p-2 w-full h-full">
            <div className="items-center justify-center grid grid-row-7">
              <div className="grid-span-2 bg-verdeMedio w-fit">
                <div className="flex m-0 justify-center">

          <h1 className="font-bold my-4 mx-4 text-centermb-3"> Business followed </h1>   
    <div>
    {followedBusiness.length === 0 ? (
   <div>  <p className=" font-bold text-center mb-3">No followed business? Search know!  
    <button 
     className="h-fit mx-4 px-2  my-2 shadow-lg mt-1 
     shadow-black rounded-2xl 
      text-verdeHover bg-verdeOscuro hover:bg-verdeClaro"
      onClick={()=> getBusiness()}>GET ALL BUSINESS</button> </p>
        <div  className="flex m-0 justify-center">
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
      </div>

  ) : (
    <div>
      {followedBusiness?.map((el) => {
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
       </div>
    </div>
</div>  
        </div>
  </div>
  </div>
  </div>
</div>
  )}

export default Business;

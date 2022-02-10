import React from 'react';
import NavBar from '../NavBar';

import { useDispatch, useSelector } from "react-redux";

function Favourites() {
  const favoritas = useSelector((state) => state.rootReducerPostulante.vacancy)

  return <div>
  
    <NavBar/>
    
      MY FAVOURITES VACANCIES
      { 
 favoritas?.map ((el) => {
   return(
     <div key ={el.id}>
    
      <br/>
     </div>
   )}
 )}  

  </div>;
}

export default Favourites;

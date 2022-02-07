import React from 'react';
import NavBar from './NavBar';
import Vacancy from './Vacancy';
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
    <Vacancy
     name = {el.name}
     description = {el.description}
     languages = {el.languages?.map((l) => l.name).join(", ")}
    seniorities = {el.seniorities?.map((s) => s.name).join(", ")}
    skills = {el.skills?.map((sk) => sk.name).join(", ")}
    technologies = {el.technologies?.map((t) => t.name).join(", ")}      
     />
      <br/>
     </div>
   )}
 )}  
  </div>;
}

export default Favourites;

import React from "react";
import Apply from "./Assets/Apply";
import SeeLater from "./SeeLaterVacancies/SeeLater";
import Follow from './FollowBusiness/Follow'

//import {getVacancy} from actions
// import AddToFavourite from "./Assets/AddToFavourite";

//importo nombre de la empresa, tecnologias, lenguajes, siniority, location, id...
function Vacancy({ name, description, languages, seniorities, id, technologies, business}) {

console.log('id', id)
//
  return (
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
              class="focus:outline-none text-xl font-medium leading-5 text-verdeOscuro"
            >  {name}
            </p>
            <p> {business}</p>
            <div class="flex flex-row">
              <p
                tabindex="0"
                class="focus:outline-none text-sm mx-1 leading-normal pt-2 text-verdeOscuro"
              >
                {seniorities ? seniorities : "No especificado"}
              </p>
            </div>
          </div>
          <div role="img" aria-label="bookmark">
            <p class="focus:outline-none" width="28" height="28">
              {languages ? languages : "No especificado"}
            </p>
          </div>
        </div>
      </div>
      <div class="px-2">
        <p
          tabindex="0"
          class="focus:outline-none text-sm leading-5 py-4 text-gray-600"
        >
          {description}
        </p>
        <div tabindex="0" class="focus:outline-none flex">
          <div class="py-2 px-4 text-xs leading-3 text-verdeHover rounded-full bg-verdeOscuro">
            {technologies ? technologies : "No especificado"}
          </div>
          <div class="py-2 mx-4 px-4 text-xs leading-3 text-verdeHover rounded-full bg-verdeOscuro">
        <Apply
        id= {id}/>
        </div>
        <div class="py-2 mx-4 px-4 text-xs leading-3 text-verdeHover rounded-full bg-verdeOscuro">
        <SeeLater
        id= {id}/>
        </div>
         </div>
      </div>
    </div>
  );
}

export default Vacancy;

import React from "react";
import Apply from "../Assets/Apply"
import RemoveSeeLater from './RemoveSeeLater'
import NavBar from "../NavBar";
import MiPerfil from '../MiPerfil';

function seeLaterVacancy({ name, description, languages, seniorities, id, technologies}) {

//
  return (
    <div className="absolute bg-verdeOscuro h-screen w-screen"> 
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
      <div class="flex items-center  border-b border-gray-400 pb-6">
        <div class="flex items-start justify-between w-full">
          <div class="pl-3 w-full">
            <p
              tabindex="0"
              class="focus:outline-none text-xl font-medium leading-5 text-verdeOscuro"
            >
              {name}
            </p>
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
        <RemoveSeeLater
        id= {id}/>
        </div>
        </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default seeLaterVacancy;

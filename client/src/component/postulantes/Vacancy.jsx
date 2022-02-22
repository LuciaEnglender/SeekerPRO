import React from "react";
import Apply from "./Assets/Apply";
import SeeLater from "./SeeLaterVacancies/SeeLater";
import Follow from "./FollowBusiness/Follow";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { format } from "timeago.js";

//import {getVacancy} from actions
// import AddToFavourite from "./Assets/AddToFavourite";

//importo nombre de la empresa, tecnologias, lenguajes, siniority, location, id...
function Vacancy({
  name,
  description,
  languages,
  seniorities,
  id,
  technologies,
  business,
  date,
  vacancies,
  businessId,
}) {
  //console.log("id", id);
  //
  return (
    <div className=" h-28 w-full flex flex-col shadow-2lg shadow-black rounded-2xl bg-gray-300">
      <div className="grid grid-cols-4">
        <div className=" col-span-3">
          <div className="flex">
            <p className="text-black text-xl px-2 underline font-bold">
              {name}
            </p>
            <p className="text-black ml-2 items-center">({business})</p>
          </div>
          <p className="text-black px-1 text-sm ">{description}</p>
        </div>

        <div className="text-right">
          <div className="text-black  justify-end ">
            <Apply id={id} businessId={businessId} />
          </div>
          <div className="text-black justify-end">
            <SeeLater id={id} />
          </div>
        </div>
      </div>
      <div className="flex mt-2 border-y-2 border-colorFondo1 border-solid justify-between mx-1 mb-1">
        <p className="text-black">
          {seniorities ? seniorities : "No especificado"}
        </p>
        <p className="text-black">
          {languages ? languages : "No especificado"}
        </p>
        <div className="text-black">
          {technologies ? technologies : "No especificado"}
        </div>
      </div>
      <div className="flex mx-7 ">
        <p className="text-black text-xs w-full text-left">
          Date: {date.substr(0, 10)} - {format(date.substr(0, 10))}
        </p>
        <p className="text-black text-xs w-full text-right">
          vacancies: {vacancies}
        </p>
      </div>
    </div>
  );
}

export default Vacancy;

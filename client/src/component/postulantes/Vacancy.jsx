import React from "react";
import Apply from "./Assets/Apply";
import SeeLater from "./SeeLaterVacancies/SeeLater";
import { format } from "timeago.js";

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
  return (
    <div className="w-full h-32 flex p-2 flex-col border-2 border-solid shadow-xl bg-zinc-200  from-white hover:from-gray-300 hover:scale-105  shadow-black rounded-2xl ">
      <div className="flex justify-between">
        <div className=" col-span-3 ">
          <div className="flex">
            <p className="text-black text-xl px-2 font-bold">{name}</p>
            <p className="text-black pt-1 items-center">({business})</p>
          </div>
          <p className="text-black px-1 text-sm ">{description}</p>
        </div>
        <div className="text-right flex">
          <div className="text-black  justify-end ">
            <Apply id={id} businessId={businessId} />
          </div>
          <div className="text-black justify-end">
            <SeeLater id={id} businessId={businessId} />
          </div>
        </div>
      </div>
      <div className="flex mt-2 border-y-2 justify-between mx-1 mb-1">
        <p className="text-black">
          {seniorities ? seniorities : "No especificado"}
        </p>
        <p className="text-black">/</p>
        <p className="text-black">
          {languages ? languages : "No especificado"}
        </p>
        <p className="text-black">/</p>
        <p className="text-black">
          {technologies ? technologies : "No especificado"}
        </p>
      </div>
      <div className="flex rounded-b-xl px-7 ">
        <p className="text-black text-xs w-full text-left">
          Date: {date.substr(0, 10)} - {format(date.substr(0, 10))}
        </p>
        <p className="text-black text-xs w-full text-right">
          Vacancies available: {vacancies}
        </p>
      </div>
    </div>
  );
}

export default Vacancy;

import React from "react";
import Apply from "../Assets/Apply";
import RemoveSeeLater from "./RemoveSeeLater";

function seeLaterCard({
  name,
  business,
  description,
  languages,
  seniorities,
  id,
  technologies,
}) {
  console.log({
    name,
    business,
    description,
    languages,
    seniorities,
    id,
    technologies,
  });
  //
  return (
    <div className=" h-28 w-full flex flex-col border-2 border-solid border-slate-900 shadow-2lg bg-gradient-to-t to-nuevoFondo from-white hover:from-gray-300 hover:scale-105  shadow-black rounded-2xl bg-gray-300">
      <div className="flex w-full justify-between border-b-2 border-black border-dashed ">
        <div className=" col-span-2">
          <div className="flex">
            <p className="text-black text-xl px-2 font-bold">{name}</p>
            <p className="text-black pt-1 items-center">({business})</p>
          </div>
          <p className="text-black px-1 text-sm ">{description}</p>
        </div>

        <div className="text-right flex">
          <div className="text-black  justify-end ">
            <Apply id={id} />
          </div>
          <div className="text-black justify-end">
            <RemoveSeeLater id={id} />
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
    </div>
  );
}

export default seeLaterCard;

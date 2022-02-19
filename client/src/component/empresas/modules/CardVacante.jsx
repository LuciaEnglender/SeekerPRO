import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

//Necesitariamos mas datos pero desde el back no nos traen las tec, leng, y esas cosas
export default function CardVacante({
  name,
  description,
  technologies,
  seniorities,
  languages,
}) {
  const { user, isAuthenticated } = useAuth0();
  return (
    <div className="flex bg-colorFondo1 rounded-xl m-px">
      <div className="flex m-2 justify-center">
        {isAuthenticated && (
          <img
            src={user.picture}
            className="w-10 h-10 rounded-full"
            alt="coin avatar"
          />
        )}
      </div>
      <div className=" flex flex-col">
        <div className="grid grid-cols-4">
          <div className="flex m-0 justify-center">
            <p>{name}</p>
          </div>
          <div className="flex m-0 justify-center">
            {seniorities?.map((el) => {
              return <p>{el.name}</p>;
            })}
          </div>
          <div className="flex m-0 justify-center">
            {languages?.map((el) => {
              return <p>{el.name}</p>;
            })}
          </div>
          <div className="flex m-0 justify-center">
            {technologies?.map((el) => {
              return <p>{el.name}</p>;
            })}
          </div>
        </div>
        <hr className=" h-px rounded-2xl bg-colorDetalles2" />
        <div className="flex m-0 justify-center">
          <p className=" text-justify">{description}</p>
        </div>
      </div>
    </div>
  );
}

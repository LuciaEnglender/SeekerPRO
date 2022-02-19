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
    <div className="flex">
      {isAuthenticated && (
        <img src={user.picture} className="w-10 h-10" alt="coin avatar" />
      )}
      <p>{name}</p>
      {seniorities?.map((el) => {
        return <p>{el.name}</p>;
      })}
      {languages?.map((el) => {
        return <p>{el.name}</p>;
      })}
      <p>{description}</p>
      {technologies?.map((el) => {
        return <p>{el.name}</p>;
      })}
    </div>
  );
}

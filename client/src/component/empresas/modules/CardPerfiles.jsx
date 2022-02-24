import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

///TENDRIAMOS QUE TRAER MAS DATOS PARA LAS CARDS DE USUARIOS (ejemplo skills y tecnologias)
export default function CardPerfiles({
  name,
  extras,
  technologies,
  seniorities,
  languages,
}) {
  const { user, isAuthenticated } = useAuth0();
  return (
    <div
      tabindex="0"
      aria-label="card 1"
      class="focus:outline-none shadow-lg shadow-black rounded-2xl  mb-7 bg-gray-300 p-6"
    >
      <div class="flex items-center  border-b border-gray-400 pb-6">
        {isAuthenticated && (
          <img
            src={user.picture}
            alt="coin avatar"
            class="w-12 h-12 shadow-lg shadow-black rounded-full"
          />
        )}

        <div class="flex items-start justify-between w-full">
          <div class="pl-3 w-full">
            <p
              tabindex="0"
              class="focus:outline-none text-xl font-medium leading-5 text-verdeOscuro"
            >
              {name}
            </p>
            <div class="flex flex-row">
              {seniorities?.map((el) => {
                return (
                  <p
                    tabindex="0"
                    class="focus:outline-none text-sm mx-1 leading-normal pt-2 text-verdeOscuro"
                  >
                    {el.name}
                  </p>
                );
              })}
            </div>
          </div>
          <div role="img" aria-label="bookmark">
            {languages?.map((el) => {
              return (
                <div class="mt-1 py-2 px-4 text-xs leading-3 text-verdeHover rounded-full bg-verdeOscuro">
                  {el.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div class="px-2">
        <p
          tabindex="0"
          class="focus:outline-none text-sm leading-5 py-4 text-gray-600"
        >
          {extras}
        </p>
        <div tabindex="0" class="focus:outline-none flex">
          {technologies?.map((el) => {
            return (
              <div class="mx-1 py-2 px-4 text-xs leading-3 text-verdeHover rounded-full bg-verdeOscuro">
                {el.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

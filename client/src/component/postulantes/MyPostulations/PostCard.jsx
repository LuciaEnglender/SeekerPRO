import React from "react";
import RemovePost from "../MyPostulations/RemovePost";
import { format } from "timeago.js";

function PostCard({
  name,
  description,
  id,
  status,
  business,
  seniorities,
  technologies,
  languages,
  date,
}) {
  //const pipeline = useSelector((state)=> state.rootReducerPostulante.pipeline)
  //console.log(pipeline)

  return (
    <div
      tabindex="0"
      aria-label="card 1"
      class="focus:outline-none shadow-lg shadow-black rounded-2xl  mb-7 bg-zinc-200 p-6"
    >
      <div class="flex items-center  border-b border-gray-400 pb-6">
        <div class="flex items-start justify-between w-full">
          <div class="pl-3  w-full">
            <div className="text-nuevoFondo font-bold text-2xl"> {name} </div>
            <div className="text-nuevoFondo flex text-1xl pt-2">
              Company: <p className="ml-2">{business}</p>
            </div>
            <div className="text-nuevoFondo">{description}</div>
          </div>

          <div role="img" aria-label="bookmark">
            <p class="focus:outline-none" width="28" height="28">
              <RemovePost id={id} />
            </p>
          </div>
        </div>
      </div>
      <div class="px-2">
        <p
          tabindex="0"
          class="focus:outline-none text-sm leading-5 py-2 text-gray-600"
        >
          <p className="text-gray-600">
            {" "}
            Requirements:{seniorities}, {technologies}, {languages}
          </p>
        </p>
        <div className="flex justify-between">
          <p className="text-gray-600">
            Application date: {date.substr(0, 10)} -{" "}
            {format(date.substr(0, 10))}{" "}
          </p>
          <div className="text-gray-600"> Application state: {status}</div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;

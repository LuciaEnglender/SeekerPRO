import React from "react";
import { Link } from "react-router-dom";
import Follow from "./Follow";

function BusinessCard({ name, description, location, id }) {
  return (
    <div
      tabindex="0"
      aria-label="card 1"
      className="focus:outline-none h-28 shadow-lg shadow-black rounded-2xl 2xl:w-full  p-1  bg-zinc-200"
    >
      <div className="flex items-center  border-b border-gray-400 ">
        <div className="flex items-start justify-between w-full">
          <Link to={`/homep/postdetail/${id}`}>
            <div className="pl-3 w-full">
              <p
                tabindex="0"
                className="focus:outline-none text-xl font-bold leading-5 text-verdeOscuro "
              >
                {name} <br />
              </p>
            </div>
          </Link>
          <div role="img" aria-label="bookmark">
            <p className="focus:outline-none" width="28" height="28">
              <Follow id={id} />
            </p>
          </div>
        </div>
      </div>
      <div className="px-2">
        <p
          tabindex="0"
          className="focus:outline-none text-sm leading-5 py-2 text-gray-600"
        >
          {description}
        </p>
      </div>
      <div class="px-2">
        <p
          tabindex="0"
          className="focus:outline-none text-sm font-bold leading-5 py-2 text-gray-600"
        >
          {location}
        </p>
      </div>
    </div>
  );
}

export default BusinessCard;

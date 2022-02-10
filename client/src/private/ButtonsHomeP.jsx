import React from "react";
import { Link } from "react-router-dom";

export const ButtonsHomeP = () => {
  return (
    <Link to="/homep">
      {" "}
      <button className="p-4 py-2 inline-block bg-gradient-to-r to-verdeClaro from-verdeMedio text-white font-bold rounded-3xl filter hover:drop-shadow">
        Developer
      </button>{" "}
    </Link>
  );
};

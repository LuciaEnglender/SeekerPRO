import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postulanteDetail, clearDetail } from "../../../redux/actions/index";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(clearDetail());
    dispatch(postulanteDetail(name));
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Name..."
        onChange={(e) => handleInputChange(e)}
      ></input>
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
    </div>
  );
}

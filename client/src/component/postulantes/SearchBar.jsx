import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getSearchBar } from "../../redux/actions/indexP";
import { AiOutlineSearch } from "react-icons/ai";
import swal from "sweetalert";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name.length === 0) {
      return swal({
        icon: "question",
        title: "Please",
        text: "Write a name",
        width: "90%",
        padding: "2em",
        color: "#716add",
      });
    } else {
      dispatch(getSearchBar(name));
      setName("");
    }
  }

  return (
    <div className="w-fit justify-center h-7 flex flex-row text-white m-0 border-verdeMuyClaro rounded-2xl bg-nuevoFondo">
      <input
        className="w-full px-1 border-2 border-solid border-white  m-0  text-bold rounded-2xl bg-nuevoFondo"
        type="text"
        value={name}
        placeholder="  vacancy or company..."
        onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
        onChange={(e) => handleInputChange(e)}
      />
      <div className="text-2xl rounded-2xl hover:bg-verdeOscuro">
        <button onClick={(e) => handleSubmit(e)}>
          <AiOutlineSearch />
        </button>
      </div>
    </div>
  );
}

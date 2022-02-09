import React, { useState } from "react";
import { postEmail } from "../../redux/actions/indexL";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SectionNuevo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    profile: "",
    email: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    alert("Perfil creado");
    setInput({
      name: "",
      email: "",
      profile: "",
    });
    console.log(input);
    dispatch(postEmail(input));
    navigate(-1);
  }

  function handleSelect(e) {
    setInput({
      ...input,
      profile: e.target.value,
    });
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <>
      <div className="grid grid-cols-2">
        <div className="p-2">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label>Name</label>
              <input
                type="text"
                value={input.name}
                onChange={(e) => handleChange(e)}
              />
              <label>Email</label>
              <input
                type="text"
                value={input.email}
                onChange={(e) => handleChange(e)}
              />
              <label>A qué te dedicás?</label>
              <select onChange={(e) => handleSelect(e)}>
                <option value="DEVELOPER">DEVELOPER</option>
                <option value="BUSINESS">BUSINESS</option>
              </select>
            </div>
            <button type="submit">Mandar</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SectionNuevo;

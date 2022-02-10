import React, { useEffect, useState } from "react";
import { postEmail } from "../../redux/actions/indexL";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SectionNuevo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    email: "",
    profile: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postEmail(input));
    alert("Perfil creado");
    setInput({
      name: "",
      email: "",
      profile: "",
    });
    navigate(-3);
  }
  console.log(input);
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
    <div>
      <div className="grid grid-cols-2">
        <div className="p-2">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label>Name</label>
              <input
                name="name"
                type="text"
                value={input.name}
                onChange={(e) => handleChange(e)}
              />
              <label>Email</label>
              <input
                name="email"
                type="text"
                value={input.email}
                onChange={(e) => handleChange(e)}
              />
              <label>A qué te dedicás?</label>
              <select
                name="profile"
                value={input.profile}
                onChange={(e) => handleSelect(e)}
              >
                <option value="DEVELOPER">DEVELOPER</option>
                <option value="BUSINESS">BUSINESS</option>
              </select>
            </div>
            <button type="submit">Mandar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SectionNuevo;

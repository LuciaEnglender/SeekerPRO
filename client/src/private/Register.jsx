import React, { useState } from "react";
import { useDispatch } from "react-redux";

function Register() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    profile: "",
    email: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    setInput({
      name: "",
      email: "",
      profile: "",
    });
    dispatch(postEmail(input));
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
          <h2 className="text-5xl  font-bold pb-4">Developer?</h2>
          <p className="pb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora,
            sapiente vero temporibus ullam voluptatibus modi maxime quis minima
            dicta iure hic, molestiae libero veritatis quos.
          </p>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label>Name</label>
              <input
                value={input.name}
                onChange={(e) => handleChange(e)}
                type="text"
              />
              <label>Email</label>
              <input
                value={input.email}
                onChange={(e) => handleChange(e)}
                type="text"
              />
              <label>A qué te dedicás?</label>
              <select onChange={(e) => handleSelect(e)}>
                <option value="DEVELOPER">DEVELOPER</option>
                <option value="BUSINESS">BUSINESS</option>
              </select>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

// {
//   stado.profile === null ? (
//     <SectionNuevo></SectionNuevo>
//   ) : (
//     <SectionViejo></SectionViejo>
//   );
// }

export default Register;

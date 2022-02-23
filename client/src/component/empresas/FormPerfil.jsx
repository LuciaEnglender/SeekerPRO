import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postEmpresa } from "../../redux/actions/index";
import NavHomeE from "./modules/NavHomeE";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getUsers } from "../../redux/actions/indexL";

export default function FormPerfil() {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileState = useSelector(
    (state) => state.rootReducerLanding.perfiles
  );
  const email = JSON.stringify(user.email);
  const email2 = email.substring(1, email.length - 1);
  const [input, setInput] = useState({
    name: "",
    description: "",
    location: "",
    cuit: "",
    emailId: email2,
  });

  useEffect(() => {
    dispatch(getUsers(email2));
  }, [dispatch, email2]);

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(postEmpresa(input), console.log(input));
    alert("Succes");
    setInput({
      name: "",
      description: "",
      location: "",
      cuit: "",
      emailId: email2,
    });
    navigate("/homee");
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="bg-hero-pattern2 bg-cover w-screen m-0 flex justify-center md:h-screen h-screen p-4 md:px-24 md:py-28">
    <div className=" max-w-xl shadow-2xl md:px-12  h-full bg-colorFondo2 backdrop-blur-sm bg-opacity-30  rounded-2xl drop-shadow-2xl">
      <form
        className="grid grid-cols-1 grid-rows-1 gap-3 pt-20 px-14 md:px-10 md:p-20  md:max-h-96"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="text-center font-bold">CREATE YOUR PROFILE</h1>
        <div className="w-full flex flex-col mt-10 justify-center">
          <h3 className="text-center">Name:</h3>
          <input
            className="w-full text-black xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro"
            type="text"
            name="name"
            value={input.name}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="w-full flex flex-col m-0 justify-center">
          <h3 className="text-center">Description:</h3>
          <textarea
            className="w-full text-black xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro"
            type="text"
            name="description"
            value={input.description}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="w-full flex flex-col m-0 justify-center">
          <h3 className="text-center">Location:</h3>
          <input
            className="w-full text-black xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro"
            type="text"
            name="location"
            value={input.location}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="w-full flex flex-col m-0 justify-center">
          <h3 className="text-center">CUIT/CUIL</h3>
          <input
            className="w-full text-black m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro"
            type="number"
            min={0}
            name="cuit"
            value={input.cuit}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="w-full  mt-5 flex m-0 justify-center">
          <button
            className=" w-32  shadow-lg shadow-black rounded-2xl text-verdeHover bg-verdeOscuro hover:bg-verdeClaro"
            type="submit"
          >
            Guardar Perfil
          </button>
        </div>
      </form>
    </div>
  </div>
  );
}

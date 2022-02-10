import React, { useState } from "react";
import { postEmail } from "../../redux/actions/indexL";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const SectionNuevo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useAuth0();

  const datae = JSON.stringify(user.email);
  const email = datae.substring(1, datae.length - 1);
  const [input, setInput] = useState({
    email: email,
    profile: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(postEmail(input));
    alert("Perfil creado");
    setInput({
      email: "",
      profile: "",
    });
    navigate(input.profile === "DEVELOPER" ? "/homep/create" : "/homee/create");
  }

  function handleSelect(e) {
    console.log(input);
    setInput({
      ...input,
      profile: e.target.value,
    });
  }

  return (
    <div>
      <div className="grid grid-cols-2">
        <div className="m-10">
          <h2 className="text-5xl font-bold pb-4">Comoo Developer:</h2>
          <p className="pb-4 text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora,
            sapiente vero temporibus ullam .
          </p>
          <div className="flex m-0 justify-center">
            <button
              className="p-4 py-2 inline-block bg-gradient-to-r to-verdeClaro from-verdeMedio text-white font-bold rounded-3xl filter hover:drop-shadow  focus:outline-none focus:ring focus:ring-orange-600"
              value="DEVELOPER"
              onClick={(e) => handleSelect(e)}
            >
              Developer?
            </button>
          </div>
        </div>
        <div className="m-10">
          <div>
            <h2 className="text-5xl font-bold pb-4">Comoo Developer:</h2>
            <p className="pb-4 text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora,
              sapiente vero temporibus ullam .
            </p>
            <div className="flex m-0 justify-center">
              <button
                className="p-4 py-2 inline-block bg-gradient-to-r to-verdeClaro from-verdeMedio text-white font-bold rounded-3xl filter hover:drop-shadow  focus:outline-none focus:ring focus:ring-orange-600"
                value="BUSINESS"
                onClick={(e) => handleSelect(e)}
              >
                Recruiter?
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex m-0 justify-center mt-16">
        <button
          className="p-4 py-2 inline-block bg-gradient-to-r from-verdeClaro to-verdeMedio text-white font-bold rounded-3xl filter hover:drop-shadow"
          onClick={(e) => handleSubmit(e)}
        >
          Registrarte
        </button>
      </div>
    </div>
  );
};

export default SectionNuevo;

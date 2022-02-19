import React, { useState, useEffect } from "react";
import {
  postVacancy,
  getTech,
  getSeniority,
  getLanguage,
} from "../../../redux/actions";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { GrFormClose } from "react-icons/gr";
import { useAuth0 } from "@auth0/auth0-react";
import { getUsers } from "../../../redux/actions/indexL";
import NavHomeE from "./NavHomeE";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";
// import NavHomeE from "./NavHomeE";

const FormVacancy = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth0();
  const technology = useSelector((state) => state.rootReducer.technology);
  const seniority = useSelector((state) => state.rootReducer.seniority);
  const language = useSelector((state) => state.rootReducer.language);
  const profileState = useSelector(
    (state) => state.rootReducerLanding.profiles
  );

  const email = JSON.stringify(user.email);
  const email2 = email.substring(1, email.length - 1);

  const [input, setInput] = useState({
    name: "",
    description: "",
    technology: [],
    seniority: [],
    language: [],
    business: email2,
  });

  useEffect(() => {
    dispatch(getUsers(email2));
    dispatch(getTech());
    dispatch(getSeniority());
    dispatch(getLanguage());
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postVacancy(input), console.log(input));
    alert("Vacante creada");
    setInput({
      name: "",
      description: "",
      technology: [],
      seniority: [],
      language: [],
      business: email2,
    });
    navigate(-1);
  }
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  function handleSelectTechno(e) {
    console.log(input.technology);
    if (input.technology.includes(e.target.value)) {
      alert("Already in the list");
    } else {
      setInput({
        ...input,
        technology: [...input.technology, e.target.value],
      });
    }
  }
  function handleSelectLenguge(e) {
    if (input.language.includes(e.target.value)) {
      alert("Already in the list");
    } else {
      setInput({
        ...input,
        language: [...input.language, e.target.value],
      });
    }
  }
  function handleSelectSeniority(e) {
    if (input.seniority.includes(e.target.value)) {
      alert("Already in the list");
    } else {
      setInput({
        ...input,
        seniority: [...input.seniority, e.target.value],
      });
    }
  }
  ///////////delete///////
  const handleDeleteSeniority = (e) => {
    setInput({
      ...input,
      seniority: input.seniority.filter((el) => el !== e),
    });
  };

  const handleDeleteLanguage = (e) => {
    setInput({
      ...input,
      language: input.language.filter((el) => el !== e),
    });
  };

  const handleDeleteTechnology = (e) => {
    setInput({
      ...input,
      technology: input.technology.filter((el) => el !== e),
    });
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="grid grid-rows-6 p-4 rounded-xl shadow-2xl drop-shadow-xl bg-colorFondo1"
    >
      {/* NOMBRE Y DESCR */}
      <div className=" row-span-2 ">
        <h1 className="text-center">CREATE</h1>
        {/* grid1 */}
        <div className="flex flex-col my-2">
          <label className=" text-center"> Name:</label>
          <div className="flex m-0 justify-center">
            <input
              className=" rounded-xl px-2"
              type="text"
              name="name"
              value={input.name}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="w-full flex flex-col">
          <label className=" text-center"> Description:</label>
          <textarea
            className=" rounded-xl h-24 px-2"
            type="text-area"
            name="description"
            value={input.description}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      {/* SKILLS TECHNO  DFEMAS */}
      <div className="row-span-3 my-8">
        {/* TECHNO */}
        <div className="w-full grid grid-rows-2">
          <div className="flex h-fit flex-column m-0 justify-center">
            <label className=" text-center"> Tecnologias:</label>
            <select
              className=" rounded-xl bg-colorFondo2 px-2"
              name="technology"
              onChange={(e) => handleSelectTechno(e)}
            >
              <option className=" " selected="false">
                Select...
              </option>
              {technology.map((e) => (
                <option className=" ">{e.name}</option>
              ))}
            </select>
          </div>
          <div className="scroll-smooth flex no-scrollbar overflow-x-auto">
            {input.technology.map((el, i) => (
              <div
                className="flex flex-row h-fit my-1  list-none rounded-2xl bg-verdeHover"
                key={i}
              >
                <p className=" ">{el}</p>
                <button
                  className=" "
                  type="reset"
                  onClick={() => handleDeleteTechnology(el)}
                >
                  <GrFormClose />
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* LANGUAJE */}
        <div className="w-full grid grid-rows-2">
          <div className="flex flex-column m-0 justify-center">
            <label className=" "> Lenguaje:</label>
            <select
              className=" rounded-xl bg-colorFondo2 px-2"
              name="language"
              onChange={(e) => handleSelectLenguge(e)}
            >
              <option selected="false">Select...</option>
              {language.map((e) => (
                <option value={e.name}>{e.name}</option>
              ))}
            </select>
          </div>
          <div className="scroll-smooth flex  no-scrollbar overflow-x-auto">
            {input.language.map((el, i) => (
              <li
                className="flex flex-row h-fit my-1  list-none rounded-2xl bg-verdeHover"
                key={i}
              >
                <p className=" ">{el}</p>
                <button
                  className=" "
                  type="reset"
                  onClick={() => handleDeleteLanguage(el)}
                >
                  <GrFormClose />
                </button>
              </li>
            ))}
          </div>
        </div>
        {/* SENIORITY */}
        <div className="w-full grid grid-rows-2">
          <div className="flex flex-column m-0 justify-center">
            <label className=" text-center"> Seniority:</label>
            <select
              className=" rounded-xl bg-colorFondo2 px-2"
              name="seniority"
              onChange={(e) => handleSelectSeniority(e)}
            >
              <option className=" " selected="false">
                Select...
              </option>
              {seniority.map((e) => (
                <option className=" " value={e.name}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
          <div className="scroll-smooth flex no-scrollbar overflow-x-auto">
            {input.seniority.map((el, i) => (
              <li
                className="flex flex-row  my-1 h-fit list-none rounded-2xl bg-verdeHover"
                key={i}
              >
                <p className=" ">{el}</p>
                <button
                  className=" "
                  type="reset"
                  onClick={() => handleDeleteSeniority(el)}
                >
                  <GrFormClose />
                </button>
              </li>
            ))}
          </div>
        </div>
      </div>
      {/* BOTOn */}
      <div className="flex m-0 justify-center">
        <button
          type="submit"
          className=" text-center bg-gradient-to-r h-fit rounded-lg to-colorBotones1 from-colorNegro text-white font-ligth filter hover:drop-shadow transition ease-in-out hover:scale-105 px-2"
        >
          Publicar vacante
        </button>
      </div>
    </form>
  );
};

export default FormVacancy;

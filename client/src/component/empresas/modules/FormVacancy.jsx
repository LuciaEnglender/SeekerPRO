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
    <div className="flex m-0 justify-center">
      {/* FORM CREACION VACANTE */}
      <form onSubmit={(e) => handleSubmit(e)} className="mt-10 w-full">
        <div className=" m-2 flex flex-col">
          <label className=" text-center"> Name:</label>
          <input
            className=" rounded-xl "
            type="text"
            name="name"
            value={input.name}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="w-full m-2 flex flex-col">
          <label className=" text-center"> Description:</label>
          <textarea
            className=" rounded-xl "
            type="text-area"
            name="description"
            value={input.description}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="w-full m-2 flex flex-col">
          <label className=" text-center"> Tecnologias:</label>
          <select
            className=" rounded-xl bg-colorFondo2"
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
          <div>
            {input.technology.map((el, i) => (
              <li className=" " key={i}>
                {el}
                <button
                  className=" "
                  type="reset"
                  onClick={() => handleDeleteTechnology(el)}
                >
                  <GrFormClose />
                </button>
              </li>
            ))}
          </div>
        </div>
        <div className="w-full m-2 flex flex-col">
          <label className=" text-center"> Lenguaje:</label>
          <select
            className=" rounded-xl bg-colorFondo2"
            name="language"
            onChange={(e) => handleSelectLenguge(e)}
          >
            <option selected="false">Select...</option>
            {language.map((e) => (
              <option value={e.name}>{e.name}</option>
            ))}
          </select>
          <div>
            {input.language.map((el, i) => (
              <li className=" " key={i}>
                {el}
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
        <div className="w-full m-2 flex flex-col">
          <label className=" text-center"> Seniority:</label>
          <select
            className=" rounded-xl bg-colorFondo2"
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
          <div>
            {input.seniority.map((el, i) => (
              <li className=" " key={i}>
                {el}
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
        <div className="w-full m-2 flex flex-col">
          <button type="submit" className=" text-center">
            Publicar vacante
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormVacancy;

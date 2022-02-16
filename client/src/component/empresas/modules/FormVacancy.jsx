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
    phone: "",
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
      phone: "",
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
    <div>
      {/* NAVEGACIOsN */}
      <NavHomeE titulo={"Crear"} />
      {/* FORM CREACION VACANTE */}
      <div className="bg-gray-300 w-fit m-10 rounded-2xl pb-4">
        <form onSubmit={(e) => handleSubmit(e)} className="m-10 pt-10 ">
          <div className="w-full flex flex-col m-0 justify-center">
            <label> Name:</label>
            <input
              className="w-full xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro"
              type="text"
              name="name"
              value={input.name}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="w-full flex flex-col m-0 justify-center">
            <label> Phone:</label>
            <input
              className="w-full xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro"
              type="text"
              name="phone"
              value={input.phone}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="w-full flex flex-col">
            <label> Description:</label>
            <textarea
              className="w-full xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro"
              type="text-area"
              name="description"
              value={input.description}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="w-full my-3 flex flex-col m-0 justify-center">
            <label> Tecnologias:</label>
            <select
              className="w-full xl:w-52 rounded-2xl bg-verdeClaro"
              name="technology"
              onChange={(e) => handleSelectTechno(e)}
            >
              <option className="rounded-2xl bg-verdeClaro" selected="false">
                Select...
              </option>
              {technology.map((e) => (
                <option className="rounded-2xl bg-verdeClaro">{e.name}</option>
              ))}
            </select>
            <div>
              {input.technology.map((el, i) => (
                <li
                  className="flex flex-row w-fit list-none m-1 rounded-2xl bg-verdeHover"
                  key={i}
                >
                  {el}
                  <button
                    className="rounded-2xl hover:bg-verdeClaro"
                    type="reset"
                    onClick={() => handleDeleteTechnology(el)}
                  >
                    <GrFormClose />
                  </button>
                </li>
              ))}
            </div>
            {/* <ul><li>{input.technology.map(el => el + " ,")}</li></ul> */}
          </div>
          <div className="w-full my-3 flex flex-col m-0 justify-center">
            <label> Lenguaje:</label>
            <select
              className="w-full xl:w-52 rounded-2xl bg-verdeClaro"
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
                <li
                  className="flex flex-row w-fit list-none m-1 rounded-2xl bg-verdeHover"
                  key={i}
                >
                  {el}
                  <button
                    className=" rounded-2xl hover:bg-verdeClaro"
                    type="reset"
                    onClick={() => handleDeleteLanguage(el)}
                  >
                    <GrFormClose />
                  </button>
                </li>
              ))}
            </div>
            {/*  <ul><li>{input.language.map(el => el + " ,")}</li></ul> */}
          </div>
          <div className="w-full my-3 flex flex-col m-0 justify-center">
            <label> Seniority:</label>
            <select
              className="w-full xl:w-52 rounded-2xl bg-verdeClaro"
              name="seniority"
              onChange={(e) => handleSelectSeniority(e)}
            >
              <option className="rounded-2xl bg-verdeClaro" selected="false">
                Select...
              </option>
              {seniority.map((e) => (
                <option className="rounded-2xl bg-verdeClaro" value={e.name}>
                  {e.name}
                </option>
              ))}
            </select>
            <div>
              {input.seniority.map((el, i) => (
                <li
                  className="flex flex-row w-fit  list-none m-1 rounded-2xl bg-verdeHover"
                  key={i}
                >
                  {el}
                  <button
                    className=" rounded-2xl hover:bg-verdeClaro"
                    type="reset"
                    onClick={() => handleDeleteSeniority(el)}
                  >
                    <GrFormClose />
                  </button>
                </li>
              ))}
            </div>
            {/*  <ul><li>{input.seniority.map(el => el + " ,")}</li></ul> */}
          </div>
          <div className="w-full  my-3 flex m-0 justify-center pt-10">
            <button
              type="submit"
              className=" w-32 shadow-lg shadow-black rounded-2xl text-verdeHover bg-verdeOscuro hover:bg-verdeClaro"
            >
              Publicar vacante
            </button>
          </div>
        </form>
      </div>
      <div className="ml-10">
        <Link to="/homee">
          <BsFillArrowLeftSquareFill />
        </Link>
      </div>
    </div>
  );
};

export default FormVacancy;

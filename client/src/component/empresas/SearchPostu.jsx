import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getProfiles,
  getTech,
  getSeniority,
  getLanguage,
  postulanteDetail,
  filterSelects,
} from "../../redux/actions/index";
import CardProfile from "./modules/CardPerfiles";
import NavHomeE from "./modules/NavHomeE";
import { GrFormClose } from "react-icons/gr";
import CardPerfiles from "./modules/CardPerfiles";

const SearchPostu = () => {
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.rootReducer.profiles);

  const technology = useSelector((state) => state.rootReducer.technology);
  const seniority = useSelector((state) => state.rootReducer.seniority);
  const language = useSelector((state) => state.rootReducer.language);
  const [name, setName] = useState("");
  const [input, setInput] = useState({
    technology: [],
    seniority: [],
    language: [],
  });

  useEffect(() => {
    dispatch(getProfiles());
    dispatch(getTech());
    dispatch(getSeniority());
    dispatch(getLanguage());
  }, [dispatch]);

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit2(e) {
    e.preventDefault();
    dispatch(postulanteDetail(name));
    setName("");
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

  //COPI
  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(filterSelects(input));
    setInput(
      {
        technology: [],
        language: [],
        seniority: [],
      },
      console.log(input)
    );
  }

  return (
    <div className="min-h-full">
      {/* NAVEGACION */}
      <div>
        <NavHomeE titulo={"SearchPostu"} />
      </div>
      {/* BODY */}

      <header className="bg-verdeOscuro shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Candidates</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto  bg-verdeOscuro  py-6 sm:px-6 lg:px-8">
          {/* !!!!!!!!!! CSS DE ACA PARA ABAJO !!!!!!!!!!!!! */}
          <div className="focus:outline-none grid sm:grid-rows-4 grid-cols-4 bg-verdeOscuro h-auto pt-7">
            {/* AREA DE BUSQUEDA */}
            <div className="ml-16">
              {/* SEARCHBAR */}
              <div>
                <div className="w-full flex flex-col m-0 justify-center pt-5 ">
                  <label className="text-white "> Search:</label>
                  <input
                    className="w-full xl:w-60 m-0 border-verdeMuyClaro  px-2 rounded-2xl bg-nuevoFondo"
                    type="text"
                    onChange={(e) => handleInputChange(e)}
                  />
                  <div className="flex m-0 justify-center">
                    <button
                      className="text-white rounded-xl hover:bg-white hover:text-black bg-nuevoFondo px-2  mt-3"
                      type="submit"
                      onClick={(e) => handleSubmit2(e)}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
              {/* FILTROS */}
              <div className="mt-8">
                <div className="w-full my-3 flex flex-col m-0 justify-center text-white">
                  <label> Technologies:</label>
                  <select
                    className="w-full xl:w-52 rounded-2xl bg-nuevoFondo"
                    name="technology"
                    onChange={(e) => handleSelectTechno(e)}
                  >
                    <option
                      className="rounded-2xl  h-3 bg-nuevoFondo"
                      selected
                      disabled
                      value=""
                    >
                      Select...
                    </option>
                    {technology.map((e) => (
                      <option className="rounded-2xl  h-3 bg-nuevoFondo">
                        {e.name}
                      </option>
                    ))}
                  </select>
                  <div className="h-4">
                    {input.technology.map((el, i) => (
                      <li
                        className="flex flex-row text-nuevoFondo w-fit  px-2 list-none m-1 rounded-2xl bg-white"
                        key={i}
                      >
                        {el}
                        <button
                          className="rounded-2xl hover:bg-nuevoFondo"
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
                <div className="w-full my-3 flex  mt-3 flex-col m-0 justify-center text-white">
                  <label> Language:</label>
                  <select
                    className="w-full xl:w-52 rounded-2xl bg-nuevoFondo"
                    name="language"
                    onChange={(e) => handleSelectLenguge(e)}
                  >
                    <option
                      className="rounded-2xl  h-3 bg-nuevoFondo"
                      selected
                      disabled
                      value=""
                    >
                      Select...
                    </option>
                    {language.map((e) => (
                      <option
                        className="rounded-2xl  h-3 bg-nuevoFondo"
                        value={e.name}
                      >
                        {e.name}
                      </option>
                    ))}
                  </select>
                  <div className="h-4">
                    {input.language.map((el, i) => (
                      <li
                        className="flex flex-row w-fit  text-nuevoFondo list-none m-1 rounded-2xl bg-white"
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
                <div className="w-full my-3 flex flex-col mt-3 justify-center text-white">
                  <label> Seniority:</label>
                  <select
                    className="w-full xl:w-52 rounded-2xl bg-nuevoFondo"
                    name="seniority"
                    onChange={(e) => handleSelectSeniority(e)}
                  >
                    <option
                      className="rounded-2xl  h-3 bg-nuevoFondo"
                      selected
                      disabled
                      value=""
                    >
                      Select...
                    </option>
                    {seniority.map((e) => (
                      <option
                        className="rounded-2xl  h-3 bg-nuevoFondo"
                        value={e.name}
                      >
                        {e.name}
                      </option>
                    ))}
                  </select>
                  <div className="h-4">
                    {input.seniority.map((el, i) => (
                      <li
                        className="flex flex-row text-nuevoFondo w-fit  px-2 list-none m-1 rounded-2xl bg-white"
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
                </div>
                <div className="flex m-0 justify-center">
                  <button
                    className="text-white rounded-xl hover:bg-white hover:text-black bg-nuevoFondo px-2  mt-8"
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Filter
                  </button>
                </div>
              </div>
            </div>
            {/* AREA DE DATA PERSONAS */}
            <div className="col-span-2 bg-verdeOscuro p-2">
              <div className=" bg-nuevoFondo rounded-2xl p-2 w-full h-full">
                <div className="lg:grid items-center justify-center">
                  <h1 className=" font-bold text-center mb-3 text-white">
                    Profile:
                  </h1>
                  {/* AREA CARD PERFILES DE USUARIOS (no empresas) */}
                  {profiles ? (
                    profiles.map((el) => {
                      return (
                        <Link to={`/postulant/${el.loginEmail}`}>
                          <CardPerfiles
                            name={el.name}
                            extras={el.extras}
                            technologies={el.technologies}
                            seniorities={el.seniorities}
                            languages={el.languages}
                          />
                        </Link>
                      );
                    })
                  ) : (
                    <h3>No hay Developers</h3>
                  )}
                </div>
              </div>
            </div>

            {/* DIV PARA GRID 2BLE */}
            <div></div>
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
};

export default SearchPostu;

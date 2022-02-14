import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  byLengua,
  bySenior,
  bySkills,
  byTech,
  filterSelects,
  getLanguage,
  getProfiles,
  getSeniority,
  getSkills,
  getTech,
  postulanteDetail,
} from "../../redux/actions/index";
import CardProfile from "./modules/CardPerfiles";
import NavHomeE from "./modules/NavHomeE";
// import SearchBar from "./modules/SearchBar";

/////////////// FALTARIa TRAER LOS USUARIOS DESDE LA BASE DE DATOS
const SearchPostu = () => {
  const dispatch = useDispatch();
  const profiles2 = useSelector((state) => state.rootReducer.detailPostulante);
  const profiles = useSelector((state) => state.rootReducer.allProfiles);
  const technology = useSelector((state) => state.rootReducer.technology);
  const seniority = useSelector((state) => state.rootReducer.seniority);
  const skill = useSelector((state) => state.rootReducer.skill);
  const language = useSelector((state) => state.rootReducer.language);
  const [toggle, setToggle] = useState(true);
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setToggle(!toggle);
    dispatch(postulanteDetail(name));
  }

  useEffect(() => {
    dispatch(getProfiles());
    dispatch(getTech());
    dispatch(getSeniority());
    dispatch(getSkills());
    dispatch(getLanguage());
  }, [dispatch]);

  function handleByTech(e) {
    e.preventDefault();
    dispatch(byTech(e.target.value));
  }
  function handleBySkills(e) {
    e.preventDefault();
    dispatch(bySkills(e.target.value));
  }
  function handleBySenior(e) {
    e.preventDefault();
    dispatch(bySenior(e.target.value));
  }
  function handleByLengua(e) {
    e.preventDefault();
    dispatch(byLengua(e.target.value));
  }
  function handleSubmit2(e){
    e.preventDefault()
        dispatch(filterSelects(name));
        setName("");
  }


  return (
    <div className="bg-verdeOscuro w-screen h-screen">
      <div>
        <NavHomeE titulo={"SearchPostu"} />
      </div>
      {/* BODY */}
      <div className="focus:outline-none grid sm:grid-rows-4 grid-cols-4 bg-verdeOscuro h-auto pt-7">
        {/* AREA DE CREACION */}
        <div className="bg-verdeOscuro p-2 ">
          <div className="bg-verdeMedio rounded-2xl p-2 w-full h-full ml-10">
            <h1 className=" font-bold  text-center mb-3">Busqueda:</h1>
            <div className="ml-5">
              <div className="w-full flex flex-col m-0 justify-center">
                <label> Buscar:</label>
                <input
                  className="w-full xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro"
                  type="text"
                  placeholder="Name..."
                  onChange={(e) => handleInputChange(e)}
                ></input>
                <div className="ml-14 mt-2">
                <button
                  className=" w-32 shadow-lg shadow-black rounded-2xl text-verdeHover bg-verdeOscuro hover:bg-verdeClaro"
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                >
                  Search
                </button>
                </div>
              </div>
              {/* <SearchBar></SearchBar> */}
              <div className="w-full my-3 flex flex-col m-0 justify-center">
                <label> Tecnologias:</label>
                <select
                  className="w-full xl:w-52 rounded-2xl bg-verdeClaro"
                  onChange={(e) => handleByTech(e)}
                >
                  <option className="rounded-2xl bg-verdeClaro" value="All">
                    All Tech
                  </option>
                  {technology.map((el) => {
                    return (
                      <option
                        className="rounded-2xl bg-verdeClaro"
                        value={el.name}
                      >
                        {el.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="w-full my-3 flex flex-col m-0 justify-center">
                <select
                  className="w-full xl:w-52 rounded-2xl bg-verdeClaro"
                  onChange={(e) => handleBySkills(e)}
                >
                  <option className="rounded-2xl bg-verdeClaro" value="All">
                    All Seniority
                  </option>
                  {seniority.map((el) => {
                    return (
                      <option
                        className="rounded-2xl bg-verdeClaro"
                        value={el.name}
                      >
                        {el.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="w-full my-3 flex flex-col m-0 justify-center">
                <select
                  className="w-full xl:w-52 rounded-2xl bg-verdeClaro"
                  onChange={(e) => handleBySenior(e)}
                >
                  <option className="rounded-2xl bg-verdeClaro" value="All">
                    All Skill
                  </option>
                  {skill.map((el) => {
                    return (
                      <option
                        className="rounded-2xl bg-verdeClaro"
                        value={el.name}
                      >
                        {el.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="w-full my-3 flex flex-col m-0 justify-center">
                <select
                  className="w-full xl:w-52 rounded-2xl bg-verdeClaro"
                  onChange={(e) => handleByLengua(e)}
                >
                  <option className="rounded-2xl bg-verdeClaro" value="All">
                    All Leng
                  </option>
                  {language.map((el) => {
                    return (
                      <option
                        className="rounded-2xl bg-verdeClaro"
                        value={el.name}
                      >
                        {el.name}
                      </option>
                    );
                  })}
                </select>
                <div className="ml-16 mt-4">
                <button className=" w-32 shadow-lg shadow-black rounded-2xl text-verdeHover bg-verdeOscuro hover:bg-verdeClaro pl-20px"
                                    type="reset"
                                    onClick={(e) => handleSubmit2(e)}
                                >Search
                                </button>
                                </div>
              </div>
            </div>
          </div>
        </div>
        {/* AREA DE DATA PERSONAS */}
        <div className="col-span-2 bg-verdeOscuro p-2">
          <div className=" bg-verdeMedio rounded-2xl p-2 w-full h-full">
            <div className="lg:grid items-center justify-center">
              <h1 className=" font-bold text-center mb-3">Perfiles:</h1>
              {/* AREA CARD PERFILES DE USUARIOS (no empresas) */}
              {toggle === true
                ? profiles.map((el) => {
                    return (
                      <Link to={`/homee/${el.id}`}>
                        <CardProfile
                          name={el.name}
                          extras={el.extras}
                          technologies={el.technologies}
                          seniorities={el.seniorities}
                          languages={el.languages}
                        />
                      </Link>
                    );
                  })
                : profiles2.map((el) => {
                    return (
                      <Link to={`/homee/${el.id}`}>
                        <CardProfile
                          name={el.name}
                          extras={el.extras}
                          technologies={el.technologies}
                          seniorities={el.seniorities}
                          languages={el.languages}
                        />
                      </Link>
                    );
                  })}
            </div>
          </div>
        </div>
        {/* AREA DE DATA Metricas */}
        <div className="bg-verdeOscuro p-2">
          <div className="bg-verdeMedio rounded-2xl p-2 w-full h-full">
            <h1 className=" font-bold  text-center mb-3">Metricas:</h1>
          </div>
        </div>
        {/* DIV PARA GRID 2BLE */}
        <div></div>
      </div>
    </div>
  );
};

export default SearchPostu;

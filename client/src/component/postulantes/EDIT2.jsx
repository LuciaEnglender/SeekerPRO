import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  editProfile,
  getTechnology,
  getSkill,
  getLanguage,
  deleteTechnology,
  getSeniority,
  getLocation,
  deleteLanguage,
  deleteSkill,
  deleteSeñority,
  addTechnology,
  addLanguage,
  addSeñority,
  addSkill,
  addLocation,
  deleteLocation,
} from "../../redux/actions/indexP";
import { GrFormClose } from "react-icons/gr";
//import validate from "./Validation";
import NavBar from "./NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import { getUsers } from "../../redux/actions/indexL";
import swal from "sweetalert";

export default function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSkill());
    dispatch(getTechnology());
    dispatch(getLanguage());
    dispatch(getSeniority());
    dispatch(getLocation());
    dispatch(getUsers(email2));
  }, []);

  const tecno = useSelector((state) => state.rootReducerPostulante.technology);
  const habilidades = useSelector((state) => state.rootReducerPostulante.skill);
  const lenguaje = useSelector((state) => state.rootReducerPostulante.language);
  const experiencia = useSelector((state) =>
    state.rootReducerPostulante.seniority?.map((e) => e.name)
  );
  const locat = useSelector((state) =>
    state.rootReducerPostulante.location?.map((e) => e.name)
  );

  const profileState = useSelector(
    (state) => state.rootReducerPostulante.profile[0]
  );
  const id = useSelector((state) => state.rootReducerPostulante.profile[0].id);

  const { user } = useAuth0();
  const email = JSON.stringify(user.email);
  const email2 = email.substring(1, email.length - 1);

  const [input, setInput] = useState({
    id: profileState.id,
    name: profileState.name,
    phone: profileState.phone,
    locations: profileState.locations?.map((l) => l.name),
    gender: profileState.gender,
    github: profileState.github,
    linkedIn: profileState.linkedIn,
    portfolio: profileState.portfolio,
    CV: profileState.cv,
    file: profileState.file,
    technologies: profileState.technologies,
    languages: profileState.languages,
    skills: profileState.skills,
    seniorities: profileState.seniorities?.map((s) => s.name),
    extras: profileState.extras,
    //loginId:id,
  });
  const asd = input.seniorities;
  const asd2 = input.locations;

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  const handleFile = (e) => {
    setInput({
      ...input,
      file: e.target.files[0],
    });
  };

  const handleCv = (e) => {
    setInput({
      ...input,
      CV: e.target.files[0],
    });
  };

  function handleGithub(e) {
    setInput({
      ...input,
      github: e.target.value,
    });
  }

  function handleLinkedIn(e) {
    setInput({
      ...input,
      linkedIn: e.target.value,
    });
  }

  function handlePortfolio(e) {
    setInput({
      ...input,
      portfolio: e.target.value,
    });
  }

  function handleSelectTechnology(e) {
    if (input.technologies.includes(e.target.value)) {
      swal({
        icon: "warning",
        title: "Sorry",
        text: "Already in the list",
        width: "90%",
        padding: "2em",
        color: "#716add",
        timer: "3000",
        timerProgressBar: true,
      });
    } else {
      setInput({
        ...input,
        technologies: [...input.technologies, e.target.value],
      });
      dispatch(addTechnology(id, e.target.value));
      console.log(e.target.value);
    }
  }

  function handleLanguage(e) {
    if (input.languages.includes(e.target.value)) {
      swal({
        icon: "warning",
        title: "Sorry",
        text: "Already in the list",
        width: "90%",
        padding: "2em",
        color: "#716add",
        timer: "3000",
        timerProgressBar: true,
      });
    } else {
      setInput({
        ...input,
        languages: [...input.languages, e.target.value],
      });
      dispatch(addLanguage(id, e.target.value));
    }
  }

  function handleSkill(e) {
    if (input.skills.includes(e.target.value)) {
      swal({
        icon: "warning",
        title: "Sorry",
        text: "Already in the list",
        width: "90%",
        padding: "2em",
        color: "#716add",
        timer: "3000",
        timerProgressBar: true,
      });
    } else {
      setInput({
        ...input,
        skills: [...input.skills, e.target.value],
      });
      dispatch(addSkill(id, e.target.value));
    }
  }

  function handleSelectSeniority(e) {
    if (input.seniorities.includes(e.target.value)) {
      swal({
        icon: "warning",
        title: "Sorry",
        text: "Already in the list",
        width: "90%",
        padding: "2em",
        color: "#716add",
        timer: "3000",
        timerProgressBar: true,
      });
    } else {
      dispatch(deleteSeñority(id, asd));
      setInput({
        ...input,
        seniorities: [e.target.value],
      });
      dispatch(addSeñority(id, e.target.value));
    }
  }

  function handleSelectLocation(e) {
    if (input.locations.includes(e.target.value)) {
      swal({
        icon: "warning",
        title: "Sorry",
        text: "Already in the list",
        width: "90%",
        padding: "2em",
        color: "#716add",
        timer: "3000",
        timerProgressBar: true,
      });
    } else {
      dispatch(deleteLocation(id, asd2));
      setInput({
        ...input,
        locations: [e.target.value],
      });

      dispatch(addLocation(id, e.target.value));
    }
  }

  function handleExtra(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleLanguage(e) {
    if (input.languages.includes(e.target.value)) {
      swal({
        icon: "warning",
        title: "Sorry",
        text: "Already in the list",
        width: "90%",
        padding: "2em",
        color: "#716add",
        timer: "3000",
        timerProgressBar: true,
      });
    } else {
      setInput({
        ...input,
        languages: [...input.languages, e.target.value],
      });
      dispatch(addLanguage(id, e.target.value));
      console.log(input.languages);
    }
  }

  const handleDelete = (e) => {
    setInput({
      ...input,
      technologies: input.technologies.filter((el) =>
        typeof el === "object" ? el.name !== e.name : el !== e
      ),
    });

    dispatch(deleteTechnology(id, e.name));
  };

  const handleDeleteLanguage = (e) => {
    setInput({
      ...input,
      languages: input.languages.filter((el) =>
        typeof el === "object" ? el.name !== e.name : el !== e
      ),
    });

    dispatch(deleteLanguage(id, e.name));
  };
  const handleDeleteSkills = (e) => {
    setInput({
      ...input,
      skills: input.skills.filter((el) =>
        typeof el === "object" ? el.name !== e.name : el !== e
      ),
    });
    dispatch(deleteSkill(id, e.name));
  };

  const handleDeleteSeniority = (e) => {
    setInput({
      ...input,
      seniorities: input.seniorities.filter((el) =>
        typeof el === "object" ? el.name !== e.name : el !== e
      ),
    });
    dispatch(deleteSeñority(id, e.name));
  };

  const handleDeleteLocation = (e) => {
    setInput({
      ...input,
      locations: input.locations.filter((el) => el !== e),
    });
    dispatch(deleteLocation(id, e));
  };

  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        gender: e.target.value,
      });
    } else {
      setInput({
        ...input,
        gender: input.gender.filter((g) => g !== e.target.value),
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(editProfile(id, input));
    navigate("/homep");
  }

  return (
    <div className="min-h-full">
      {/* NAVEGACION */}
      <NavBar />
      {/* BODYsss */}

      <header className="bg-verdeOscuro shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Home</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* !!!!!!!!!! DE ACA PARA ABAJO CSS !!!!!!!! */}
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="w-full justify-center m-0 flex">
              <h2 className="text-center font-sansA font-bold text-xl p-4 h-10">
                Edit Profile
              </h2>
            </div>
            <div className="grid grid-rows-3 grid-cols-1  md:grid-cols-3 md:grid-rows-1">
              {/* DATOS PERSONALES */}
              <div className="bg-transparent p-6 transition ease-in-out hover:-translate-y-1 hover:scale-105">
                <div className="bg-gray-500 drop-shadow-xl shadow-2xl flex flex-col rounded-xl m-0 p-10 w-full h-full">
                  {/*TITULO*/}
                  <div className="mb-6">
                    <h3 className=" text-center text-xl font-bold">
                      PERSONAL INFORMATION{" "}
                    </h3>
                  </div>
                  {/*NAME*/}
                  <div className="w-full my-3 flex flex-col m-0 justify-center">
                    <label className="text-center found-bold  text-white">
                      Name*
                    </label>
                    <div className="flex m-0 justify-center">
                      <input
                        className="w-fit text-center xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-nuevoFondo"
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                  {/*PHONE*/}
                  <div className="w-full my-3 flex flex-col m-0 justify-center">
                    <label className="text-center found-bold  text-white">
                      Phone*
                    </label>
                    <div className="flex m-0 justify-center">
                      <input
                        className="w-fit text-center xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-nuevoFondo"
                        type="number"
                        value={input.phone}
                        name="phone"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                  {/*LOCATION*/}
                  <div className="w-full my-3  flex flex-col m-0 justify-center">
                    <label className=" text-center   found-bold  text-white">
                      Location*
                    </label>
                    <div className="flex m-0 justify-center">
                      <select
                        className="w-fit  text-center  rounded-2xl bg-nuevoFondo"
                        placeholder="location"
                        // value={input.locations}
                        name="locations"
                        onChange={(e) => handleSelectLocation(e)}
                      >
                        <option
                          className="rounded-2xl bg-nuevoFondo  text-white"
                          selected
                          disabled
                          value=""
                        >
                          Location Selection
                        </option>

                        {locat?.map((el, i) => (
                          <option
                            className="rounded-2xl bg-nuevoFondo  text-white"
                            value={el}
                            key={i}
                          >
                            {el}
                          </option>
                        ))}
                      </select>
                    </div>
                    {input.locations?.map((el, i) => (
                      <div className="flex m-0 justify-center">
                        <li
                          className="flex flex-row w-fit list-none m-1 rounded-2xl bg-white font-bold text-nuevoFondo "
                          key={i}
                          value={el}
                        >
                          {el}
                          <button
                            className="rounded-2xl hover:bg-verdeClaro"
                            type="reset"
                            onClick={() => handleDeleteLocation(el)}
                          >
                            <GrFormClose />
                          </button>
                        </li>
                      </div>
                    ))}
                  </div>
                  {/*GENDER*/}
                  <div className="w-full my-3 flex flex-col m-0 justify-center">
                    <label className="text-center found-bold  text-white">
                      Gender*
                    </label>
                    <div className="flex m-0  justify-center">
                      <div className="flex flex-col  m-0  justify-center">
                        <div className="mx-px my-px bg-nuevoFondo rounded-xl px-1 flex">
                          <label className="text-center">
                            <input
                              value="Femenine"
                              type="radio"
                              id="cbox1"
                              name="check"
                              onChange={(e) => handleCheck(e)}
                            />
                          </label>
                          <h2>Feminine</h2>
                        </div>
                        <div className="mx-px my-px bg-nuevoFondo rounded-xl px-1 flex">
                          <label className="text-center" htmlFor="cbox2">
                            <input
                              value="Masculine"
                              type="radio"
                              id="cbox2"
                              name="check"
                              onChange={(e) => handleCheck(e)}
                            />
                          </label>
                          <h2> Masculine</h2>
                        </div>
                        <div className="mx-px my-px flex bg-nuevoFondo px-1 rounded-xl">
                          <label className="text-center " htmlFor="cbox2">
                            <input
                              value="non-binary"
                              type="radio"
                              id="cbox3"
                              name="check"
                              onChange={(e) => handleCheck(e)}
                            />
                          </label>
                          <h2>NoBinary</h2>
                        </div>
                        <div className="mx-px my-px flex bg-nuevoFondo px-1 rounded-xl">
                          <label className="text-center " htmlFor="cbox2">
                            <input
                              value="Other"
                              type="radio"
                              name="check"
                              id="cbox4"
                              onChange={(e) => handleCheck(e)}
                            />
                          </label>
                          <h2>Other</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*  {/*PHOTO*/}
                  {/* <div className="w-full my-3 flex flex-col m-0 justify-center">
                    <label
                      className="text-center found-bold  text-white"
                      htmlFor="file"
                    >
                      Photo (.jpg)*
                    </label>
                    <div className="flex m-0 justify-center">
                      <input
                        className="w-fit text-center xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro"
                        placeholder=".jpg"
                        type="file"
                        name="file"
                        id="file"
                        accept=".jpg"
                        onChange={(e) => handleFile(e)}
                      />
                    </div>
                  </div> */}
                </div>
              </div>
              {/* INFORMACION LABORAL Y PROYECTOS */}
              <div className="bg-transparent p-6 transition ease-in-out hover:-translate-y-1 hover:scale-105">
                <div className="bg-gray-500 drop-shadow-xl shadow-2xl flex flex-col m-0 p-10 w-full h-full rounded-xl">
                  {/*TITULO*/}
                  <div className="mb-6">
                    <h3 className=" text-center text-xl font-bold">
                      LABOR INFORMATION AND PROJECTS
                    </h3>
                  </div>
                  {/*GITHUB*/}
                  <div className="w-full my-3 flex flex-col m-0 justify-center">
                    <label
                      className="text-center  found-bold  text-white"
                      htmlFor="github"
                    >
                      GitHub
                    </label>
                    <div className="flex m-0 justify-center">
                      <input
                        className="w-fit xl:w-60 text-center m-0 border-verdeMuyClaro rounded-2xl bg-nuevoFondo"
                        type="text"
                        value={input.github}
                        name="github"
                        onChange={(e) => handleGithub(e)}
                      />
                    </div>
                  </div>
                  {/*LINKEDIN*/}
                  <div className="w-full my-3 flex flex-col m-0 justify-center">
                    <label
                      className="text-center  found-bold  text-white"
                      htmlFor="linkedin"
                    >
                      LinkedIn*
                    </label>
                    <div className="flex m-0 justify-center">
                      <input
                        className="w-fit xl:w-60 text-center m-0 border-verdeMuyClaro rounded-2xl bg-nuevoFondo"
                        value={input.linkedIn}
                        type="text"
                        name="linkedin"
                        onChange={(e) => handleLinkedIn(e)}
                      />
                    </div>
                  </div>
                  {/*PORTFOLIO*/}
                  <div className="w-full my-3 flex flex-col m-0 justify-center">
                    <label
                      className=" text-center found-bold  text-white"
                      for="portfolio"
                    >
                      PortFolio
                    </label>
                    <div className="flex m-0 justify-center">
                      <input
                        className="w-fit xl:w-60 text-center m-0 border-verdeMuyClaro rounded-2xl bg-nuevoFondo"
                        type="text"
                        name="portfolio"
                        value={input.portfolio}
                        onChange={(e) => handlePortfolio(e)}
                      />
                    </div>
                  </div>
                  {/*CV*/}
                  <div className="w-full my-3 flex flex-col m-0 justify-center">
                    <label className=" text-center found-bold  text-white">
                      CV (.pdf)*
                    </label>
                    <div className="flex m-0 justify-center">
                      <input
                        className="w-fit xl:w-60 m-0 text-center border-verdeMuyClaro rounded-2xl bg-nuevoFondo"
                        placeholder=".pdf"
                        type="file"
                        id="file"
                        accept=".pdf"
                        name="file"
                        onChange={(e) => handleCv(e)}
                      />
                    </div>
                  </div>
                  {/*EXTRAS*/}
                  <div className="w-full my-3 flex flex-col m-0 justify-center">
                    <label className="text-center found-bold  text-white">
                      Extras
                    </label>
                    <div className="flex m-0 justify-center">
                      <textarea
                        className="w-full text-center  xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-nuevoFondo"
                        placeholder=""
                        type="text"
                        value={input.extras}
                        name="extras"
                        onChange={(e) => handleExtra(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* INFORMACION TECNICA */}
              <div className="bg-transparent p-6 transition ease-in-out hover:-translate-y-1 hover:scale-105">
                <div className="bg-gray-500 drop-shadow-xl shadow-2xl rounded-xl flex flex-col m-0 p-10 w-full h-full">
                  {/*TITULO*/}
                  <div className="mb-6">
                    <h3 className=" text-center text-xl font-bold">
                      TECHNICAL INFORMATION
                    </h3>
                  </div>
                  {/*TECHNO*/}
                  <div className="w-full my-3 flex flex-col m-0 justify-center">
                    <label className="text-center found-bold  text-white">
                      Technology*
                    </label>
                    <div className="flex m-0 justify-center">
                      <select
                        className="w-fit  text-center xl:w-52 rounded-2xl bg-nuevoFondo"
                        placeholder="technology"
                        value={input.technologies}
                        name="technology"
                        onChange={(e) => handleSelectTechnology(e)}
                      >
                        <option
                          className="rounded-2xl bg-nuevoFondo  text-white"
                          value=""
                          disabled
                          selected
                        >
                          Tecnologies Selection
                        </option>
                        {tecno?.map((el) => (
                          <option
                            className="rounded-2xl bg-nuevoFondo  text-white"
                            value={el.name}
                            key={el.id}
                          >
                            {el.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      {input.technologies?.map((el, i) =>
                        typeof el === "object" ? (
                          <div className="flex m-0 justify-center">
                            <li
                              className="flex flex-row bg-white px-2 text-black w-fit list-none m-1 rounded-2xl "
                              key={i}
                            >
                              {el.name}
                              <button
                                className=" w-fit rounded-2xl hover:bg-verdeClaro"
                                type="reset"
                                onClick={() => handleDelete(el)}
                              >
                                <GrFormClose />
                              </button>
                            </li>
                          </div>
                        ) : (
                          <div className="flex m-0 justify-center">
                            <li
                              className="flex flex-row bg-white px-2 text-black w-fit list-none m-1 rounded-2xl "
                              key={i}
                            >
                              {el}
                              <button
                                className="rounded-2xl hover:bg-verdeClaro"
                                type="reset"
                                onClick={() => handleDelete(el)}
                              >
                                <GrFormClose />
                              </button>
                            </li>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  {/*LENGUA*/}
                  <div className="w-full my-3 flex flex-col m-0 justify-center">
                    <label className="text-center found-bold  text-white">
                      Languages*
                    </label>
                    <div className="flex m-0 justify-center">
                      <select
                        className="w-fit  text-center xl:w-52 rounded-2xl bg-nuevoFondo"
                        placeholder="languages"
                        value={input.languages}
                        name="languages"
                        onChange={(e) => handleLanguage(e)}
                      >
                        <option
                          className="rounded-2xl bg-nuevoFondo  text-white"
                          value=""
                          disabled
                          selected
                        >
                          Languages Selection
                        </option>
                        {lenguaje?.map((el) => (
                          <option
                            className="rounded-2xl bg-nuevoFondo  text-white"
                            value={el.name}
                            key={el.id}
                          >
                            {el.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      {input.languages?.map((el, i) =>
                        typeof el === "object" ? (
                          <div className="flex m-0 justify-center">
                            <li
                              className="flex flex-row w-fit list-none m-1 rounded-2xl bg-white px-2 text-black"
                              key={i}
                            >
                              {el.name}
                              <button
                                className="rounded-2xl hover:bg-verdeClaro"
                                type="reset"
                                onClick={() => handleDeleteLanguage(el)}
                              >
                                <GrFormClose />
                              </button>
                            </li>
                          </div>
                        ) : (
                          <div className="flex m-0 justify-center">
                            <li
                              className="flex flex-row w-fit list-none m-1 rounded-2xl bg-white px-2 text-black"
                              key={i}
                            >
                              {el}
                              <button
                                className="rounded-2xl hover:bg-verdeClaro"
                                type="reset"
                                onClick={() => handleDeleteLanguage(el)}
                              >
                                <GrFormClose />
                              </button>
                            </li>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  {/*SKILLS*/}
                  <div className="w-full my-3 flex flex-col m-0 justify-center">
                    <label className="text-center found-bold  text-white">
                      Skill*
                    </label>
                    <div className="flex m-0 justify-center">
                      <select
                        className="w-fit text-center xl:w-52 rounded-2xl bg-nuevoFondo"
                        placeholder="skill"
                        value={input.skills}
                        name="skills"
                        onChange={(e) => handleSkill(e)}
                      >
                        <option
                          className="rounded-2xl bg-nuevoFondo  text-white"
                          value=""
                          disabled
                          selected
                        >
                          Skills Selection
                        </option>
                        {habilidades?.map((el) => (
                          <option
                            className="rounded-2xl bg-nuevoFondo  text-white"
                            value={el.name}
                            key={el.id}
                          >
                            {el.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      {input.skills?.map((el, i) =>
                        typeof el === "object" ? (
                          <div className="flex m-0 justify-center">
                            <li
                              className="flex flex-row w-fit list-none m-1 rounded-2xl bg-white px-2 text-black"
                              key={i}
                            >
                              {el.name}
                              <button
                                className="rounded-2xl hover:bg-verdeClaro"
                                type="reset"
                                onClick={() => handleDeleteSkills(el)}
                              >
                                <GrFormClose />
                              </button>
                            </li>
                          </div>
                        ) : (
                          <div className="flex m-0 justify-center">
                            <li
                              className="flex flex-row w-fit list-none m-1 rounded-2xl bg-white px-2 text-black"
                              key={i}
                            >
                              {el}
                              <button
                                className="rounded-2xl hover:bg-verdeClaro"
                                type="reset"
                                onClick={() => handleDeleteSkills(el)}
                              >
                                <GrFormClose />
                              </button>
                            </li>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  {/*SENIORITY*/}
                  <div className="w-full my-3 flex flex-col m-0 justify-center">
                    <label className="text-center found-bold  text-white">
                      Siniority*
                    </label>
                    <div className="flex m-0 justify-center">
                      <select
                        className="w-fit  text-center xl:w-52 rounded-2xl bg-nuevoFondo"
                        placeholder="Seniority"
                        value={input.seniority}
                        name="seniority"
                        onChange={(e) => handleSelectSeniority(e)}
                      >
                        <option
                          className="rounded-2xl bg-nuevoFondo  text-white"
                          value=""
                          disabled
                          selected
                        >
                          Seniority Selection
                        </option>
                        {experiencia?.map((el, i) => (
                          <option
                            className="rounded-2xl  bg-nuevoFondo  text-white"
                            value={el}
                            key={i}
                          >
                            {el}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      {input.seniorities?.map((el, i) =>
                        typeof el === "object" ? (
                          <div className="flex m-0 justify-center">
                            <li
                              className="flex flex-row w-fit list-none m-1 rounded-2xl bg-white"
                              key={i}
                            >
                              {el.name}
                              <button
                                className="rounded-2xl hover:bg-verdeClaro"
                                type="reset"
                                onClick={() => handleDeleteSeniority(el)}
                              >
                                <GrFormClose />
                              </button>
                            </li>
                          </div>
                        ) : (
                          <div className="flex m-0 justify-center">
                            <li
                              className="flex flex-row w-fit list-none m-1 rounded-2xl bg-white px-2 text-black"
                              key={i}
                            >
                              {el}
                              <button
                                className="rounded-2xl hover:bg-verdeClaro"
                                type="reset"
                                onClick={() => handleDeleteSeniority(el)}
                              >
                                <GrFormClose />
                              </button>
                            </li>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*BUTTON*/}
            <div className="flex m-0 pb-3 justify-center">
              <button
                className="text-center w-32 shadow-lg shadow-black rounded-2xl text-white hover:text-black bg-nuevoFondo hover:bg-gray-300"
                type="submit"
                //onClick={(e)=>fileOnChange(e)}//
              >
                Modificar perfil
              </button>
            </div>
          </form>
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
}

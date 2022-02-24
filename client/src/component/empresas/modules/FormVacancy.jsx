import React, { useState, useEffect } from "react";
import {
  postVacancy,
  getTech,
  getSeniority,
  getLanguage,
  getVacancy,
} from "../../../redux/actions";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { GrFormClose } from "react-icons/gr";
import { useAuth0 } from "@auth0/auth0-react";
import { getUsers } from "../../../redux/actions/indexL";
// import NavHomeE from "./NavHomeE";
import swal from "sweetalert";

const FormVacancy = () => {
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const technology = useSelector((state) => state.rootReducer.technology);
  const seniority = useSelector((state) => state.rootReducer.seniority);
  const language = useSelector((state) => state.rootReducer.language);
  const email = JSON.stringify(user.email);
  const email2 = email.substring(1, email.length - 1);

  const [input, setInput] = useState({
    name: "",
    description: "",
    technology: [],
    seniority: [],
    language: [],
    business: email2,
    vacancies: "",
  });

  useEffect(() => {
    dispatch(getUsers(email2));
    dispatch(getTech());
    dispatch(getSeniority());
    dispatch(getLanguage());
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.name || !input.description || !input.vacancies) {
      swal({
        icon: "error",
        title: "Please",
        text: "Complete all the fields",
        width: "90%",
        padding: "2em",
        color: "#716add",
        timerProgressBar: true,
      });
    } else {
      swal({
        icon: "success",
        title: "Congrats!",
        text: "Vacancy Created",
        width: "90%",
        padding: "2em",
        color: "#716add",
        timer: "3000",
        timerProgressBar: true,
      });
      dispatch(postVacancy(input), console.log(input));

      setInput({
        name: "",
        description: "",
        technology: [],
        seniority: [],
        language: [],
        business: email2,
        vacancies: "",
      });
    }
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
      swal({
        icon: "warning",
        title: "Sorry!",
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
        technology: [...input.technology, e.target.value],
      });
    }
  }
  function handleSelectLenguge(e) {
    if (input.language.includes(e.target.value)) {
      swal({
        icon: "warning",
        title: "Sorry!",
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
        language: [...input.language, e.target.value],
      });
    }
  }
  function handleSelectSeniority(e) {
    if (input.seniority.includes(e.target.value)) {
      swal({
        icon: "warning",
        title: "Sorry!",
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
      {/* TAILWIND */}

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-3">
            <form onSubmit={(e) => handleSubmit(e)} method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 bg-white py-4">
                  <div className="flex flex-col">
                    <div className="flex flex-col">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-black"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={input.name}
                          onChange={(e) => handleChange(e)}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-white sm:text-sm border-gray-300 bg-nuevoFondo h-8 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3 mt-1">
                        <label
                          htmlFor="about"
                          className="block text-sm font-medium text-black"
                        >
                          Description:
                        </label>
                        <div className="mt-1">
                          <textarea
                            type="text-area"
                            name="description"
                            value={input.description}
                            onChange={(e) => handleChange(e)}
                            className="mt-1 focus:ring-indigo-500 bg-nuevoFondo focus:border-indigo-500 block w-full h-16  shadow-sm sm:text-sm text-white border-gray-300 rounded-md resize"
                          />
                        </div>
                        <p className="mt-2 text-sm text-black  found-xl text-center">
                          Brief description for your vacancy.
                        </p>
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3 mt-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-black"
                      >
                        Technologies:
                      </label>
                      <select
                        name="technology"
                        onChange={(e) => handleSelectTechno(e)}
                        className="mt-1 block w-full py-1 px-3 border text-white bg-nuevoFondo border-gray-300 bg-zic-400 rounded-md shadow-sm  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option
                          className="rounded-2xl text-white bg-nuevoFondo"
                          selected="false"
                        >
                          Select...
                        </option>
                        {technology.map((e) => (
                          <option className="rounded-2xl text-white bg-nuevoFondo">
                            {e.name}
                          </option>
                        ))}
                      </select>
                      <div className="flex  h-8   flex-row">
                        {input.technology.map((el, i) => (
                          <li
                            className="flex flex-row w-fit px-1 list-none m-1 rounded-2xl bg-nuevoFondo"
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
                    </div>

                    <div className="col-span-6 sm:col-span-3  mt-1">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Languages:
                      </label>
                      <select
                        className="mt-1 block w-full py-1 px-3 border  bg-nuevoFondo border-gray-300 bg-zic-400 rounded-md shadow-sm text-white  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        name="language"
                        onChange={(e) => handleSelectLenguge(e)}
                      >
                        <option
                          className="rounded-2xl text-white bg-nuevoFondo"
                          selected="false"
                        >
                          Select...
                        </option>
                        {language.map((e) => (
                          <option className="rounded-2xl text-white bg-nuevoFondo">
                            {e.name}
                          </option>
                        ))}
                      </select>
                      <div className="flex  h-8  flex-row">
                        {input.language.map((el, i) => (
                          <li
                            className="flex flex-row w-fit px-1 text-whitelist-none m-1 rounded-2xl bg-nuevoFondo"
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
                    </div>

                    <div className="col-span-6 sm:col-span-3  mt-1">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Seniority:
                      </label>
                      <select
                        className="mt-1 block w-full py-1 px-3  bg-nuevoFondo border border-gray-300 bg-zic-400 rounded-md shadow-sm text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        name="seniority"
                        onChange={(e) => handleSelectSeniority(e)}
                      >
                        <option
                          className="rounded-2xl text-white bg-nuevoFondo"
                          selected="false"
                        >
                          Select...
                        </option>
                        {seniority.map((e) => (
                          <option
                            className="rounded-2xl text-white bg-nuevoFondo"
                            value={e.name}
                          >
                            {e.name}
                          </option>
                        ))}
                      </select>
                      <div className="flex  h-8 flex-row">
                        {input.seniority.map((el, i) => (
                          <li
                            className="flex flex-row w-fit px-1 text-white list-none m-1 rounded-2xl bg-nuevoFondo"
                            key={i}
                          >
                            {el}
                            <button
                              className=" text-gray-700 rounded-2xl hover:bg-verdeClaro"
                              type="reset"
                              onClick={() => handleDeleteSeniority(el)}
                            >
                              <GrFormClose />
                            </button>
                          </li>
                        ))}
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3 mt-5">
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium text-black"
                      >
                        Vacancies available:
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          min={0}
                          name="vacancies"
                          value={input.vacancies}
                          onChange={(e) => handleChange(e)}
                          className="mt-1 text-white bg-nuevoFondo focus:ring-indigo-500  h-8 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md resize"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 bg-white justify-center flex text-right sm:px-6 ">
                  <button
                    type="submit"
                    className=" w-32 shadow-lg shadow-black rounded-2xl text-white bg-verdeOscuro hover:bg-nuevoFondo"
                  >
                    Post
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormVacancy;

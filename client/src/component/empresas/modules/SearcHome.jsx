import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getVacancy,
  getTech,
  getSeniority,
  getLanguage,
  filterVacancies,
  getSearchBar,
  getProfile,
} from "../../../redux/actions/index";
import { GrFormClose } from "react-icons/gr";
import swal from "sweetalert";

function SearcHome() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();

  const email = JSON.stringify(user.email);
  const email2 = email.substring(1, email.length - 1);
  const technology = useSelector((state) => state.rootReducer.technology);
  const seniority = useSelector((state) => state.rootReducer.seniority);
  const language = useSelector((state) => state.rootReducer.language);
  const empresa = useSelector((state) => state.rootReducer.business);
  const filtro = useSelector((state) => state.rootReducer.vacancies);

  const [name, setName] = useState("");
  const [input, setInput] = useState({
    technology: [],
    seniority: [],
    language: [],
  });
  useEffect(() => {
    dispatch(getTech());
    dispatch(getSeniority());
    dispatch(getLanguage());
    dispatch(getProfile(email2));
  }, [dispatch]);

  function handleSelectTechno(e) {
    console.log(input.technology);
    if (input.technology.includes(e.target.value)) {
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
        technology: [...input.technology, e.target.value],
      });
    }
  }
  function handleSelectLenguge(e) {
    if (input.language.includes(e.target.value)) {
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
        language: [...input.language, e.target.value],
      });
    }
  }
  function handleSelectSeniority(e) {
    if (input.seniority.includes(e.target.value)) {
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
        seniority: [...input.seniority, e.target.value],
      });
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(filterVacancies(input));
    setInput(
      {
        technology: [],
        language: [],
        seniority: [],
      },
      console.log(input)
    );
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
  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit2(e) {
    e.preventDefault();

    if (name.length === 0) {
      return swal({
        icon: "warning",
        title: "Please",
        text: "Write a name",
        width: "90%",
        padding: "2em",
        color: "#716add",
        timer: "3000",
        timerProgressBar: true,
      });
    } else {
      dispatch(getSearchBar(name));
      setName("");
    }
  }

  return (
    <div>
      <div className=" sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:mt-0 md:col-span-3">
            <form onSubmit={(e) => handleSubmit(e)} method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4  bg-white ">
                  <div className="flex flex-col">
                    <h1 className=" font-bold text-zinc-40 text-center ">
                      {empresa[0].name}
                    </h1>
                    <hr />
                    <div className="flex m-0 justify-content ">
                      {isAuthenticated && (
                        <img
                          className="h-300 w-300 rounded-full"
                          src={user.picture}
                          alt=""
                        />
                      )}
                    </div>
                    <hr />
                    <div className="flex flex-col">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Search
                        </label>
                        <input
                          type="text"
                          onChange={(e) => handleInputChange(e)}
                          className="mt-1 text-white focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300  bg-gray-700 h-10 rounded-md"
                        />
                        <div className="flex m-0 mt-2 justify-center">
                          <button
                            className=" shadow-lg shadow-black rounded-2xl px-2  text-white hover:bg-verdeOscuro bg-gray-800 pl-20px"
                            type="reset"
                            onClick={(e) => handleSubmit2(e)}
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3 mt-2">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Technologies:
                      </label>
                      <select
                        name="technology"
                        onChange={(e) => handleSelectTechno(e)}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-nuevoFondo rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option
                          className=" rounded-2xl bg-nuevoFondo text-white"
                          disabled
                          value=""
                          selected="false"
                        >
                          Select...
                        </option>
                        {technology.map((e) => (
                          <option className="rounded-2xl bg-nuevoFondo text-white">
                            {e.name}
                          </option>
                        ))}
                      </select>
                      <div className="flex h-8 flex-row">
                        {input.technology.map((el, i) => (
                          <li
                            className=" flex flex-row w-fit list-none m-1 px-2 rounded-2xl bg-nuevoFondo"
                            key={i}
                          >
                            <p className="">{el}</p>
                            <button
                              className=" rounded-2xl hover:bg-gray-200"
                              type="reset"
                              onClick={() => handleDeleteTechnology(el)}
                            >
                              <GrFormClose />
                            </button>
                          </li>
                        ))}
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3 mt-2">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Languages:
                      </label>
                      <select
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-nuevoFondo rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        name="language"
                        onChange={(e) => handleSelectLenguge(e)}
                      >
                        <option
                          className="text-white rounded-2xl bg-nuevoFondo"
                          selected
                          disabled
                          value=""
                        >
                          Select...
                        </option>
                        {language.map((e) => (
                          <option
                            value={e.name}
                            className=" bg-nuevoFondo text-white"
                          >
                            {e.name}
                          </option>
                        ))}
                      </select>
                      <div className="flex h-8 flex-row">
                        {input.language.map((el, i) => (
                          <li
                            className="flex flex-row w-fit list-none m-1 rounded-2xl bg-nuevoFondo"
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

                    <div className="col-span-6 sm:col-span-3 mt-2">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Seniority:
                      </label>
                      <select
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-nuevoFondo rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        name="seniority"
                        onChange={(e) => handleSelectSeniority(e)}
                      >
                        <option
                          className="rounded-2xl bg-nuevoFondo text-white"
                          selected
                          disabled
                          value=""
                        >
                          Select...
                        </option>
                        {seniority.map((e) => (
                          <option
                            className="rounded-2xl bg-nuevoFondo text-white"
                            value={e.name}
                          >
                            {e.name}
                          </option>
                        ))}
                      </select>
                      <div className="flex h-8 flex-row">
                        {input.seniority.map((el, i) => (
                          <li
                            className="flex flex-row w-fit  list-none m-1 rounded-2xl bg-nuevoFondo"
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
                  </div>
                </div>
                <div className="px-4 py-3 flex justify-center bg-white text-right sm:px-6">
                  <button
                    type="submit"
                    className=" w-32 shadow-lg shadow-black rounded-2xl text-white hover:bg-verdeOscuro bg-gray-800"
                  >
                    Filter
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearcHome;

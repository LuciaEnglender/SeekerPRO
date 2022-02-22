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
      return alert("Please write a name");
    } else {
      dispatch(getSearchBar(name));
      setName("");
    }
  }

  return (
    <div>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-3">
            <form onSubmit={(e) => handleSubmit(e)} method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="flex flex-col">
                    <h1 className=" font-bold  text-center mb-3">
                      {empresa[0].name}
                    </h1>
                    <hr />
                    <div className="flex m-0 justify-content mb-9">
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
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                        <div className="ml-14 mt-4">
                          <button
                            className=" w-32 shadow-lg shadow-black rounded-2xl text-verdeHover bg-verdeOscuro hover:bg-verdeClaro pl-20px"
                            type="reset"
                            onClick={(e) => handleSubmit2(e)}
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3 mt-9">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Technologies:
                      </label>
                      <select
                        name="technology"
                        onChange={(e) => handleSelectTechno(e)}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option
                          className="rounded-2xl bg-verdeClaro"
                          className="rounded-2xl bg-verdeClaro"
                          selected
                          disabled
                          value=""
                          selected="false"
                        >
                          Select...
                        </option>
                        {technology.map((e) => (
                          <option className="rounded-2xl bg-verdeClaro">
                            {e.name}
                          </option>
                        ))}
                      </select>
                      <div className="flex flex-row">
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
                    </div>

                    <div className="col-span-6 sm:col-span-3 mt-9">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Languages:
                      </label>
                      <select
                        name="language"
                        onChange={(e) => handleSelectLenguge(e)}
                      >
                        <option
                          className="rounded-2xl bg-verdeClaro"
                          selected
                          disabled
                          value=""
                        >
                          Select...
                        </option>
                        {language.map((e) => (
                          <option value={e.name}>{e.name}</option>
                        ))}
                      </select>
                      <div className="flex flex-row">
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
                    </div>

                    <div className="col-span-6 sm:col-span-3 mt-9">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Seniority:
                      </label>
                      <select
                        name="seniority"
                        onChange={(e) => handleSelectSeniority(e)}
                      >
                        <option
                          className="rounded-2xl bg-verdeClaro"
                          className="rounded-2xl bg-verdeClaro"
                          selected
                          disabled
                          value=""
                        >
                          Select...
                        </option>
                        {seniority.map((e) => (
                          <option
                            className="rounded-2xl bg-verdeClaro"
                            value={e.name}
                          >
                            {e.name}
                          </option>
                        ))}
                      </select>
                      <div className="flex flex-row">
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
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 mt-9">
                  <button
                    type="submit"
                    className=" w-32 shadow-lg shadow-black rounded-2xl text-verdeHover bg-verdeOscuro hover:bg-verdeClaro"
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

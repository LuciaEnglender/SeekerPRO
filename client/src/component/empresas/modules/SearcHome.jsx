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
  const filtro = useSelector((state) => state.rootReducer.vacancies);
  const empresa = useSelector((state) => state.rootReducer.business);
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
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex m-0 justify-center">
          <input
            className="rounded-l-xl"
            type="text"
            onChange={(e) => handleInputChange(e)}
          />
          <button
            className="rounded-r-xl bg-gradient-to-r to-colorDetalles1 from-colorBotones2 text-white font-ligth filter hover:drop-shadow transition ease-in-out hover:scale-105 px-2"
            type="reset"
            onClick={(e) => handleSubmit2(e)}
          >
            Search
          </button>
        </div>
        <div className="flex flex-col w-full mt-3 mb-3">
          <div className="grid grid-cols-3 w-full gap-1">
            <div className="flex flex-col w-full">
              <select
                className="rounded-xl bg-colorFondo2"
                name="technology"
                onChange={(e) => handleSelectTechno(e)}
              >
                <option selected disabled value="">
                  Tech...
                </option>
                {technology.map((e) => (
                  <option>{e.name}</option>
                ))}
              </select>
              {input.technology.map((el, i) => (
                <li key={i}>
                  {el}
                  <button
                    type="reset"
                    onClick={() => handleDeleteTechnology(el)}
                  >
                    <GrFormClose />
                  </button>
                </li>
              ))}
            </div>
            <div className="flex flex-col w-full">
              <select
                className="rounded-xl bg-colorFondo2"
                name="language"
                onChange={(e) => handleSelectLenguge(e)}
              >
                <option selected disabled value="">
                  Lang...
                </option>
                {language.map((e) => (
                  <option value={e.name}>{e.name}</option>
                ))}
              </select>
              {input.language.map((el, i) => (
                <li key={i}>
                  {el}
                  <button type="reset" onClick={() => handleDeleteLanguage(el)}>
                    <GrFormClose />
                  </button>
                </li>
              ))}
            </div>
            <div className="flex flex-col w-full">
              <select
                className="rounded-xl bg-colorFondo2"
                name="seniority"
                onChange={(e) => handleSelectSeniority(e)}
              >
                <option selected disabled value="">
                  Seni...
                </option>
                {seniority.map((e) => (
                  <option value={e.name}>{e.name}</option>
                ))}
              </select>
              {input.seniority.map((el, i) => (
                <li key={i}>
                  {el}
                  <button
                    type="reset"
                    onClick={() => handleDeleteSeniority(el)}
                  >
                    <GrFormClose />
                  </button>
                </li>
              ))}
            </div>
          </div>
          <div className="w-full flex m-0 my-1 justify-center">
            <button className="rounded-xl bg-gradient-to-r to-colorDetalles1 from-colorBotones2 text-white font-ligth filter hover:drop-shadow transition ease-in-out hover:scale-105 px-2">
              Filter
            </button>
          </div>
        </div>
        <div>
          <hr className="bg-colorDetalles2 h-1 rounded-xl px-2 shadow-xl" />
        </div>
      </form>
    </div>
  );
}

export default SearcHome;

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
    dispatch(postVacancy(input), console.log(input));
    alert("Vacante creada");
    setInput({
      name: "",
      description: "",
      technology: [],
      seniority: [],
      language: [],
      business: email2,
      vacancies: "",
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
      {/* TAILWIND */}

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          
          <div className="mt-5 md:mt-0 md:col-span-3">
            <form onSubmit={(e) => handleSubmit(e)} method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={(e) => handleChange(e)}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                    Description:
                    </label>
                    <div className="mt-1">
                      <textarea
                        type="text-area"
                        name="description"
                        value={input.description}
                        onChange={(e) => handleChange(e)}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description for your profile. URLs are hyperlinked.
                    </p>
                  </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Technologies: 
                      </label>
                      <select
                        name="technology"
                        onChange={(e) => handleSelectTechno(e)}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                        Street address
                      </label>
                      <input
                        type="text"
                        name="street-address"
                        id="street-address"
                        autoComplete="street-address"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                        State / Province
                      </label>
                      <input
                        type="text"
                        name="region"
                        id="region"
                        autoComplete="address-level1"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                        ZIP / Postal code
                      </label>
                      <input
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        autoComplete="postal-code"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ACA */}
      <div className="bg-gray-300 w-fit m-10 rounded-2xl pb-4">
        <form onSubmit={(e) => handleSubmit(e)} className="m-10 pt-10 ">
          {/* <div className="w-full flex flex-col m-0 justify-center">
            <label> Name:</label>
            <input
              className="w-full xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro"
              type="text"
              name="name"
              value={input.name}
              onChange={(e) => handleChange(e)}
            />
          </div> */}
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
          <div className="w-full flex flex-col m-0 justify-center">
            <label> vacancies available:</label>
            <input
              className="w-full xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro"
              type="number"
              min={0}
              name="vacancies"
              value={input.vacancies}
              onChange={(e) => handleChange(e)}
            />
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

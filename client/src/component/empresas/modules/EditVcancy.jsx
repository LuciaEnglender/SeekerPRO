import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router";
import NavHomeE from "./NavHomeE";
import {
  getVacancyDetail,
  editVacancy,
  addLanguage,
  addSeñority,
  addSkill,
  addTechnology,
  deleteLanguage,
  deleteSeñority,
  deleteSkill,
  deleteTechnology,
} from "../../../redux/actions/index";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
import SideBarEdit from "./SideBarEdit";
import swal from "sweetalert";

function EditVcancy() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const detalle = useSelector((state) => state.rootReducer.vacancyDetail);
  const { id } = useParams();
  const technology = useSelector((state) => state.rootReducer.technology);
  const seniority = useSelector((state) => state.rootReducer.seniority);
  const language = useSelector((state) => state.rootReducer.language);
  const [input, setInput] = useState({
    name: detalle[0]?.name,
    description: detalle[0]?.description,
    technologies: detalle[0].technologies.map((ele) => ele.name),
    seniorities: detalle[0].seniorities.map((ele) => ele.name),
    languages: detalle[0]?.languages.map((ele) => ele.name),
    vacancies: detalle[0]?.vacancies,
  });

  useEffect(() => {
    dispatch(getVacancyDetail(id));
  }, [dispatch, id]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(editVacancy(id, input), console.log(input));
    swal({
      icon: "success",
      text: "Vacancy edited correctly",
      width: "90%",
      padding: "2em",
      color: "#716add",
      timer: "3000",
      timerProgressBar: true,
    });
    navigate(-2);
  }
  function handleSelectTechno(e) {
    console.log(input);
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
    }
  }
  function handleSelectLenguge(e) {
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
      setInput({
        ...input,
        seniorities: [e.target.value],
      });
      dispatch(addSeñority(id, e.target.value));
    }
  }
  ///////////delete///////
  const handleDeleteSeniority = (e) => {
    setInput({
      ...input,
      seniorities: input.seniorities.filter((el) => el !== e),
    });
    dispatch(deleteSeñority(id, e));
  };

  const handleDeleteLanguage = (e) => {
    setInput({
      ...input,
      languages: input.languages.filter((el) => el !== e),
    });
    dispatch(deleteLanguage(id, e));
    console.log(e);
  };

  const handleDeleteTechnology = (e) => {
    setInput({
      ...input,
      technologies: input.technologies.filter((el) => el !== e),
    });
    dispatch(deleteTechnology(id, e));
    console.log(e);
  };

  return (
    <div className="flex justify-center mt-20">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div
          className="w-full flex flex-col m-0 justify-center mt-6"
          key={detalle[0]?.id}
        >
          <label>Vacancy name</label>
          <input
            className="w-full xl:w-60 m-0 text-nuevoFondo border-verdeMuyClaro rounded-2xl bg-verdeClaro"
            name="name"
            type="text"
            value={input.name}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="w-full flex flex-col text-white  mt-6">
          <label>Description:</label>
          <textarea
            className="w-full xl:w-60 m-0 border-verdeMuyClaro text-nuevoFondo rounded-2xl bg-verdeClaro"
            name="description"
            type="text-area"
            value={input.description}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="w-full my-3 flex flex-col  mt-6 justify-center">
          <label> Technologies:</label>
          <select
            className="w-full xl:w-52 rounded-2xl text-nuevoFondo bg-white"
            name="technologies"
            onChange={(e) => handleSelectTechno(e)}
          >
            <option className="rounded-2xl bg-nuevoFondo" selected="false">
              Select...
            </option>
            {technology.map((e) => (
              <option
                value={e.name}
                key={e.id}
                className="rounded-2xl text-white bg-nuevoFondo"
              >
                {e.name}
              </option>
            ))}
          </select>
          <div className="flex  h-12 overflow-x-scroll w-64">
            {input.technologies.map((el, i) => (
              <li
                className="flex flex-row w-fit list-none m-1 text-nuevoFondo rounded-2xl bg-white"
                key={i}
                value={el}
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
          <div className="mt-6">
            <label> Seniority:</label>
            <select
              className="w-full xl:w-52 rounded-2xl bg-verdeClaro"
              name="seniorities"
              onChange={(e) => handleSelectSeniority(e)}
            >
              <option
                className="rounded-2xl bg-verdeClaro text-nuevoFondo"
                selected="false"
              >
                Select...
              </option>
              {seniority.map((e) => (
                <option
                  value={e.name}
                  key={e.id}
                  className="rounded-2xl bg-verdeClaro"
                >
                  {e.name}
                </option>
              ))}
            </select>
          </div>
          <div className="h-8 flex">
            {input.seniorities.map((el, i) => (
              <li
                className="flex flex-row w-fit list-none m-1 text-nuevoFondo rounded-2xl bg-white"
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
            ))}
          </div>
        </div>
        <div className="w-full my-3 flex flex-col mt-6 justify-center">
          <label> Language:</label>
          <select
            className="w-full xl:w-52 rounded-2xl text-nuevoFondo bg-white"
            name="languages"
            onChange={(e) => handleSelectLenguge(e)}
          >
            <option className="rounded-2xl bg-verdeClaro" selected="false">
              Select...
            </option>
            {language.map((e) => (
              <option
                value={e.name}
                key={e.id}
                className="rounded-2xl bg-verdeClaro"
              >
                {e.name}
              </option>
            ))}
          </select>
          <div className="h-8 flex">
            {input.languages.map((el, i) => (
              <li
                className="flex flex-row w-fit list-none m-1 text-nuevoFondo rounded-2xl bg-white"
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
            ))}
          </div>
          <div
            className="w-full flex flex-col  mt-6 justify-center"
            key={detalle[0]?.id}
          >
            <label>Vacancies available:</label>
            <input
              className="w-full px-2 text-nuevoFondo xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro"
              name="vacancies"
              type="number"
              min={0}
              value={input.vacancies}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <div className="w-full  my-3 flex m-0 justify-end">
          <button
            type="submit"
            className=" w-32 shadow-lg shadow-black rounded-2xl text-verdeHover bg-verdeOscuro hover:bg-verdeClaro"
          >
            Edit Vacancy
          </button>
        </div>
      </form>
      <Link to="/homee">
        <button>
          <BsFillArrowLeftSquareFill />
        </button>
      </Link>
    </div>
  );
}

export default EditVcancy;

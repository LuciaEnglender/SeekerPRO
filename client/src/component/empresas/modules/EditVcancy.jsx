import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router";
import NavHomeE from "./NavHomeE";
import { getVacancyDetail, editVacancy } from "../../../redux/actions/index";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";


function EditVcancy() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const detalle = useSelector((state) => state.rootReducer.vacancyDetail)
  const { id } = useParams()
  const technology = useSelector((state) => state.rootReducer.technology);
  const seniority = useSelector((state) => state.rootReducer.seniority);
  const language = useSelector((state) => state.rootReducer.language);
  const [input, setInput] = useState({
    name: detalle[0]?.name,
    description: detalle[0]?.description,
    technologies: detalle[0].technologies.map((ele) => ele.name),
    seniorities: detalle[0].seniorities.map((ele) => ele.name),
    languages: detalle[0]?.languages.map((ele) => ele.name),
  });

  useEffect(() => {
    dispatch(getVacancyDetail(id))
  }, [dispatch, id])

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    }, console.log(input));
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(editVacancy(id, input), console.log(input));
    alert("Vacante editada");
    navigate(-2);
  }
  function handleSelectTechno(e) {
    console.log(input.technologies);
    if (input.technologies.includes(e.target.value)) {
      alert("Already in the list");
    } else {
      setInput({
        ...input,
        technologies: [...input.technologies, e.target.value],
      });
    }
  }
  function handleSelectLenguge(e) {
    if (input.languages.includes(e.target.value)) {
      alert("Already in the list");
    } else {
      setInput({
        ...input,
        languages: [...input.languages, e.target.value],
      });
    }
  }
  function handleSelectSeniority(e) {
    if (input.seniorities.includes(e.target.value)) {
      alert("Already in the list");
    } else {
      setInput({
        ...input,
        seniorities: [...input.seniorities, e.target.value],
      });
    }
  }
  ///////////delete///////
  const handleDeleteSeniority = (e) => {
    setInput({
      ...input,
      seniorities: input.seniorities.filter((el) => el !== e),
    });
  };

  const handleDeleteLanguage = (e) => {
    setInput({
      ...input,
      languages: input.languages.filter((el) => el !== e),
    });
  };

  const handleDeleteTechnology = (e) => {
    setInput({
      ...input,
      technologies: input.technologies.filter((el) => el !== e),
    });
  };


  return (
    <div>
      <NavHomeE titulo={"Notificaciones"} />
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="w-full flex flex-col m-0 justify-center" key={detalle[0]?.id}>
          <label>Buscamos:</label>
          <input className="w-full xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro" name="name" type="text" value={input.name} onChange={(e) => handleChange(e)} />
        </div>
        <div className="w-full flex flex-col">
          <label>Descripcion de la vacante:</label>
          <textarea className="w-full xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro" name="description" type="text-area" value={input.description} onChange={(e) => handleChange(e)} />
        </div>
        <div className="w-full my-3 flex flex-col m-0 justify-center">
          <label> Tecnologias:</label>
          <select
            className="w-full xl:w-52 rounded-2xl bg-verdeClaro"
            name="technologies"
            onChange={(e) => handleSelectTechno(e)}
          >
            <option className="rounded-2xl bg-verdeClaro" selected="false">
              Select...
            </option>
            {technology.map((e) => (
              <option value={e.name} key={e.id} className="rounded-2xl bg-verdeClaro">{e.name}</option>
            ))}
          </select>
          <div>
            {input.technologies.map((el, i) => (
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
          <label> Seniority:</label>
          <select
            className="w-full xl:w-52 rounded-2xl bg-verdeClaro"
            name="seniorities"
            onChange={(e) => handleSelectSeniority(e)}
          >
            <option className="rounded-2xl bg-verdeClaro" selected="false">
              Select...
            </option>
            {seniority.map((e) => (
              <option value={e.name} key={e.id} className="rounded-2xl bg-verdeClaro">{e.name}</option>
            ))}
          </select>
          <div>
            {input.seniorities.map((el, i) => (
              <li
                className="flex flex-row w-fit list-none m-1 rounded-2xl bg-verdeHover"
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
        <div className="w-full my-3 flex flex-col m-0 justify-center">
          <label> Idioma:</label>
          <select
            className="w-full xl:w-52 rounded-2xl bg-verdeClaro"
            name="languages"
            onChange={(e) => handleSelectLenguge(e)}
          >
            <option className="rounded-2xl bg-verdeClaro" selected="false">
              Select...
            </option>
            {language.map((e) => (
              <option value={e.name} key={e.id} className="rounded-2xl bg-verdeClaro">{e.name}</option>
            ))}
          </select>
          <div>
            {input.languages.map((el, i) => (
              <li
                className="flex flex-row w-fit list-none m-1 rounded-2xl bg-verdeHover"
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
        </div>

        <div className="w-full  my-3 flex m-0 justify-center">
          <button type="submit" className=" w-32 shadow-lg shadow-black rounded-2xl text-verdeHover bg-verdeOscuro hover:bg-verdeClaro">
            Edit Vacancy</button>
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

export default EditVcancy
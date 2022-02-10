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
    } ,console.log(input));
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(editVacancy(id, input));
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
    if (input.seniority.includes(e.target.value)) {
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
      <div key={detalle[0]?.id}>
      <label>Buscamos:</label> <input name="name" type="text" value={input.name} onChange={(e) => handleChange(e)}/>  
      <label>Descripcion de la vacante:</label>  <input name="description" type="text" value={input.description} onChange={(e) => handleChange(e)}/> 
      <label>Seniority: </label><input name="seniorities" type="text" value={input.seniorities} onChange={(e) => handleChange(e)}/> 
      <label>Tecnologías Requeridas:</label>  <input  name="technologies" type="text" value={input.technologies} onChange={(e) => handleChange(e)}/> 
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
          
      <label>Idioma:</label> <input  name="languages" type="text" value={input.languages} onChange={(e) => handleChange(e)}/> 
      </div>
      <button type="submit" >Edit Vacancy</button>
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
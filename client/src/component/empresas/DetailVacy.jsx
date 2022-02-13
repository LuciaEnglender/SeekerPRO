import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router";
import NavHomeE from "./modules/NavHomeE";
import Pipeline from "./modules/Pipeline";
import { getPostulados, getVacancyDetail } from "../../redux/actions/index"
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import styles from "../ui ux/styles/DetailVacy.module.css"
import {deleteVacancy} from "../../redux/actions/index"


function DetailVacy() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const detalle = useSelector((state) => state.rootReducer.vacancyDetail)
  const { id } = useParams()

  useEffect(() => {
    dispatch(getVacancyDetail(id), getPostulados(id))
    }, [dispatch, id])
  console.log(detalle)

  function handleDelete(e) {
    e.preventDefault();
    dispatch(deleteVacancy(id))
    alert("Vacante eliminada correctamente ! ")
    console.log(id)
    navigate(-1);

}


  return <div>
    <NavHomeE titulo={"Notificaciones"} />
    <Pipeline id={id} />
    {detalle.length === 0 ?  <p>No vacancies</p> :
    <div key={detalle[0]?.id} >
     <div class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
  <div class="flex justify-center md:justify-end -mt-16">
    <img class="w-20 h-20 object-cover rounded-full border-2 border-indigo-500" src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"/>
  </div>
  <div key={detalle[0]?.id}>
    <h2 class="text-gray-800 text-3xl font-semibold">{detalle[0]?.name}</h2>
    <p class="mt-2 text-gray-600">Descripcion de la vacante: {detalle[0]?.description}</p>
    <p class="mt-2 text-gray-600">Seniority: {detalle[0].seniorities.length ? detalle[0].seniorities.map((ele) => ele.name) : <p> No especificado</p>}</p>
    <p class="mt-2 text-gray-600">Tecnologías Requeridas: {detalle[0].technologies.length ? detalle[0].technologies.map((ele) => ele.name + ", ") : <p> No especificado</p>}</p>
    <p class="mt-2 text-gray-600">Idioma: {detalle[0].languages.length ? detalle[0]?.languages.map((ele) => ele.name) : <p> No especificado</p>}</p>
  </div>
  
</div>
    </div> 
}
<div class="flex justify-end mt-4">
    <Link to={`/vacancy/edit/${id}`}>
      {/* <EditVcancy id={id} /> */}
      <button className="text-xl font-medium text-indigo-500">Edit Vacancy</button>
    </Link>
    </div>
    <div class="flex justify-end mt-4">
    <button className="text-xl font-medium text-indigo-500" onClick={e => { handleDelete(e) }} >Delete Vacancy</button>
    </div>
    <div>
    <Link to="/homee">
      <button>
        <BsFillArrowLeftSquareFill />
      </button>
    </Link>
    </div>
  </div>

}

export default DetailVacy;


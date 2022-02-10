import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router";
import NavHomeE from "./modules/NavHomeE";
import Pipeline from "./modules/Pipeline";
import { getVacancyDetail } from "../../redux/actions/index"
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import styles from "../ui ux/styles/DetailVacy.module.css"
import {deleteVacancy} from "../../redux/actions/index"


function DetailVacy() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const detalle = useSelector((state) => state.rootReducer.vacancyDetail)
  const { id } = useParams()

  useEffect(() => {
    dispatch(getVacancyDetail(id))
  }, [dispatch, id])
  console.log(detalle)

  function handleDelete(e) {
    e.preventDefault();
    dispatch(deleteVacancy(id))
    console.log(id)
    navigate(-1);

}


  return <div>
    <NavHomeE titulo={"Notificaciones"} />
    <Pipeline />
    <div key={detalle[0]?.id}>
      <h2>Buscamos: {detalle[0]?.name}</h2>
      <h3>Descripcion de la vacante: {detalle[0]?.description}</h3>
      <h4>Seniority: {detalle[0].seniorities.length ? detalle[0].seniorities.map((ele) => ele.name) : <p> No especificado</p>}</h4>
      <p>Tecnologías Requeridas: {detalle[0].technologies.length ? detalle[0].technologies.map((ele) => ele.name) : <p> No especificado</p>}</p>
      <p>Idioma: {detalle[0].languages.length ? detalle[0]?.languages.map((ele) => ele.name) : <p> No especificado</p>}</p>
    </div>
    <Link to={`/vacancy/edit/${id}`}>
      {/* <EditVcancy id={id} /> */}
      <button className={styles.button}>Edit Vacancy</button>
    </Link>

    <button className={styles.button} onClick={e => { handleDelete(e) }} >Delete Vacancy</button>
    <Link to="/homee">
      <button>
        <BsFillArrowLeftSquareFill />
      </button>
    </Link>
  </div>

}

export default DetailVacy;


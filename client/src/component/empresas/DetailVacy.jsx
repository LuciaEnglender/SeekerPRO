import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import NavHomeE from "./modules/NavHomeE";
import Pipeline from "./modules/Pipeline";
import { getVacancyDetail } from "../../redux/actions/index"
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import styles from "../ui ux/styles/DetailVacy.module.css"


function DetailVacy() {
  const dispatch = useDispatch()
  const detalle = useSelector((state) => state.rootReducer.vacancyDetail)
  const { id } = useParams()

  useEffect(() => {
    dispatch(getVacancyDetail(id))
  }, [dispatch, id])
  console.log(detalle)


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

    <button className={styles.button}>Delete Vacancy</button>
    <Link to="/homee">
      <button>
        <BsFillArrowLeftSquareFill />
      </button>
    </Link>
  </div>

}

export default DetailVacy;


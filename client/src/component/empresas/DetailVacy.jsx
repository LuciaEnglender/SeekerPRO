import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useParams, Link } from "react-router-dom";
import NavHomeE from "./modules/NavHomeE";
import Pipeline from "./modules/Pipeline";
import {getVacancyDetail} from "../../redux/actions/index"


function DetailVacy() {
  const dispatch = useDispatch()
  const detalle = useSelector((state) => state.rootReducer.vacancyDetail)
  const { id } = useParams()

  useEffect(() => {
    dispatch(getVacancyDetail(id))}, [dispatch, id])
console.log(detalle.name)

  return (
    <div>
      <NavHomeE titulo={"Notificaciones"} />
      <div>
        <Pipeline />
      </div>
      <div key={detalle?.id}>
      <h2>Buscamos: {detalle?.name}</h2>
      <h3>Descripcion de la vacante: {detalle?.description}</h3>
      {/* <p>Tecnologias rsequeridas: </p>
                {detail.activities?.length ? detail.activities.map((ele) => (<div key={count++}>Name: {ele.name}
                <p>Difficulty: {ele.difficulty}</p>
                <p>Duration: {ele.duration}</p>
                <p>Season: {ele.season}</p></div>
                )) : <p>No activities</p>} */}

      </div>

      <Link to="/homee">
        <button>Volver</button>
      </Link>
    </div>
  );
}

export default DetailVacy;

import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostulados, filterStatusPipeline } from "../../../redux/actions";
// import { ejemploPipe } from "./MOCKS/ejemploPipe";
import styles from "../../ui ux/styles/ButtonPipeline.css"
import { Link } from "react-router-dom";

function Pipeline() {
  const dispatch = useDispatch();

  // const postulados = useSelector((state) => state.postulados);
  // // const postuladosEjemplo = ejemploPipe;
  // useEffect(() => {
  //   dispatch(getPostulados());
  // }, [dispatch]);

  function handlePipeline(e) {
    dispatch(filterStatusPipeline(e.target.value));
  }

  return (
    <div>
      <div>
        <h1 className="postulados=">Estado de Postulantes</h1>
      </div>
      <button className={styles.buttonP} onClick={(e) => handlePipeline(e)} value="nuevo">
        nuevo
      </button>
      <button onClick={(e) => handlePipeline(e)} value="revision">
        revision
      </button>
      <button onClick={(e) => handlePipeline(e)} value="contactado">
        contactado
      </button>
      <button onClick={(e) => handlePipeline(e)} value="entrevista">
        entrevista
      </button>
      <button onClick={(e) => handlePipeline(e)} value="tech">
        entrevista técnica
      </button>
      <button onClick={(e) => handlePipeline(e)} value="ofrecido">
        ofrecido
      </button>
      <button onClick={(e) => handlePipeline(e)} value="contratado">
        contratado
      </button>
      <button onClick={(e) => handlePipeline(e)} value="rechazado">
        rechazado
      </button>
    </div>
  );
}

export default Pipeline;

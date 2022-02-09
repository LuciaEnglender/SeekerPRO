import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostulados, filterStatusPipeline } from "../../../redux/actions";
// import { ejemploPipe } from "./MOCKS/ejemploPipe";

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
        <h1 className="postulados=">Proceso de Selección</h1>
      </div>
      {/* <div>
        <h1>Postulados</h1>
        {postulados &&
          postuladosEjemplo.map((el) => {
            return (
              <ul key={el.id}>
                <p>----------------------------</p>
                <li>name: {el.name}</li>
                <li>techno: {el.technologies}</li>
                <li>idioma: {el.idioms}</li>
                <li>skills: {el.skills}</li>
              </ul>
            );
          })}
      </div> */}
      <button onClick={(e) => handlePipeline(e)} value="nuevo">
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

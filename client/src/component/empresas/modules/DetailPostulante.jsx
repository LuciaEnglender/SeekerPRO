import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postulanteDetail } from "../../../redux/actions";
import { BsFillArrowLeftSquareFill, BsFillTelephoneFill } from "react-icons/bs";

function DetailPostulante() {
  // const dispatch = useDispatch()
  // const el = useSelector((state) => state.detail)
  // const { id } = useParams();

  // useEffect(() => {
  //     dispatch(postulanteDetail(id));
  // }, [dispatch, id])

  //detalle del postulante
  return (
    <div>
      {/* <div>
          <p>Nombre : {el.name}</p>
          <p>genero: {el.gender}</p>
          <p><BsFillTelephoneFill/>{el.phone}</p>
          <p>{el.photo}</p>
          <p>{el.education}</p>
          <p>{el.experience}</p>
          <p>{el.CV}</p>
          <p>{el.location}</p>
          <p>{el.github}</p>
          <p>{el.linkedIn}</p>
          <p>{el.portfolio}</p>
      </div> */}
      <div>
        {/* SELECT PARA PONER ESTADO EN LA PIPELINE */}
        <select>
          <option value="nuevo">nuevo</option>
          <option value="revision">revision</option>
          <option value="contactado">contactado</option>
          <option value="entrevista">entrevista</option>
          <option value="tech">entrevista técnica</option>
          <option value="ofrecido">ofrecido</option>
          <option value="contratado">contratado</option>
          <option value="rechazado">rechazado</option>
        </select>
      </div>
      <Link to="/homee">
        <button>
          <BsFillArrowLeftSquareFill />
        </button>
      </Link>
    </div>
  );
}

export default DetailPostulante;

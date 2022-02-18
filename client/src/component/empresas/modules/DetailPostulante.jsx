import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {postulantDetail} from "../../../redux/actions/index"
import { BsFillArrowLeftSquareFill, BsFillTelephoneFill } from "react-icons/bs";
import NavHomeE from "./NavHomeE";

function DetailPostulante() {
  const dispatch = useDispatch()
  
  const { id } = useParams();
  
  useEffect(() => {
      dispatch(postulantDetail(id));
  }, [dispatch, id])

  const postulante = useSelector((state) => state.rootReducer.postulados)
    console.log(postulante)
  return (
    <div>
       {/* <NavHomeE titulo={"Notificaciones"} /> */}
       {postulante.length === 0 ? <p>No Details</p> : 
       <div>
          <p>Nombre : {postulante[0].name}</p>
          {/* <p>genero: {el.gender}</p>
          <p><BsFillTelephoneFill/>{el.phone}</p>
          <p>{el.photo}</p>
          <p>{el.education}</p>
          <p>{el.experience}</p>
          <p>{el.CV}</p>
          <p>{el.location}</p>
          <p>{el.github}</p>
          <p>{el.linkedIn}</p>
          <p>{el.portfolio}</p> */}
      </div> 
      }
      <div>
        <div>
        <button>Change candidate status</button>
        </div>
        {/* SELECT PARA PONER ESTADO EN LA PIPELINE */}
        <select>
          <option value="nuevo">new</option>
          <option value="revision">review</option>
          <option value="contactado">contacted</option>
          <option value="entrevista">interview</option>
          <option value="tech">tech interview</option>
          <option value="ofrecido">offered</option>
          <option value="contratado">hired</option>
          <option value="rechazado">rejected</option>
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
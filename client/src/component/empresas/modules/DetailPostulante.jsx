import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {postulantDetail, removeAll} from "../../../redux/actions/index"
import { BsFillArrowLeftSquareFill, BsFillTelephoneFill } from "react-icons/bs";
import NavHomeE from "./NavHomeE";

function DetailPostulante() {
  const dispatch = useDispatch()
  
  const { id } = useParams();
  console.log("id detail", id)
  
  useEffect(() => {

      dispatch(postulantDetail(id));

  }, [dispatch, id])

  const postulante = useSelector((state) => state.rootReducer.postulados)
    console.log("postulante", postulante)

    function handleClick(e){
      dispatch(removeAll())
    }
  return (
    <div>
       {/* <NavHomeE titulo={"Notificaciones"} /> */}
       {postulante.length === 0 ? <p>No Details</p> : 
       <div>
          <p>Nombre : {postulante[0].name}</p>
          <p>genero: {postulante[0].gender}</p>
          <p><BsFillTelephoneFill/>{postulante[0].phone}</p>
          <p>{postulante[0].photo}</p>
          <p>CV: {postulante[0].CV}</p>
          <p>{postulante[0].locations.map(el => el.name)}</p>
          <p>GitHub{postulante[0].github}</p>
          <p>Linkedin{postulante[0].linkedIn}</p>
          <p>Portfolio:{postulante[0].portfolio}</p>
          <p>{postulante[0].languages.map(el => el.name)}</p>
          <p>{postulante[0].seniorities.map(el => el.name)}</p>
          <p>{postulante[0].skills.map(el => el.name)}</p>
          <p>{postulante[0].technologies.map(el => el.name)}</p>
          
      </div> 
      }
      <div>
        <div>
        <button onClick={(e) => handleClick(e)}>Change candidate status</button>
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
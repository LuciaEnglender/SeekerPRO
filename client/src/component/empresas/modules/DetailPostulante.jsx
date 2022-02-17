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

  function handleSelect(e) {
   
    dispatch(deleteSeñority(id, asd))
      setInput({
        ...input,
        seniorities: [e.target.value],
      });
      dispatch(addSeñority(id, e.target.value));
    
  }
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
        <div>
         <label htmlFor="">Change candidate status</label>
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

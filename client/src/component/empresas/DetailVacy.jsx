import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router";
import NavHomeE from "./modules/NavHomeE";
import Pipeline from "./modules/Pipeline";
import { getPostulados, getVacancyDetail } from "../../redux/actions/index"
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { deleteVacancy, postVacancyPipeline } from "../../redux/actions/index"
import { useAuth0 } from "@auth0/auth0-react";

function DetailVacy() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const detalle = useSelector((state) => state.rootReducer.vacancyDetail)
  const { id } = useParams()
  //console.log("soy un id en detail" )
  const { user } = useAuth0()

  useEffect(() => {
    dispatch(getVacancyDetail(id), getPostulados(id))
  }, [dispatch, id])
  console.log(detalle)
  
  useEffect(()=>{

  }, [Pipeline])

  function handleDelete(e) {
    e.preventDefault();
    dispatch(deleteVacancy(id))
    alert("Vacante eliminada correctamente ! ")
    navigate(-1);
  }

  return <div className="bg-gray-300">
    <NavHomeE titulo={"Notificaciones"} />
    <Pipeline id={id} />
    {detalle.length === 0 ? <p>No vacancies</p> :
      <div key={detalle[0]?.id} >
        <div class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-10 ml-8" >
          <div class="flex justify-center md:justify-end -mt-8">
            <img class="w-20 h-20 object-cover rounded-full b=order-2 border-verdeClaro" src={user.picture} />
          </div>
          <div className="p-5" key={detalle[0]?.id}>
            <h2 class="text-gray-800 text-3x3 font-semibold">{detalle[0]?.name}</h2>
            <p class="mt-2 text-gray-600">Descripcion de la vacante: {detalle[0]?.description}</p>
            <p class="mt-2 text-gray-600">Seniority: {detalle[0].seniorities.length ? detalle[0].seniorities.map((ele) => ele.name) : <p> No especificado</p>}</p>
            <p class="mt-2 text-gray-600">Tecnologías Requeridas: {detalle[0].technologies.length ? detalle[0].technologies.map((ele) => ele.name + ", ") : <p> No especificado</p>}</p>
            <p class="mt-2 text-gray-600">Idioma: {detalle[0].languages.length ? detalle[0]?.languages.map((ele) => ele.name) : <p> No especificado</p>}</p>
            <div class="flex justify-end mt-1">
              <Link to={`/vacancy/edit/${id}`}>
                {/* <EditVcancy id={id} /> */}
                <button className="text-xs font-medium text-indigo-500">Edit Vacancy</button>
              </Link>
            </div>
            <div class="flex justify-end mt-4">
              <button className="text-xs font-medium text-indigo-500" onClick={e => { handleDelete(e) }} >Delete Vacancy</button>
            </div>
            {/* <div class="flex justify-end mt-4">
              <button className="text-xs font-medium text-indigo-500" onClick={e => { handlePipeline(e) }} >Pipeline</button>
            </div> */}
          </div>

        </div>
      </div>
    }

    <div className="ml-8">
      <Link to="/homee">
        <button>
          <BsFillArrowLeftSquareFill />
        </button>
      </Link>
    </div>
  </div>

}

export default DetailVacy;


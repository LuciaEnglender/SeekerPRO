import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { postulantDetail } from "../../../redux/actions/index"
import { BsFillArrowLeftSquareFill, BsFillTelephoneFill } from "react-icons/bs";
import NavHomeE from "./NavHomeE";

function DetailPostulante() {
  const dispatch = useDispatch()
  const postulante = useSelector((state) => state.rootReducer.postulados)

  const { id } = useParams();
  console.log("id detail", id)

  useEffect(() => {
    dispatch(postulantDetail(id));
  }, [dispatch, id])

  //console.log("postulante", postulante)
  
  return (<div className="bg-gray-300">
    {/* <NavHomeE titulo={"Notificaciones"} /> */}
    {postulante.length === 0 ? <p>No Details</p> :
      <div key={postulante[0]?.id} >
        <div class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-10 ml-8" >
          <div class="flex justify-center md:justify-end -mt-8">
            {/* <img class="w-20 h-20 object-cover rounded-full b=order-2 border-verdeClaro" src={user.picture} /> */}
          </div>
          <div className="p-5" key={postulante[0]?.id}>
            <h2 class="text-gray-800 text-3x3 font-semibold">Nombre : {postulante[0]?.name}</h2>
            <p class="mt-2 text-gray-600">genero: {postulante[0]?.gender}</p>
            <p class="mt-2 text-gray-600"><BsFillTelephoneFill />{postulante[0].phone}</p>
            <p class="mt-2 text-gray-600">{postulante[0]?.photo}</p>
            {/* <p class="mt-2 text-gray-600">CV: {postulante[0]?.CV}</p>
          <p class="mt-2 text-gray-600">{postulante[0]?.locations.map(el => el.name)}</p>
          <p class="mt-2 text-gray-600">GitHub{postulante[0]?.github}</p>
          <p class="mt-2 text-gray-600">Linkedin{postulante[0]?.linkedIn}</p>
          <p class="mt-2 text-gray-600">Portfolio:{postulante[0]?.portfolio}</p>
          <p class="mt-2 text-gray-600">{postulante[0]?.languages.map(el => el.name)}</p>
          <p class="mt-2 text-gray-600">{postulante[0]?.seniorities.map(el => el.name)}</p>
          <p class="mt-2 text-gray-600">{postulante[0]?.skills.map(el => el.name)}</p>
          <p class="mt-2 text-gray-600">{postulante[0]?.technologies.map(el => el.name)}</p> */}
            <div class="flex justify-end mt-1">
            </div>
          </div>
        </div>
        <Link to="/homee">
          <button>
            <BsFillArrowLeftSquareFill />
          </button>
        </Link>
      </div>}
  </div>
  )
}

export default DetailPostulante;
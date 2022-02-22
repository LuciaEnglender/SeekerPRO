import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { postulantDetail } from "../../../redux/actions/index"
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { BsFillArrowLeftSquareFill, BsFillTelephoneFill } from "react-icons/bs";
import NavHomeE from "./NavHomeE";

function DetailPostulante() {
  const dispatch = useDispatch()
  const postulante = useSelector((state) => state.rootReducer.postulados)
  console.log(postulante)

  const { id } = useParams();
  //console.log("id detail", id)

  useEffect(() => {
    dispatch(postulantDetail(id));
  }, [])

  //console.log("postulante", postulante)

  return (<div className="bg-gray-300">
    <NavHomeE titulo={"Notificaciones"} />
    {postulante.length === 0 ? <p>No Details</p> :
      <div key={postulante[0].id} >
        <div class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-10 ml-8" >
          <div class="flex justify-center md:justify-end -mt-8">
            {/* <img class="w-20 h-20 object-cover rounded-full b=order-2 border-verdeClaro" src={user.picture} /> */}
          </div>
          <div className="p-5" key={postulante[0].id}>
            <h2 class="text-gray-800 text-3x3 font-semibold">Name : {postulante[0]?.name}</h2>
            <p class="mt-2 text-gray-600">Gender: {postulante[0]?.gender}</p>
            <p class="mt-2 text-gray-600"><BsFillTelephoneFill />{postulante[0].phone}</p>
            {/* <p class="mt-2 text-gray-600">{postulante[0]?.photo}</p> */}
            <p class="mt-2 text-gray-600">CV: {postulante[0]?.CV}</p>
            <p class="mt-2 text-gray-600">Location: {postulante[0].locations && postulante[0].locations.length ? postulante[0].locations.map((loc) => loc.name) : <p> No especificado</p>}</p>
            <p class="mt-2 text-gray-600"> <AiFillGithub /> {postulante[0]?.github}</p>
            <p class="mt-2 text-gray-600"><AiFillLinkedin /> {postulante[0]?.linkedIn}</p>
            <p class="mt-2 text-gray-600">Portfolio:{postulante[0]?.portfolio}</p>
            <p class="mt-2 text-gray-600">Languages: {postulante[0].languages && postulante[0].languages.length ? postulante[0].languages.map((lang) => lang.name) : <p> Non tell</p>}</p>
            <p class="mt-2 text-gray-600">Seniority: {postulante[0].seniorities && postulante[0].seniorities.length ? postulante[0].seniorities.map((sen) => sen.name) : <p> Non tell</p>}</p>
            <p class="mt-2 text-gray-600">Technologies: {postulante[0].technologies && postulante[0].technologies.length ? postulante[0].technologies.map((t) => t.name + ", ") : <p>Non tell</p>}</p>
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
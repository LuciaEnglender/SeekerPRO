import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router";
import NavHomeE from "./modules/NavHomeE";
import Pipeline from "./modules/Pipeline";
import { getPostulados, getVacancyDetail } from "../../redux/actions/index"
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { deleteVacancy, postVacancyPipeline } from "../../redux/actions/index"
import { useAuth0 } from "@auth0/auth0-react";
import SideBarEdit from "./modules/SideBarEdit";
import { PaperClipIcon } from '@heroicons/react/solid'


function DetailVacy() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const detalle = useSelector((state) => state.rootReducer.vacancyDetail)
  const { id } = useParams()
  //console.log("soy un id en detail" )
  const { user } = useAuth0()
 
  const[openVac, setOpenVac]=useState(false)
  const[isopen, setIsOpen]=useState(false)


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

  return (<div className="min-h-full">
      {/* NAVEGACsION */}
      <NavHomeE />
      {/* BODY */}
      <header className="bg-verdeOscuro shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Vacancy Information</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto bg-verdeOscuro sm:px-6 lg:px-8">
          {/* !!!!!!!!!! CSS DE ACA PARA ABAJO !!!!!!!!!!!!! */}
    {detalle.length === 0 ? <p>No vacancies</p> :
    
      <div key={detalle[0]?.id} >
<div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
       
        <p className="mt-1 max-w-2xl text-xl text-gray-500">{detalle[0]?.name}</p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Description</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {detalle[0]?.description}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Seniority</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{detalle[0].seniorities.length ? detalle[0].seniorities.map((ele) => ele.name) : <p> Not specified</p>}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Required Technologies:</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{detalle[0].technologies.length ? detalle[0].technologies.map((ele) => ele.name + ", ") : <p> Not specified</p>}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Languages:</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{detalle[0].languages.length ? detalle[0]?.languages.map((ele) => ele.name) : <p> Not specified</p>}</dd>
          </div>
          <div className="bg-white px-4 w-full text-cpy-5 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium w-full text-gray-500 ">
               {/* <Link to={`/vacancy/edit/${id}`}> */}
                <button className="text-xs font-medium  text-indigo-500 " onClick={()=> {
            setIsOpen(true)
            setOpenVac(true)
          }}>Edit Vacancy</button>
           {isopen && (
                      <SideBarEdit
                        openVac={openVac}
                        setOpenVac={setOpenVac}
                      />
                    )}
              {/* </Link> */}
            </dt>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
            <button className="text-xs font-medium text-indigo-500" onClick={e => { handleDelete(e) }} >Delete Vacancy</button>
            </dt>
          </div>
        </dl>
      </div>
    </div>
        {/* VIEJA VACANCY DETAIL 
        <div class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-10 ml-8" >
          <div class="flex justify-center md:justify-end -mt-8">
            <img class="w-20 h-20 object-cover rounded-full b=order-2 border-verdeClaro" src={user.picture} />
          </div>
          <div className="p-5" key={detalle[0]?.id}>
            <h2 class="text-gray-800 text-3x3 font-semibold">{detalle[0]?.name}</h2>
            <p class="mt-2 text-gray-600">Vacancy description: {detalle[0]?.description}</p>
            <p class="mt-2 text-gray-600">Seniority: {detalle[0].seniorities.length ? detalle[0].seniorities.map((ele) => ele.name) : <p> No especificado</p>}</p>
            <p class="mt-2 text-gray-600">Required technologies: {detalle[0].technologies.length ? detalle[0].technologies.map((ele) => ele.name + ", ") : <p> No especificado</p>}</p>
            <p class="mt-2 text-gray-600">Language: {detalle[0].languages.length ? detalle[0]?.languages.map((ele) => ele.name) : <p> No especificado</p>}</p>
            <div class="flex justify-end mt-1">
              <Link to={`/vacancy/edit/${id}`}>
                <button className="text-xs font-medium text-indigo-500">Edit Vacancy</button>
              </Link>
            </div>
            <div class="flex justify-end mt-4">
              <button className="text-xs font-medium text-indigo-500" onClick={e => { handleDelete(e) }} >Delete Vacancy</button>
            </div>
          </div>
        </div> */}
        
      </div>
    }
  <Pipeline id={id} />
    <div className="ml-8">
      <Link to="/homee">
        <button>
          <BsFillArrowLeftSquareFill />
        </button>
      </Link>
    </div>
  {/* /End replace */}
  </div>
      </main>
    </div>
)
}

export default DetailVacy;


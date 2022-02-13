import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostulados, filterStatusPipeline } from "../../../redux/actions";
// import { ejemploPipe } from "./MOCKS/ejemploPipe";
import { Link } from "react-router-dom";
import PostulantesVacancy from "../PostulantesVacancy";
import { useAuth0 } from "@auth0/auth0-react";

function Pipeline({id}) {
  const dispatch = useDispatch();
  const { user } = useAuth0()
  const postulados = useSelector((state) => state.rootReducer.postulados);
  console.log(postulados)
  // const postuladosEjemplo = ejemploPipe;
  useEffect(() => {
    dispatch(getPostulados(id));
  }, [dispatch]);

  // function handlePipeline(e) {
  //   dispatch(filterStatusPipeline(e.target.value));
  // }
  useEffect(() => {
  let tabsContainer = document.querySelector("#tabs");

  let tabTogglers = tabsContainer.querySelectorAll("a")
  console.log(tabTogglers)

  tabTogglers.forEach(function(toggler) {
    toggler.addEventListener("click", function (e) {
      e.preventDefault();

      let tabName = this.getAttribute("href");

      let tabContents = document.querySelector("#tab-contents");

      for (let i = 0; i < tabContents.children.length; i++) {

        tabTogglers[i].parentElement.classList.remove("border-blue-400", "border-b", "-mb-px", "opacity-100"); tabContents.children[i].classList.remove("hidden");
        if ("#" + tabContents.children[i].id === tabName) {
          continue;
        }
        tabContents.children[i].classList.add("hidden");

      }
      e.target.parentElement.classList.add("border-blue-400", "border-b-4", "-mb-px", "opacity-100");
    })
  });

  document.getElementById("default-tab").click();
}, [dispatch]);


  return (
    <div>
      <div class="w-1 mx-auto mt-4  rounded">

        <ul id="tabs" class="inline-flex w-full px-1 pt-2 ">
          <li class="px-4 py-2 -mb-px font-semibold text-gray-800 border-b-2 border-blue-400 rounded-t opacity-50"><a id="default-tab" href="#first">Nuevo</a></li>
          <li class="px-4 py-2 font-semibold text-gray-800 rounded-t opacity-50"><a href="#second">Entrevista</a></li>
          <li class="px-4 py-2 font-semibold text-gray-800 rounded-t opacity-50"><a href="#third">Contactado</a></li>
          <li class="px-4 py-2 font-semibold text-gray-800 rounded-t opacity-50"><a href="#fourth">Contratado</a></li>
        </ul>


        <div id="tab-contents">
          <div id="first" class="p-4">
          {postulados.length === 0 ? <p>Waiting for people...</p> : 
           <div >
           <div class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-5 ml-5" >
        <div class="flex justify-center md:justify-end -mt-8">
          {/* <img class="w-20 h-20 object-cover rounded-full b=order-2 border-verdeClaro" src={user.picture}/> */}
        </div>
        <div className="p-2">
          <h2 class="text-gray-800 text-2x2 font-semibold">{postulados[0]?.name}</h2>
          {/* <p class="mt-2 text-gray-600">Descripcion de la vacante: {detalle[0]?.description}</p>
          <p class="mt-2 text-gray-600">Seniority: {detalle[0].seniorities.length ? detalle[0].seniorities.map((ele) => ele.name) : <p> No especificado</p>}</p>
          <p class="mt-2 text-gray-600">Tecnologías Requeridas: {detalle[0].technologies.length ? detalle[0].technologies.map((ele) => ele.name + ", ") : <p> No especificado</p>}</p>
          <p class="mt-2 text-gray-600">Idioma: {detalle[0].languages.length ? detalle[0]?.languages.map((ele) => ele.name) : <p> No especificado</p>}</p> */}
          {/* <div class="flex justify-end mt-1">
          <Link to={`/vacancy/edit/${id}`}> */}
            {/* <EditVcancy id={id} /> */}
            {/* <button className="text-xs font-medium text-indigo-500">Edit Vacancy</button>
          </Link>
          </div>
          <div class="flex justify-end mt-4">
          <button className="text-xs font-medium text-indigo-500" onClick={e => { handleDelete(e) }} >Delete Vacancy</button>
          </div> */}
        </div>
        
      </div>
          </div> 
          }
          </div>
          <div id="second" class="hidden p-4">
            Entrevista
          </div>
          <div id="third" class="hidden p-4">
            Contactado
          </div>
          <div id="fourth" class="hidden p-4">
            Contratado
          </div>
        </div>
      </div>

     
    </div>
  );
}

export default Pipeline;

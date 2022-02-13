import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostulados, filterStatusPipeline } from "../../../redux/actions";
// import { ejemploPipe } from "./MOCKS/ejemploPipe";
import styles from "../../ui ux/styles/ButtonPipeline.css"
import { Link } from "react-router-dom";
import PostulantesVacancy from "../PostulantesVacancy";

function Pipeline({id}) {
  const dispatch = useDispatch();

  // const postulados = useSelector((state) => state.postulados);
  // // const postuladosEjemplo = ejemploPipe;
  // useEffect(() => {
  //   dispatch(getPostulados());
  // }, [dispatch]);

  function handlePipeline(e) {
    dispatch(filterStatusPipeline(e.target.value));
  }
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
          Nuevo
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

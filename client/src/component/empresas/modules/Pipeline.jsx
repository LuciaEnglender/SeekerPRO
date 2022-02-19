import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostulados, postulantDetail, removeAll } from "../../../redux/actions/index";
import { Link } from "react-router-dom";
import {addNew, addReview, addContact, addInterviewRRHH, addInterviewTech, addOffered, addHired, addRejected } from "../../../redux/actions/index"
import { useAuth0 } from "@auth0/auth0-react";
import { Fragment, useEffect, useRef, useState } from 'react'


function Pipeline({ id }) {
  const dispatch = useDispatch();
  const { user } = useAuth0()
  const postulados = useSelector((state) => state.rootReducer.postulados);
  console.log(postulados)
  
  useEffect(() => {
    dispatch(getPostulados(id))
  }, [dispatch, id]);
 
  useEffect(() => {
    let tabsContainer = document.querySelector("#tabs");
    let tabTogglers = tabsContainer.querySelectorAll("a")
    tabTogglers.forEach(function (toggler) {
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

  const [input, setInput] = useState({
    idPostulant: "",
    action: "",
})
  //console.log(input)
  
  function handleSelect(e) {
    setInput({
        ...input, 
        //idPostulant: e.target.key,
        action: e.target.value
    })
}
function handleSubmit(e) {
    e.preventDefault()
    dispatch(removeAll(id, input.idPostulant));
    if (input.action === "new" ) {
        dispatch(addNew(id, input.idPostulant))
        //setInput({})
    }
    if (input.action === "review" ) {
      dispatch(addReview(id, input.idPostulant))}

    else { alert("Choose an option") }

}


  return (
    <div>
      <div class="w-1 mx-auto mt-4  rounded">
        <ul id="tabs" class="inline-flex w-full px-1 pt-2 ">
          <li class="px-4 py-2 -mb-px font-semibold text-gray-800 border-b-2 border-blue-400 rounded-t opacity-80"><a id="default-tab" href="#first">New</a></li>
          <li class="px-4 py-2 font-semibold text-gray-800 rounded-t opacity-60"><a href="#second">Review</a></li>
          <li class="px-4 py-2 font-semibold text-gray-800 rounded-t opacity-60"><a href="#third">Contacted</a></li>
          <li class="px-4 py-2 font-semibold text-gray-800 rounded-t opacity-60"><a href="#fourth">Interview</a></li>
          {/* <li class="px-4 py-2 font-semibold text-gray-800 rounded-t opacity-60"><a href="#five">Tech Interview</a></li>
          <li class="px-4 py-2 font-semibold text-gray-800 rounded-t opacity-60"><a href="#six">Offered</a></li>
          <li class="px-4 py-2 font-semibold text-gray-800 rounded-t opacity-60"><a href="#seven">Hired</a></li>
          <li class="px-4 py-2 font-semibold text-gray-800 rounded-t opacity-60"><a href="#eight">Rejected</a></li> */}
        </ul>
        <div id="tab-contents">
          {/* renderizado primer estado NEW */}
          <div id="first" class="p-4">
            {postulados.length === 0 ? <p>Waiting for people...</p> :
              postulados.map((el) => {
                //console.log(el.loginEmail, id)
                return (
                  <div >
                    <div class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-5 ml-5" >
                      {/* <div class="flex justify-center md:justify-end -mt-8"> */}
                      {/* <img class="w-20 h-20 object-cover rounded-full b=order-2 border-verdeClaro" src={user.picture}/> */}
                      {/* </div> */}
                      <Link to={`/postulant/${el.loginEmail}`}>
                        <h2 class="text-gray-800 text-2x2 font-semibold">{el.name}</h2>
                      </Link>
                      <div class="flex justify-center mt-2">
                        <button onClick={() => setInput({idPostulant: el.id})}>change status</button>
                      {console.log(id, input.idPostulant)}
                      </div>
                      <form onSubmit={(e) => handleSubmit(e)}>
                      <select onChange={(e) => handleSelect(e)}>
                <option value="new" key={el.id}>new</option>
                <option value="review" key={el.id}>review</option>
                <option value="contacted" key={el.id}>contacted</option>
                <option value="interview" key={el.id}>interview</option>
                <option value="techInterview" key={el.id}>tech interview</option>
                <option value="offered" key={el.id}>offered</option>
                <option value="hired" key={el.id}>hired</option>
                <option value="rejected" key={el.id}>rejected</option>
              </select>
              <button type="submit">confirm</button>
               
            </form>
                    </div>
                  </div>
                )
              })
            }
          </div>
          {/* renderizado estado REVIEW */}
          <div id="second" class="hidden p-4">
            {postulados.length === 0 ? <p>Enterview</p> :
              postulados.map((el) => {
                //console.log(el.loginEmail, id)
                return (
                  <div >
                    <div class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-5 ml-5" >
                      {/* <div class="flex justify-center md:justify-end -mt-8"> */}
                      {/* <img class="w-20 h-20 object-cover rounded-full b=order-2 border-verdeClaro" src={user.picture}/> */}
                      {/* </div> */}
                      <Link to={`/postulant/${el.loginEmail}`}>
                        <h2 class="text-gray-800 text-2x2 font-semibold">{el.name}</h2>
                      </Link>
                      <div class="flex justify-center mt-2">
                        <button onClick={() => dispatch(removeAll(id, el.id))}>change status</button>
                      </div>
                    </div>
                  </div>
                )
              })
            }
            <div>
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
          </div>
          <div id="third" class="hidden p-4">
            Contactado
          </div>
          <div id="fourth" class="hidden p-4">
            Contratado
          </div>
          {/* <div id="five" class="hidden p-4">
            Contratado
          </div>
          <div id="six" class="hidden p-4">
            Contratado
          </div>
          <div id="seven" class="hidden p-4">
            Contratado
          </div>
          <div id="eight" class="hidden p-4">
            Contratado
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Pipeline;

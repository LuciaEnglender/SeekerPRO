import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getPostulados,
  getTechInterview,
  getOffered,
  getPostulantsRejected,
  removeAll,
  getReview,
  getHired,
  getContacted,
  getInterview,
  addNew,
  addReview,
  addContact,
  addInterviewRRHH,
  addInterviewTech,
  addOffered,
  addHired,
  addRejected,
} from "../../../redux/actions/index";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { PaperClipIcon } from "@heroicons/react/solid";

function Pipeline({ id }) {
  const dispatch = useDispatch();
  const postulados = useSelector((state) => state.rootReducer.postulados);
  const review = useSelector((state) => state.rootReducer.review);
  const contacted = useSelector((state) => state.rootReducer.contacted);
  const interview = useSelector((state) => state.rootReducer.interview);
  const tech = useSelector((state) => state.rootReducer.techInterview);
  const offered = useSelector((state) => state.rootReducer.offered);
  const hired = useSelector((state) => state.rootReducer.hired);
  const rejected = useSelector((state) => state.rootReducer.rejected);

  const [flag, setFlag] = useState(0); //seteamos un flag que va a ser el puntero de re renderizacion del componente,()
  var x = flag; // hacemos una variable referencia de flag(no se puede usar var en un useState)
  const [state, setState] = useState(""); //seteamos un state pivote para el rerender del handlesubmit, que ahora al re renderizar, va a cumplir la condicion del if dentro del
  //useEffect que va a setear el flag en 1 y va a despachar el gerpostulados(id) una unica vez.
  useEffect(() => {
    dispatch(getPostulados(id));
    dispatch(getReview(id));
    dispatch(getContacted(id));
    dispatch(getInterview(id));
    dispatch(getTechInterview(id));
    dispatch(getOffered(id));
    dispatch(getHired(id));
    dispatch(getPostulantsRejected(id));
    if (flag < 1 && state !== "") {
      setFlag(x + 1);
      dispatch(getPostulados(id));
    }
  }, [dispatch, flag, state]);

  useEffect(() => {
    //PARA EL ESTILO DE LA PIPELINE
    let tabsContainer = document.querySelector("#tabs");
    let tabTogglers = tabsContainer.querySelectorAll("a");
    tabTogglers.forEach(function (toggler) {
      toggler.addEventListener("click", function (e) {
        e.preventDefault();
        let tabName = this.getAttribute("href");
        let tabContents = document.querySelector("#tab-contents");
        for (let i = 0; i < tabContents.children.length; i++) {
          tabTogglers[i].parentElement.classList.remove(
            "border-blue-400",
            "border-b",
            "-mb-px",
            "opacity-100"
          );
          tabContents.children[i].classList.remove("hidden");
          if ("#" + tabContents.children[i].id === tabName) {
            continue;
          }
          tabContents.children[i].classList.add("hidden");
        }
        e.target.parentElement.classList.add(
          "border-blue-400",
          "border-b-4",
          "-mb-px",
          "opacity-100"
        );
      });
    });
    document.getElementById("default-tab").click();
  }, []);

  useEffect(() => {}, [state]);

  const [input, setInput] = useState({
    idPostulant: "",
    action: "",
  });

  function useForceUpdate() {
    const [value, setValue] = useState(0);
    console.log("force update"); // integer state
    return () => setValue((value) => value + 1); // update the state to force render
  }
  //const forceUpdate = useForceUpdate();

  //console.log(input)
  function handleSelect(e) {
    setInput({
      ...input,
      //idPostulant: e.target.key,
      action: e.target.value,
    });
  }

  //    useEffect(()=>{
  // removeAll(id, input.idPostulant)
  //    })
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);
  const [toggle4, setToggle4] = useState(false);
  const [toggle5, setToggle5] = useState(false);
  const [toggle7, setToggle7] = useState(false);
  const [toggle6, setToggle6] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(removeAll(id, input.idPostulant))
      .then(() => {
        if (input.action === "new") {
          setState("new");
          return dispatch(addNew(id, input.idPostulant));
        }
        if (input.action === "review") {
          setState("review");
          return dispatch(addReview(id, input.idPostulant));
        }
        if (input.action === "contacted") {
          setState("contacted");
          return dispatch(addContact(id, input.idPostulant));
        }
        if (input.action === "interview") {
          setState("interview");
          return dispatch(addInterviewRRHH(id, input.idPostulant));
        }
        if (input.action === "techInterview") {
          setState("techInterview");
          return dispatch(addInterviewTech(id, input.idPostulant));
        }
        if (input.action === "offered") {
          setState("offered");
          return dispatch(addOffered(id, input.idPostulant));
        }
        if (input.action === "hired") {
          setState("hired");
          return dispatch(addHired(id, input.idPostulant));
        }
        if (input.action === "rejected") {
          setState("rejected");
          return dispatch(addRejected(id, input.idPostulant));
        }
        // else { alert("Choose an option") };
        // return
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="flex ">
      <div class="flex flex-col  w-full m-0 mt-4 bg-gray-50 justify-center rounded-xl">
        <ul id="tabs" class="inline-flex justify-around w-full px-1 pt-2 ">
          <li class="px-4 py-2 -mb-px font-semibold text-nuevoFondo border-b-2 border-blue-400 rounded-t opacity-80 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ">
            <a id="default-tab" href="#first">
              New
            </a>
          </li>
          <li class="px-4 py-2 font-semibold text-nuevoFondo rounded-t opacity-70 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ">
            <a href="#second">Review</a>
          </li>
          <li class="px-4 py-2 font-semibold text-nuevoFondo rounded-t opacity-70 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ">
            <a href="#third">Contacted</a>
          </li>
          <li class="px-4 py-2 font-semibold text-nuevoFondo rounded-t opacity-70 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ">
            <a href="#fourth">Interview</a>
          </li>
          <li class="px-4 py-2 font-semibold text-nuevoFondo rounded-t opacity-70 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ">
            <a href="#five">Tech Interv</a>
          </li>
          <li class="px-4 py-2 font-semibold text-nuevoFondo rounded-t opacity-70 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ">
            <a href="#six">Offered</a>
          </li>
          <li class="px-4 py-2 font-semibold text-nuevoFondo rounded-t opacity-70 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ">
            <a href="#seven">Hired</a>
          </li>
          <li class="px-4 py-2 font-semibold text-nuevoFondo rounded-t opacity-70 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ">
            <a href="#eight">Rejected</a>
          </li>
        </ul>
        <div
          id="tab-contents"
          className="bg-gray-100 h-96 w-full flex flex-col"
        >
          {/* renderizado primer estado NEW */}
          <div id="first" className="p-4 h-96 w-full flex flex-col">
            <h1 className="text-3xl text-black">NEW</h1>
            {postulados.length === 0 ? (
              <p className="text-black">Waiting for people...</p>
            ) : (
              postulados.map((el) => {
                return (
                  <div className="w-96">
                    <div class=" w-96 py-4 px-8 bg-white shadow-lg rounded-lg my-5 ml-5">
                      <Link to={`/postulant/${el.loginEmail}`}>
                        <h2 class="text-gray-800 text-2x2 font-semibold">
                          {el.name}
                        </h2>
                      </Link>

                      <div class="flex justify-center mt-2 text-black">
                        <button
                          onClick={() => {
                            setInput({ idPostulant: el.id });
                            setToggle1(true);
                          }}
                        >
                          change status
                        </button>
                      </div>
                      {toggle1 && (
                        <form
                          onSubmit={(e) => {
                            handleSubmit(e);
                          }}
                        >
                          <select
                            className="bg-gray-100 rounded-xl mr-2 text-black"
                            onChange={(e) => handleSelect(e)}
                          >
                            <option
                              value="new"
                              className="text-black"
                              key={el.id}
                            >
                              new
                            </option>
                            <option
                              value="review"
                              className="text-black"
                              key={el.id}
                            >
                              review
                            </option>
                            <option
                              value="contacted"
                              className="text-black"
                              key={el.id}
                            >
                              contacted
                            </option>
                            <option
                              value="interview"
                              className="text-black"
                              key={el.id}
                            >
                              interview
                            </option>
                            <option
                              value="techInterview"
                              className="text-black"
                              key={el.id}
                            >
                              tech interview
                            </option>
                            <option
                              value="offered"
                              className="text-black"
                              key={el.id}
                            >
                              offered
                            </option>
                            <option
                              value="hired"
                              className="text-black"
                              key={el.id}
                            >
                              hired
                            </option>
                            <option
                              value="rejected"
                              className="text-black"
                              key={el.id}
                            >
                              rejected
                            </option>
                          </select>
                          <button
                            className="bg-gray-100 rounded-xl mr-2 text-black"
                            type="submit"
                          >
                            confirm change
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
          {/* renderizado estado REVIEW */}
          <div id="second" class="hidden p-4">
            <h1 className="text-3xl text-black">REVIEW</h1>
            {review.length === 0 ? (
              <p className="text-black">Waiting for people...</p>
            ) : (
              review.map((el) => {
                //console.log(el.loginEmail, id)
                return (
                  <div>
                    <div class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-5 ml-5">
                      <Link to={`/postulant/${el.loginEmail}`}>
                        <h2 class="text-gray-800 text-2x2 font-semibold">
                          {el.name}
                        </h2>
                      </Link>
                      <div class="flex justify-center mt-2 text-black">
                        <button
                          onClick={() => {
                            setInput({ idPostulant: el.id });
                            setToggle2(true);
                          }}
                        >
                          change status
                        </button>
                        {console.log(id, input.idPostulant)}
                      </div>
                      {toggle2 && (
                        <form
                          onSubmit={(e) => {
                            handleSubmit(e);
                          }}
                        >
                          <select
                            className="bg-gray-100 rounded-xl mr-2 text-black"
                            onChange={(e) => handleSelect(e)}
                          >
                            <option
                              value="new"
                              className="text-black"
                              key={el.id}
                            >
                              new
                            </option>
                            <option
                              value="review"
                              className="text-black"
                              key={el.id}
                            >
                              review
                            </option>
                            <option
                              value="contacted"
                              className="text-black"
                              key={el.id}
                            >
                              contacted
                            </option>
                            <option
                              value="interview"
                              className="text-black"
                              key={el.id}
                            >
                              interview
                            </option>
                            <option
                              value="techInterview"
                              className="text-black"
                              key={el.id}
                            >
                              tech interview
                            </option>
                            <option
                              value="offered"
                              className="text-black"
                              key={el.id}
                            >
                              offered
                            </option>
                            <option
                              value="hired"
                              className="text-black"
                              key={el.id}
                            >
                              hired
                            </option>
                            <option
                              value="rejected"
                              className="text-black"
                              key={el.id}
                            >
                              rejected
                            </option>
                          </select>
                          <button
                            className="bg-gray-100 rounded-xl mr-2 text-black"
                            type="submit"
                          >
                            confirm change
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
          {/* renderizado estado CONTACTED */}
          <div id="third" class="hidden p-4">
            <h1 className="text-3xl text-black">CONTACTED</h1>
            {contacted.length === 0 ? (
              <p className="text-black">Waiting for people...</p>
            ) : (
              contacted.map((el) => {
                //console.log(el.loginEmail, id)
                return (
                  <div>
                    <div class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-5 ml-5">
                      <Link to={`/postulant/${el.loginEmail}`}>
                        <h2 class="text-gray-800 text-2x2 font-semibold">
                          {el.name}
                        </h2>
                      </Link>
                      <div class="flex justify-center mt-2 text-black">
                        <button
                          onClick={() => {
                            setInput({ idPostulant: el.id });
                            setToggle3(true);
                          }}
                        >
                          change status
                        </button>
                        {console.log(id, input.idPostulant)}
                      </div>
                      {toggle3 && (
                        <form
                          onSubmit={(e) => {
                            handleSubmit(e);
                          }}
                        >
                          <select
                            className="bg-gray-100 rounded-xl mr-2 text-black"
                            onChange={(e) => handleSelect(e)}
                          >
                            <option
                              value="new"
                              className="text-black"
                              key={el.id}
                            >
                              new
                            </option>
                            <option
                              value="review"
                              className="text-black"
                              key={el.id}
                            >
                              review
                            </option>
                            <option
                              value="contacted"
                              className="text-black"
                              key={el.id}
                            >
                              contacted
                            </option>
                            <option
                              value="interview"
                              className="text-black"
                              key={el.id}
                            >
                              interview
                            </option>
                            <option
                              value="techInterview"
                              className="text-black"
                              key={el.id}
                            >
                              tech interview
                            </option>
                            <option
                              value="offered"
                              className="text-black"
                              key={el.id}
                            >
                              offered
                            </option>
                            <option
                              value="hired"
                              className="text-black"
                              key={el.id}
                            >
                              hired
                            </option>
                            <option
                              value="rejected"
                              className="text-black"
                              key={el.id}
                            >
                              rejected
                            </option>
                          </select>
                          <button
                            className="bg-gray-100 rounded-xl mr-2 text-black"
                            type="submit"
                          >
                            confirm change
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
          {/* renderizado estado INTERVIEW */}
          <div id="fourth" class="hidden p-4">
            <h1 className="text-3xl text-black">INTERVIEW</h1>
            {interview.length === 0 ? (
              <p className="text-black">Waiting for people...</p>
            ) : (
              interview.map((el) => {
                return (
                  <div>
                    <div class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-5 ml-5">
                      <Link to={`/postulant/${el.loginEmail}`}>
                        <h2 class="text-gray-800 text-2x2 font-semibold">
                          {el.name}
                        </h2>
                      </Link>
                      <div class="flex justify-center mt-2 text-black">
                        <button
                          onClick={() => {
                            setInput({ idPostulant: el.id });
                            setToggle4(true);
                          }}
                        >
                          change status
                        </button>
                        {console.log(id, input.idPostulant)}
                      </div>
                      {toggle4 && (
                        <form
                          onSubmit={(e) => {
                            handleSubmit(e);
                          }}
                        >
                          <select
                            className="bg-gray-100 rounded-xl mr-2 text-black"
                            onChange={(e) => handleSelect(e)}
                          >
                            <option
                              value="new"
                              className="text-black"
                              key={el.id}
                            >
                              new
                            </option>
                            <option
                              value="review"
                              className="text-black"
                              key={el.id}
                            >
                              review
                            </option>
                            <option
                              value="contacted"
                              className="text-black"
                              key={el.id}
                            >
                              contacted
                            </option>
                            <option
                              value="interview"
                              className="text-black"
                              key={el.id}
                            >
                              interview
                            </option>
                            <option
                              value="techInterview"
                              className="text-black"
                              key={el.id}
                            >
                              tech interview
                            </option>
                            <option
                              value="offered"
                              className="text-black"
                              key={el.id}
                            >
                              offered
                            </option>
                            <option
                              value="hired"
                              className="text-black"
                              key={el.id}
                            >
                              hired
                            </option>
                            <option
                              value="rejected"
                              className="text-black"
                              key={el.id}
                            >
                              rejected
                            </option>
                          </select>
                          <button
                            className="bg-gray-100 rounded-xl mr-2 text-black"
                            type="submit"
                          >
                            confirm change
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
          {/* renderizado estado TECH INTERVIEW */}
          <div id="five" class="hidden p-4">
            <h1 className="text-3xl text-black">TECH INTERVIEW</h1>
            {tech.length === 0 ? (
              <p className="text-black">Waiting for people...</p>
            ) : (
              tech.map((el) => {
                //console.log(el.loginEmail, id)
                return (
                  <div>
                    <div class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-5 ml-5">
                      <Link to={`/postulant/${el.loginEmail}`}>
                        <h2 class="text-gray-800 text-2x2 font-semibold">
                          {el.name}
                        </h2>
                      </Link>
                      <div class="flex justify-center mt-2 text-black">
                        <button
                          onClick={() => {
                            setInput({ idPostulant: el.id });
                            setToggle5(true);
                          }}
                        >
                          change status
                        </button>
                        {console.log(id, input.idPostulant)}
                      </div>
                      {toggle5 && (
                        <form
                          onSubmit={(e) => {
                            handleSubmit(e);
                          }}
                        >
                          <select
                            className="bg-gray-100 rounded-xl mr-2 text-black"
                            onChange={(e) => handleSelect(e)}
                          >
                            <option
                              value="new"
                              className="text-black"
                              key={el.id}
                            >
                              new
                            </option>
                            <option
                              value="review"
                              className="text-black"
                              key={el.id}
                            >
                              review
                            </option>
                            <option
                              value="contacted"
                              className="text-black"
                              key={el.id}
                            >
                              contacted
                            </option>
                            <option
                              value="interview"
                              className="text-black"
                              key={el.id}
                            >
                              interview
                            </option>
                            <option
                              value="techInterview"
                              className="text-black"
                              key={el.id}
                            >
                              tech interview
                            </option>
                            <option
                              value="offered"
                              className="text-black"
                              key={el.id}
                            >
                              offered
                            </option>
                            <option
                              value="hired"
                              className="text-black"
                              key={el.id}
                            >
                              hired
                            </option>
                            <option
                              value="rejected"
                              className="text-black"
                              key={el.id}
                            >
                              rejected
                            </option>
                          </select>
                          <button
                            className="bg-gray-100 rounded-xl mr-2 text-black"
                            type="submit"
                          >
                            confirm change
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
          {/* renderizado estado OFFERED */}
          <div id="six" class="hidden p-4">
            <h1 className="text-3xl text-black">OFFERED</h1>
            {offered.length === 0 ? (
              <p className="text-black">Waiting for people...</p>
            ) : (
              offered.map((el) => {
                //console.log(el.loginEmail, id)
                return (
                  <div>
                    <div class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-5 ml-5">
                      <Link to={`/postulant/${el.loginEmail}`}>
                        <h2 class="text-gray-800 text-2x2 font-semibold">
                          {el.name}
                        </h2>
                      </Link>
                      <div class="flex justify-center mt-2 text-black">
                        <button
                          onClick={() => {
                            setInput({ idPostulant: el.id });
                            setToggle5(true);
                          }}
                        >
                          change status
                        </button>
                        {console.log(id, input.idPostulant)}
                      </div>
                      {toggle5 && (
                        <form
                          onSubmit={(e) => {
                            handleSubmit(e);
                          }}
                        >
                          <select
                            className="bg-gray-100 rounded-xl mr-2 text-black"
                            onChange={(e) => handleSelect(e)}
                          >
                            <option
                              value="new"
                              className="text-black"
                              key={el.id}
                            >
                              new
                            </option>
                            <option
                              value="review"
                              className="text-black"
                              key={el.id}
                            >
                              review
                            </option>
                            <option
                              value="contacted"
                              className="text-black"
                              key={el.id}
                            >
                              contacted
                            </option>
                            <option
                              value="interview"
                              className="text-black"
                              key={el.id}
                            >
                              interview
                            </option>
                            <option
                              value="techInterview"
                              className="text-black"
                              key={el.id}
                            >
                              tech interview
                            </option>
                            <option
                              value="offered"
                              className="text-black"
                              key={el.id}
                            >
                              offered
                            </option>
                            <option
                              value="hired"
                              className="text-black"
                              key={el.id}
                            >
                              hired
                            </option>
                            <option
                              value="rejected"
                              className="text-black"
                              key={el.id}
                            >
                              rejected
                            </option>
                          </select>
                          <button
                            className="bg-gray-100 rounded-xl mr-2 text-black"
                            type="submit"
                          >
                            confirm change
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
          {/* renderizado estado HIRED */}
          <div id="seven" class="hidden p-4">
            <h1 className="text-3xl text-black">HIRED</h1>
            {hired.length === 0 ? (
              <p className="text-black">Waiting for people...</p>
            ) : (
              hired.map((el) => {
                //console.log(el.loginEmail, id)
                return (
                  <div>
                    <div class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-5 ml-5">
                      <Link to={`/postulant/${el.loginEmail}`}>
                        <h2 class="text-gray-800 text-2x2 font-semibold">
                          {el.name}
                        </h2>
                      </Link>
                      <div class="flex justify-center mt-2 text-black">
                        <button
                          onClick={() => {
                            setInput({ idPostulant: el.id });
                            setToggle6(true);
                          }}
                        >
                          change status
                        </button>
                        {console.log(id, input.idPostulant)}
                      </div>
                      {toggle6 && (
                        <form
                          onSubmit={(e) => {
                            handleSubmit(e);
                          }}
                        >
                          <select
                            className="bg-gray-100 rounded-xl mr-2 text-black"
                            onChange={(e) => handleSelect(e)}
                          >
                            <option
                              value="new"
                              className="text-black"
                              key={el.id}
                            >
                              new
                            </option>
                            <option
                              value="review"
                              className="text-black"
                              key={el.id}
                            >
                              review
                            </option>
                            <option
                              value="contacted"
                              className="text-black"
                              key={el.id}
                            >
                              contacted
                            </option>
                            <option
                              value="interview"
                              className="text-black"
                              key={el.id}
                            >
                              interview
                            </option>
                            <option
                              value="techInterview"
                              className="text-black"
                              key={el.id}
                            >
                              tech interview
                            </option>
                            <option
                              value="offered"
                              className="text-black"
                              key={el.id}
                            >
                              offered
                            </option>
                            <option
                              value="hired"
                              className="text-black"
                              key={el.id}
                            >
                              hired
                            </option>
                            <option
                              value="rejected"
                              className="text-black"
                              key={el.id}
                            >
                              rejected
                            </option>
                          </select>
                          <button
                            className="bg-gray-100 rounded-xl mr-2 text-black"
                            type="submit"
                          >
                            confirm change
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
          {/* renderizado estado REJECTED */}
          <div id="eight" class="hidden p-4">
            <h1 className="text-3xl text-black">REJECTED</h1>
            {rejected.length === 0 ? (
              <p className="text-black">Waiting for people...</p>
            ) : (
              rejected.map((el) => {
                //console.log(el.loginEmail, id)
                return (
                  <div>
                    <div class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-5 ml-5">
                      <Link to={`/postulant/${el.loginEmail}`}>
                        <h2 class="text-gray-800 text-2x2 font-semibold">
                          {el.name}
                        </h2>
                      </Link>
                      <div class="flex justify-center mt-2 tex-black">
                        <button
                          onClick={() => {
                            setInput({ idPostulant: el.id });
                            setToggle7(true);
                          }}
                        >
                          change status
                        </button>
                        {console.log(id, input.idPostulant)}
                      </div>
                      {toggle7 && (
                        <form
                          onSubmit={(e) => {
                            handleSubmit(e);
                          }}
                        >
                          <select
                            className="bg-gray-100 rounded-xl mr-2 text-black"
                            onChange={(e) => handleSelect(e)}
                          >
                            <option
                              value="new"
                              className="text-black"
                              key={el.id}
                            >
                              new
                            </option>
                            <option
                              value="review"
                              className="text-black"
                              key={el.id}
                            >
                              review
                            </option>
                            <option
                              value="contacted"
                              className="text-black"
                              key={el.id}
                            >
                              contacted
                            </option>
                            <option
                              value="interview"
                              className="text-black"
                              key={el.id}
                            >
                              interview
                            </option>
                            <option
                              value="techInterview"
                              className="text-black"
                              key={el.id}
                            >
                              tech interview
                            </option>
                            <option
                              value="offered"
                              className="text-black"
                              key={el.id}
                            >
                              offered
                            </option>
                            <option
                              value="hired"
                              className="text-black"
                              key={el.id}
                            >
                              hired
                            </option>
                            <option
                              value="rejected"
                              className="text-black"
                              key={el.id}
                            >
                              rejected
                            </option>
                          </select>
                          <button
                            className="bg-gray-100 rounded-xl mr-2 text-black"
                            type="submit"
                          >
                            confirm change
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pipeline;

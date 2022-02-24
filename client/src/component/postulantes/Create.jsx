import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createPostulante,
  getTechnology,
  getSkill,
  getLanguage,
  getSeniority,
  getLocation,
  getProfile,
} from "../../redux/actions/indexP";
import { GrFormClose } from "react-icons/gr";
import validate from "./Validation";
import NavBar from "./NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import { getUsers } from "../../redux/actions/indexL";
import foto from "./Styles/Imagenes/fondo1.jpg";
import swal from "sweetalert";

export default function CreateForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tecno = useSelector((state) => state.rootReducerPostulante.technology);
  const habilidades = useSelector((state) => state.rootReducerPostulante.skill);
  const lenguaje = useSelector((state) => state.rootReducerPostulante.language);
  const experiencia = useSelector(
    (state) => state.rootReducerPostulante.seniority
  );
  const locat = useSelector((state) => state.rootReducerPostulante.location);

  const profileState = useSelector(
    (state) => state.rootReducerLanding.perfiles
  );
  const { user } = useAuth0();
  const email = JSON.stringify(user.email);
  const email2 = email.substring(1, email.length - 1);

  //const locat = useSelector((state) => state.rootReducerPostulante.location)
  const [errors, setErrors] = useState("");

  const [input, setInput] = useState({
    name: "",
    phone: "",
    location: [],
    gender: "",
    github: "",
    linkedIn: "",
    portfolio: "",
    CV: "",
    //file: "",
    technologies: [],
    languages: [],
    skills: [],
    seniority: [],
    extras: "",
    loginId: email2,
  });

  /* const handleFile = (e) => {
    setInput({
      ...input,
      file: e.target.files[0],
    });
  }; */

  const handleCv = (e) => {
    setInput({
      ...input,
      CV: e.target.files[0],
    });
  };

  function handleGithub(e) {
    setInput({
      ...input,
      github: e.target.value,
    });
  }

  function handleLinkedIn(e) {
    setInput({
      ...input,
      linkedIn: e.target.value,
    });
  }

  function handlePortfolio(e) {
    setInput({
      ...input,
      portfolio: e.target.value,
    });
  }

  function handleSelectTechnology(e) {
    if (input.technologies.includes(e.target.value)) {
      swal({
        icon: "warning",
        title: "Sorry",
        text: "Already in the list",
        width: "90%",
        padding: "2em",
        color: "#716add",
        timer: "3000",
        timerProgressBar: true,
      });
    } else {
      setInput({
        ...input,
        technologies: [...input.technologies, e.target.value],
      });
    }
  }

  function handleLanguage(e) {
    if (input.languages.includes(e.target.value)) {
      swal({
        icon: "warning",
        title: "Sorry",
        text: "Already in the list",
        width: "90%",
        padding: "2em",
        color: "#716add",
        timer: "3000",
        timerProgressBar: true,
      });
    } else {
      setInput({
        ...input,
        languages: [...input.languages, e.target.value],
      });
    }
  }

  function handleSkill(e) {
    if (input.skills.includes(e.target.value)) {
      swal({
        icon: "warning",
        title: "Sorry",
        text: "Already in the list",
        width: "90%",
        padding: "2em",
        color: "#716add",
        timer: "3000",
        timerProgressBar: true,
      });
    } else {
      setInput({
        ...input,
        skills: [...input.skills, e.target.value],
      });
    }
  }

  function handleSelectSeniority(e) {
    if (input.seniority.includes(e.target.value)) {
      swal({
        icon: "warning",
        title: "Sorry",
        text: "Already in the list",
        width: "90%",
        padding: "2em",
        color: "#716add",
        timer: "3000",
        timerProgressBar: true,
      });
    } else {
      setInput({
        ...input,
        seniority: [e.target.value],
      });
    }
  }

  function handleSelectLocation(e) {
    if (input.location.includes(e.target.value)) {
      swal({
        icon: "warning",
        title: "Sorry",
        text: "Already in the list",
        width: "90%",
        padding: "2em",
        color: "#716add",
        timer: "3000",
        timerProgressBar: true,
      });
    } else {
      setInput({
        ...input,
        location: [e.target.value],
      });
    }
  }

  function handleExtra(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    let objError = validate({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(objError);
  }

  const handleDelete = (e) => {
    setInput({
      ...input,
      technologies: input.technologies.filter((el) => el !== e),
    });
  };

  const handleDeleteLanguage = (e) => {
    setInput({
      ...input,
      languages: input.languages.filter((el) => el !== e),
    });
  };

  const handleDeleteSkills = (e) => {
    setInput({
      ...input,
      skills: input.skills.filter((el) => el !== e),
    });
  };

  const handleDeleteSeniority = (e) => {
    setInput({
      ...input,
      seniority: input.seniority.filter((el) => el !== e),
    });
  };

  const handleDeleteLocation = (e) => {
    setInput({
      ...input,
      location: input.location.filter((el) => el !== e),
    });
  };

  //// control de gender ////
  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        gender: e.target.value,
      });
    } else {
      setInput({
        ...input,
        gender: input.gender.filter((g) => g !== e.target.value),
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !input.name ||
      !input.phone ||
      !input.location ||
      !input.gender ||
      !input.linkedIn ||
      /* !input.file || */
      !input.CV ||
      !input.technologies ||
      !input.languages ||
      !input.skills ||
      !input.seniority
    ) {
      swal({
        icon: "question",
        title: "Please",
        text: "Complete all fields",
        width: "90%",
        padding: "2em",
        color: "#716add",
        timer: "3000",
        timerProgressBar: true,
      });
    } else {
      swal({
        icon: "success",
        title: "Congrats!",
        width: "90%",
        padding: "2em",
        color: "#716add",
        timer: "3000",
        timerProgressBar: true,
      });
      const data = new FormData();
      data.append("name", input.name);
      data.append("phone", input.phone);
      data.append("location", input.location);
      data.append("gender", input.gender);
      data.append("github", input.github);
      data.append("linkedIn", input.linkedIn);
      data.append("portfolio", input.portfolio);
      /*  data.append("file", input.file); */
      data.append("file", input.CV);
      data.append("technologies", [input.technologies]);
      data.append("languages", [input.languages]);
      data.append("skills", [input.skills]);
      data.append("seniority", [input.seniority]);
      data.append("extras", input.extras);
      data.append("loginId", input.loginId);
      dispatch(createPostulante(data));
      setInput({
        name: "",
        phone: "",
        location: [],
        gender: "",
        github: "",
        linkedIn: "",
        portfolio: "",
        //file: "",
        CV: "",
        technologies: [],
        languages: [],
        skills: [],
        seniority: [],
        extras: "",
        loginId: email2,
      });
      navigate("/homep");
    }
  }

  useEffect(() => {
    dispatch(getSkill());
    dispatch(getTechnology());
    dispatch(getLanguage());
    dispatch(getSeniority());
    dispatch(getLocation());
    dispatch(getProfile(email2));
  }, []);

  return (
    <div className="bg-hero-pattern bg-cover w-screen md:h-screen h-full p-4 md:px-24 md:py-24">
      <div className="w-full p-3 shadow-3xl h-full  bg-nuevoFondo backdrop-blur-lg bg-opacity-50  rounded-2xl drop-shadow-xl">
        <form
          className="grid grid-cols-1 grid-rows-3 gap-3 md:grid-cols-3 md:grid-rows-1 md:max-h-96"
          onSubmit={(e) => handleSubmit(e)}
        >
          {/* /////COL1 */}
          <div className="flex flex-col  mt-2 md:mt-8 w-full h-full shrink m-0 px-16 md:px-2 justify-center">
            <div className="w-full   flex flex-col m-0 justify-center">
              <h3 className="text-center font-bold text-white">Name*</h3>
              <input
                className="px-2 text-center w-full m-0 rounded-2xl bg-nuevoFondo text-white"
                type="text"
                maxlength="30"
                value={input.name}
                name="name"
                onChange={(e) => handleChange(e)}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div className="w-full pt-8 flex flex-col my-0 justify-center">
              <label className="text-center font-bold text-white">Phone *</label>
              <input
                className=" px-2 text-center w-full m-0 rounded-2xl bg-nuevoFondo text-white"
                type="number"
                value={input.phone}
                name="phone"
                min="0"
                step="1"
                onChange={(e) => handleChange(e)}
              />
              {errors.phone && <p className="error">{errors.phone}</p>}
            </div>
            <div className="w-full pt-8 flex flex-col m-0 justify-center">
              <label className="text-center font-bold text-white">
                Location*
              </label>
              <select
                className="w-full rounded-2xl bg-nuevoFondo text-white"
                placeholder="location"
                value={input.location}
                name="location"
                onChange={(e) => handleSelectLocation(e)}
              >
                <option
                  className="rounded-2xl bg-nuevoFondo text-white"
                  selected
                  disabled
                  value=""
                >
                  Location Selection
                </option>
                {locat?.map((el) => (
                  <option
                    className="rounded-2xl bg-nuevoFondo text-white"
                    value={el.name}
                    key={el.id}
                  >
                    {el.name}
                  </option>
                ))}
              </select>
              <div className="h-6 flex flex-row">
                {input.location.map((el, i) => (
                  <li
                    className="flex flex-row m-px mt-px px-2 w-fit font-bold text-nuevoFondo list-none rounded-2xl bg-white"
                    key={i}
                  >
                    {el}
                    <button
                      className="rounded-2xl hover:bg-verdeClaro"
                      type="reset"
                      onClick={() => handleDeleteLocation(el)}
                    >
                      <GrFormClose />
                    </button>
                  </li>
                ))}
              </div>
            </div>
            <div className="w-full mb-8 flex flex-col m-0 justify-center">
              <label className="text-center font-bold text-white">
                Gender *
              </label>
              <div className="flex justify-center ">
                <label
                  className=" flex  m-px p-px px-1 bg-nuevoFondo w-fit rounded-xl"
                  htmlFor="cbox2"
                >
                  <input
                    className="text-center bg-nuevoFondo text-white"
                    value="Femenine"
                    type="radio"
                    id="cbox1"
                    name="check"
                    onChange={(e) => handleCheck(e)}
                  />
                  Feminine
                </label>
                <label
                  className="text-center m-px p-px px-1 bg-nuevoFondo w-fit rounded-xl"
                  htmlFor="cbox2"
                >
                  <input
                    className="text-center bg-nuevoFondo text-white"
                    value="Masculine"
                    type="radio"
                    id="cbox2"
                    name="check"
                    onChange={(e) => handleCheck(e)}
                  />
                  Masculine
                </label>
                <label
                  className="text-center m-px p-px px-1 bg-nuevoFondo w-fit rounded-xl"
                  htmlFor="cbox2"
                >
                  <input
                    className="text-center bg-nuevoFondo text-white"
                    value="non-binary"
                    type="radio"
                    id="cbox3"
                    name="check"
                    onChange={(e) => handleCheck(e)}
                  />
                  Non-Binary
                </label>
                <label
                  className="text-center m-px p-px px-1 bg-nuevoFondo w-fit rounded-xl"
                  htmlFor="cbox2"
                >
                  <input
                    className="text-center bg-nuevoFondo text-white"
                    value="Other"
                    type="radio"
                    name="check"
                    id="cbox4"
                    onChange={(e) => handleCheck(e)}
                  />
                  Other
                </label>
              </div>
            </div>
            {/*  ///////////////////////PHOTO////////////////////// */}
            {/* <div className="w-fit flex flex-col my-2 justify-center">
            <label className="text-center text-verdeHover" htmlFor="file">
              {" "}
              Photo (.jpg)
            </label>
            <input
              className="w-full  m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro"
              placeholder=".jpg"
              type="file"
              name="file"
              id="file"
              accept=".jpg"
              onChange={(e) => handleFile(e)}
            />
          </div>*/}
          </div>

          {/* /////COL3 */}
          <div className="flex flex-col mb-12  mt-6 md:mt-14 w-full m-0 px-16 md:px-2 h-full justify-center">
            <div className="w-full  flex flex-col m-0 justify-center">
              <label className=" text-center  font-bold text-white">
                Technology *
              </label>
              <select
                className="w-full rounded-2xl mb-1 bg-nuevoFondo"
                placeholder="technology"
                value={input.technologies}
                name="technology"
                onChange={(e) => handleSelectTechnology(e)}
              >
                <option
                  className="rounded-2xl text-white bg-nuevoFondo"
                  value=""
                  disabled
                  selected
                >
                  Tecnologies Selection
                </option>

                {tecno?.map((el) => (
                  <option
                    className="rounded-2xl text-white bg-nuevoFondo"
                    value={el.name}
                    key={el.id}
                  >
                    {el.name}
                  </option>
                ))}
              </select>
              <div>
                <div className="h-6 flex flex-row">
                  {input.technologies.map((el, i) => (
                    <li
                      className="flex flex-row mr-1 px-1 w-fit font-bold text-nuevoFondo list-none rounded-2xl bg-white"
                      key={i}
                    >
                      {el}
                      <button
                        className="rounded-2xl hover:bg-verdeClaro"
                        type="reset"
                        onClick={() => handleDelete(el)}
                      >
                        <GrFormClose />
                      </button>
                    </li>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col m-0 justify-center">
              <label className="text-center font-bold text-white">
                Languages *
              </label>

              <select
                className="w-full rounded-2xl mb-1 bg-nuevoFondo"
                placeholder="languages"
                value={input.languages}
                name="languages"
                onChange={(e) => handleLanguage(e)}
              >
                <option
                  className="rounded-2xl text-white bg-nuevoFondo"
                  value=""
                  disabled
                  selected
                >
                  Languages Selection
                </option>
                {lenguaje?.map((el) => (
                  <option
                    className="rounded-2xl  text-white bg-nuevoFondo"
                    value={el.name}
                    key={el.id}
                  >
                    {el.name}
                  </option>
                ))}
              </select>
              <div className="h-6  flex flex-row ">
                {input.languages.map((el, i) => (
                  <li
                    className="flex flex-row mr-1 px-1 w-fit font-bold text-nuevoFondo list-none rounded-2xl bg-white"
                    key={i}
                  >
                    {el}
                    <button
                      className="rounded-2xl hover:bg-verdeClaro"
                      type="reset"
                      onClick={() => handleDeleteLanguage(el)}
                    >
                      <GrFormClose />
                    </button>
                  </li>
                ))}
              </div>
            </div>
            <div className="w-full flex flex-col m-0 justify-center">
              <label className="text-center  font-bold text-white ">
                Skill *
              </label>
              <select
                className="w-full rounded-2xl mb-1 bg-nuevoFondo"
                placeholder="skill"
                value={input.skills}
                name="skills"
                onChange={(e) => handleSkill(e)}
              >
                <option
                  className="rounded-2xl text-white bg-nuevoFondo"
                  value=""
                  disabled
                  selected
                >
                  Skills Selection
                </option>
                {habilidades?.map((el) => (
                  <option
                    className="rounded-2xl text-white bg-nuevoFondo"
                    value={el.name}
                    key={el.id}
                  >
                    {el.name}
                  </option>
                ))}
              </select>
              <div className="h-6  flex flex-row">
                {input.skills?.map((el, i) => (
                  <li
                    className="flex flex-row mr-1 px-1 w-fit font-bold text-nuevoFondo list-none rounded-2xl bg-white"
                    key={i}
                  >
                    {el}
                    <button
                      className="rounded-2xl  hover:bg-verdeClaro"
                      type="reset"
                      onClick={() => handleDeleteSkills(el)}
                    >
                      <GrFormClose />
                    </button>
                  </li>
                ))}
              </div>
            </div>

            <div className="w-full  flex flex-col m-0 justify-center">
              <label className="text-center font-bold text-white">
                Siniority *
              </label>
              <select
                className="w-full rounded-2xl mb-1 bg-nuevoFondo"
                placeholder="Seniority"
                value={input.seniority}
                name="seniority"
                onChange={(e) => handleSelectSeniority(e)}
              >
                <option
                  className="rounded-2xl text-white bg-nuevoFondo"
                  value=""
                  disabled
                  selected
                >
                  Seniority Selection
                </option>
                {experiencia?.map((el) => (
                  <option
                    className="rounded-2xl text-white bg-nuevoFondo"
                    value={el.name}
                    key={el.id}
                  >
                    {el.name}
                  </option>
                ))}
              </select>
              <div className="h-6  flex flex-row ">
                {input.seniority?.map((el, id) => (
                  <li
                    className="flex flex-row mr-1 px-1 w-fit font-bold text-nuevoFondo list-none rounded-2xl bg-white"
                    key={el.id}
                  >
                    {el}
                    <button
                      className="rounded-2xl hover:bg-verdeClaro"
                      type="reset"
                      onClick={() => handleDeleteSeniority(el)}
                    >
                      <GrFormClose />
                    </button>
                  </li>
                ))}
              </div>
            </div>

            <div className="w-full  flex flex-col m-0 justify-center">
              <label className="text-center font-bold text-white">Extras</label>
              <textarea
                className="rounded-2xl px-3 bg-nuevoFondo"
                maxlength="30"
                type="text"
                value={input.extras}
                name="extras"
                onChange={(e) => handleExtra(e)}
              />
            </div>
          </div>
          {/* /////COL2 */}
          <div className="flex flex-col mt-6  md:mt-16 w-full h-full m-0 px-16 md:px-2 justify-center">
            <div className="w-full flex flex-col mt-3 justify-center">
              <label
                className=" text-center font-bold text-white "
                htmlFor="github"
              >
                GitHub:
              </label>
              <input
                className=" mb-4 px-2 text-center w-full m-0 border-verdeClaro rounded-2xl bg-nuevoFondo text-white"
                type="text"
                value={input.github}
                name="github"
                onChange={(e) => handleGithub(e)}
              />
            </div>
            <div className="w-full flex flex-col my-2 justify-center">
              <label
                className="text-center font-bold text-white"
                htmlFor="linkedin"
              >
                LinkedIn *
              </label>
              <input
                className=" px-2 text-center w-full  m-0 border-verdeMuyClaro rounded-2xl bg-nuevoFondo text-white"
                value={input.linkedIn}
                type="text"
                name="linkedin"
                onChange={(e) => handleLinkedIn(e)}
              />
            </div>
            <div className="w-full flex flex-col my-2 justify-center">
              <label
                className="text-center font-bold text-white"
                for="portfolio"
              >
                PortFolio
              </label>
              <input
                className=" px-2  mb-8 text-center w-full m-0 border-verdeMuyClaro rounded-2xl bg-nuevoFondo hover:bg-nuevoFondo focus:bg-nuevoFondo text-white"
                type="text"
                name="portfolio"
                value={input.portfolio}
                onChange={(e) => handlePortfolio(e)}
              />
            </div>
            {/* /////////////////CV/////////////// */}
            <div className="w-fit flex flex-col pb-5 justify-center">
              <label className="text-center font-bold text-white">
                CV (.pdf)*
              </label>
              <input
                className="w-full h-fit m-0 border-verdeMuyClaro rounded-2xl bg-nuevoFondo"
                placeholder=".pdf"
                type="file"
                id="file"
                accept=".pdf"
                name="file"
                onChange={(e) => handleCv(e)}
              />
            </div>
            <div className="mt-7 flex flex-col m-0 justify-center">
              <div className="flex m-0 justify-center">
                <button
                  className=" w-32 shadow-lg shadow-black rounded-2xl text-verdeHover bg-verdeOscuro hover:bg-verdeClaro"
                  type="submit"
                  //onClick={(e)=>fileOnChange(e)}//
                >
                  CREATE
                </button>
              </div>
              <h1 className=" text-center mt-2 text-yellow-500">
                (*) Required Fields
              </h1>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

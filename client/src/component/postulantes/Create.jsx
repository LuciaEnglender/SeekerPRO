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
} from "../../redux/actions/indexP";
import { GrFormClose } from "react-icons/gr";
import validate from "./Validation";
import NavBar from "./NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import { getUsers } from "../../redux/actions/indexL";

export default function CreateForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tecno = useSelector((state) => state.rootReducerPostulante.technology);
  const habilidades = useSelector((state) => state.rootReducerPostulante.skill);
  const lenguaje = useSelector((state) => state.rootReducerPostulante.language);
  const experiencia = useSelector(
    (state) => state.rootReducerPostulante.seniority
  );

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
    location: "",
    gender: "",
    photo: "",
    github: "",
    linkedIn: "",
    portfolio: "",
    CV: "",
    technologies: [],
    languages: [],
    skills: [],
    seniority: [],
    extras: "",
    loginId: email2,
  });
  console.log(input);

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
      alert("Already in the list");
    } else {
      setInput({
        ...input,
        technologies: [...input.technologies, e.target.value],
      });
    }
  }

  function handleLanguage(e) {
    if (input.languages.includes(e.target.value)) {
      alert("Already in the list");
    } else {
      setInput({
        ...input,
        languages: [...input.languages, e.target.value],
      });
    }
  }

  function handleSkill(e) {
    if (input.skills.includes(e.target.value)) {
      alert("Already in the list");
    } else {
      setInput({
        ...input,
        skills: [...input.skills, e.target.value],
      });
    }
  }

  function handleSelectSeniority(e) {
    if (input.seniority.includes(e.target.value)) {
      alert("Already in the list");
    } else {
      setInput({
        ...input,
        seniority: [...input.seniority, e.target.value],
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
    /*setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );*/
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
    dispatch(createPostulante(input));
    alert("Congrats!");
    setInput({
      name: "",
      phone: "",
      location: "",
      gender: "",
      photo: "",
      github: "",
      linkedIn: "",
      portfolio: "",
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

  useEffect(() => {
    dispatch(getSkill());
    dispatch(getTechnology());
    dispatch(getLanguage());
    dispatch(getSeniority());
    dispatch(getUsers(email2));
  }, []);

  return (
    <div className="bg-verdeOscuro w-screen h-screen ">
      <div>
        <NavBar />
      </div>
      <div className=" flex m-3  rounded-2xl justify-center">
        <div className="w-auto flex  m-0 rounded-2xl justify-center">
          <form
            className="w-full flex flex-row m-7 justify-center mauto rounded-2xl  bg-verdeMedio"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="m-9">
              <div className="w-full flex flex-col my-2 justify-center">
                <h3 className="text-center">Name</h3>
                <input
                  className="xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro"
                  type="text"
                  value={input.name}
                  name="name"
                  onChange={(e) => handleChange(e)}
                />
                {errors.name && <p className="error">{errors.name}</p>}
              </div>
              <div className="w-44 flex flex-col my-2 justify-center">
                <label className="text-center"> Phone</label>
                <input
                  className="w-full xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro"
                  type="number"
                  value={input.phone}
                  name="phone"
                  onChange={(e) => handleChange(e)}
                />
                {errors.phone && <p className="error">{errors.phone}</p>}
              </div>
              <div className="w-44 flex flex-col my-2 justify-center">
                <label className="text-center">Gender:</label>
                <label className="text-center">
                  <input
                    className="text-center"
                    value="Femenine"
                    type="radio"
                    id="cbox1"
                    name="check"
                    onChange={(e) => handleCheck(e)}
                  />
                  Feminine
                </label>
                <label className="text-center" htmlFor="cbox2">
                  <input
                    value="Masculine"
                    type="radio"
                    id="cbox2"
                    name="check"
                    onChange={(e) => handleCheck(e)}
                  />
                  Masculine
                </label>
                <label className="text-center" htmlFor="cbox2">
                  <input
                    value="non-binary"
                    type="radio"
                    id="cbox3"
                    name="check"
                    onChange={(e) => handleCheck(e)}
                  />
                  Non-Binary
                </label>
                <label className="text-center" htmlFor="cbox2">
                  <input
                    value="Other"
                    type="radio"
                    name="check"
                    id="cbox4"
                    onChange={(e) => handleCheck(e)}
                  />
                  Other
                </label>
              </div>
              {/* <div className="w-fit flex flex-col my-2 justify-center">
                <label className="text-center"> Photo</label>
                <input
                  className="w-full xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro"
                  placeholder="photo"
                  type="text"
                  value={input.photo}
                  name="photo"
                />
              </div> */}
              <div className="w-fit flex flex-col my-2 justify-center">
                <label className="text-center" htmlFor="github">
                  GitHub:
                </label>
                <input
                  className="w-full xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro"
                  type="text"
                  value={input.github}
                  name="github"
                  onChange={(e) => handleGithub(e)}
                />
              </div>
              <div className="w-fit flex flex-col my-2 justify-center">
                <label className="text-center" htmlFor="linkedin">
                  LinkedIn:
                </label>
                <input
                  className="w-full xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro"
                  value={input.linkedIn}
                  type="text"
                  name="linkedin"
                  onChange={(e) => handleLinkedIn(e)}
                />
              </div>
              <div className="w-fit flex flex-col my-2 justify-center">
                <label className="text-center" for="portfolio">
                  PortFolio
                </label>
                <input
                  className="w-full xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro"
                  type="text"
                  name="portfolio"
                  value={input.portfolio}
                  placeholder="portfolio"
                  onChange={(e) => handlePortfolio(e)}
                />
              </div>
              {/* <div className="w-fit flex flex-col my-2 justify-center">
                <label className="text-center">CV</label>
                <input
                  className="w-full xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro"
                  placeholder="cv"
                  type="text"
                  value={input.CV}
                  name="CV"
                />
              </div> */}
            </div>
            {/* ASDASDASDASASAD */}
            <div className="m-9">
              <div className="w-full my-3 flex flex-col m-0 justify-center">
                <label className="text-center">Technology</label>
                <select
                  className="w-full xl:w-52 rounded-2xl bg-verdeClaro"
                  placeholder="technology"
                  value={input.technologies}
                  name="technology"
                  onChange={(e) => handleSelectTechnology(e)}
                >
                  <option
                    className="rounded-2xl bg-verdeClaro"
                    selected="false"
                    disabled
                  >
                    Selection Tecnology
                  </option>
                  {tecno?.map((el) => (
                    <option
                      className="rounded-2xl bg-verdeClaro"
                      value={el.name}
                      key={el.id}
                    >
                      {el.name}
                    </option>
                  ))}
                </select>
                <div>
                  {input.technologies.map((el, i) => (
                    <li
                      className="flex flex-row w-fit list-none m-1 rounded-2xl bg-verdeHover"
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
              <div className="w-full my-3 flex flex-col m-0 justify-center">
                <label className="text-center">Languages</label>
                <select
                  className="w-full xl:w-52 rounded-2xl bg-verdeClaro"
                  placeholder="languages"
                  value={input.languages}
                  name="languages"
                  onChange={(e) => handleLanguage(e)}
                >
                  <option
                    className="rounded-2xl bg-verdeClaro"
                    selected="false"
                    disabled
                  >
                    {" "}
                    Selecction Languages{" "}
                  </option>
                  {lenguaje?.map((el) => (
                    <option
                      className="rounded-2xl bg-verdeClaro"
                      value={el.name}
                      key={el.id}
                    >
                      {el.name}
                    </option>
                  ))}
                </select>
                <div>
                  {input.languages.map((el, i) => (
                    <li
                      className="flex flex-row w-fit list-none m-1 rounded-2xl bg-verdeHover"
                      key={i}
                    >
                      {" "}
                      {el}
                      <button
                        className="rounded-2xl hover:bg-verdeClaro"
                        type="reset"
                        onClick={() => handleDeleteLanguage(el)}
                      >
                        X{" "}
                      </button>
                    </li>
                  ))}
                </div>
              </div>
              <div className="w-full my-3 flex flex-col m-0 justify-center">
                <label className="text-center"> Skill</label>
                <select
                  className="w-full xl:w-52 rounded-2xl bg-verdeClaro"
                  placeholder="skill"
                  value={input.skills}
                  name="skills"
                  onChange={(e) => handleSkill(e)}
                >
                  <option
                    className="rounded-2xl bg-verdeClaro"
                    selected="false"
                    disabled
                  >
                    Selecction Skills
                  </option>
                  {habilidades?.map((el) => (
                    <option
                      className="rounded-2xl bg-verdeClaro"
                      value={el.name}
                      key={el.id}
                    >
                      {el.name}
                    </option>
                  ))}
                </select>
                <div>
                  {input.skills.map((el, i) => (
                    <li
                      className="flex flex-row w-fit list-none m-1 rounded-2xl bg-verdeHover"
                      key={i}
                    >
                      {" "}
                      {el}
                      <button
                        className="rounded-2xl hover:bg-verdeClaro"
                        type="reset"
                        onClick={() => handleDeleteSkills(el)}
                      >
                        {" "}
                        X
                      </button>
                    </li>
                  ))}{" "}
                </div>
              </div>
              <div className="w-full my-3 flex flex-col m-0 justify-center">
                <label className="text-center">Siniority</label>
                <select
                  className="w-full xl:w-52 rounded-2xl bg-verdeClaro"
                  placeholder="Seniority"
                  value={input.seniority}
                  name="seniority"
                  onChange={(e) => handleSelectSeniority(e)}
                >
                  <option
                    className="rounded-2xl bg-verdeClaro"
                    selected="false"
                    disabled
                  >
                    Selecction Siniority
                  </option>
                  {experiencia?.map((el) => (
                    <option
                      className="rounded-2xl bg-verdeClaro"
                      value={el.name}
                      key={el.id}
                    >
                      {el.name}
                    </option>
                  ))}
                </select>
                <div>
                  {input.seniority?.map((el, i) => (
                    <li
                      className="flex flex-row w-fit list-none m-1 rounded-2xl bg-verdeHover"
                      key={i}
                    >
                      {" "}
                      {el}{" "}
                      <button
                        className="rounded-2xl hover:bg-verdeClaro"
                        type="reset"
                        onClick={() => handleDeleteSeniority(el)}
                      >
                        {" "}
                        X{" "}
                      </button>
                    </li>
                  ))}
                </div>
              </div>
              <br />

              <div className="w-full my-3 flex flex-col m-0 justify-center">
                <label className="text-center">Extras</label>
                <textarea
                  className="w-full xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro"
                  placeholder=""
                  type="text"
                  value={input.extras}
                  name="extras"
                  onChange={(e) => handleExtra(e)}
                />
              </div>
              <div className="w-full  my-3 flex m-0 justify-center">
                <button
                  className=" w-32 shadow-lg shadow-black rounded-2xl text-verdeHover bg-verdeOscuro hover:bg-verdeClaro"
                  type="submit"
                >
                  CREAR
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/*     </div>
            <br />
            <div>
              <label>Locations</label>
              <select
                placeholder="Location"
                type="text"
                value={input.location}
                name="location"
                onChange={(e) => handleChange(e)}
              >
                
                {locat?.map((el) => (
                  <option value={el} key={el.id}>
                    
                  </option>
                ))}
      
              </select>
            </div>
            <br />
      
       
       */

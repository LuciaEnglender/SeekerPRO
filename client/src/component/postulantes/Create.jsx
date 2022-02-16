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
  getProfile
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
  const locat = useSelector((state) => state.rootReducerPostulante.location)
  
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
    file:"",
    technologies: [],
    languages: [],
    skills: [],
    seniority: [],
    extras: "",
    loginId: email2,
  });
  console.log(input)

  const handleFile=(e)=>{
    setInput({
      ...input,
      file: e.target.files[0]
    })
}

const handleCv=(e)=>{
  setInput({
    ...input,
    CV: e.target.files[0]
  })
  console.log(e.target.files)
}
  

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
        seniority: [e.target.value],
      });
    }
  }

  function handleSelectLocation(e) {
    if (input.location.includes(e.target.value)) {
      alert("Already in the list");
    } else {
      setInput({
        ...input,
        location: [e.target.value]
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
  }
  

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
      !input.file||
      !input.CV||
      !input.technologies ||
      !input.languages ||
      !input.skills ||
      !input.seniority
    ) {
      alert("Please, complete all fields");
    } else {
      alert("Congrats!");
      const data = new FormData();
      data.append("name", input.name);
      data.append("phone", input.phone);
      data.append("location", input.location);
      data.append("gender", input.gender);
      data.append("github", input.github);
      data.append("linkedIn", input.linkedIn);
      data.append("portfolio", input.portfolio);
      data.append("file", input.file);
      data.append("file", input.CV);
      data.append("technologies", [input.technologies]);
      data.append("languages", [input.languages]);
      data.append("skills", [input.skills]);
      data.append("seniority", [input.seniority]);
      data.append("extras", input.extras);
      data.append("loginId", input.loginId)
      dispatch(createPostulante(data));
      setInput({
        name: "",
        phone: "",
        location: [],
        gender: "",
        github: "",
        linkedIn: "",
        portfolio: "",
        file: "",
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
    dispatch(getProfile(email2))

  }, []);

  return (
    <div className="bg-verdeOscuro w-screen h-full">
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
                <h3 className="text-center text-verdeHover">Name*</h3>
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
                <label className="text-center text-verdeHover"> Phone</label>
                <input
                  className="w-full xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro"
                  type="number"
                  value={input.phone}
                  name="phone"
                  onChange={(e) => handleChange(e)}
                />
                {errors.phone && <p className="error">{errors.phone}</p>}
              </div>
              <br />
              <div className="w-full my-3 flex flex-col m-0 justify-center">
                <label className="text-center text-verdeHover">Location*</label>
                <select
                  className="w-full xl:w-52 rounded-2xl bg-verdeClaro"
                  placeholder="location"
                  value={input.location}
                  name="location"
                  onChange={(e) => handleSelectLocation(e)}
                >
                  <option
                    className="rounded-2xl bg-verdeClaro"
                    selected
                    disabled
                    value=""
                  >
                    Location Selection
                  </option>
                  {locat?.map((el) => (
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
                  {input.location.map((el, i) => (
                    <li
                      className="flex flex-row w-fit list-none m-1 rounded-2xl bg-verdeHover"
                      key={i}
                    >
                      {el}
                      <button
                        className="rounded-2xl hover:bg-verdeClaro"
                        type="reset"
                        onClick={() => handleDeleteLocation(el)}
                      >
                        X{" "}
                      </button>
                    </li>
                  ))}
                </div>
              </div>
              <div className="w-44 flex flex-col my-2 justify-center">
                <label className="text-center text-verdeHover">Gender:</label>
                <label className="text-center text-verdeHover">
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
                <label className="text-center text-verdeHover" htmlFor="cbox2">
                  <input
                    value="Masculine"
                    type="radio"
                    id="cbox2"
                    name="check"
                    onChange={(e) => handleCheck(e)}
                  />
                  Masculine
                </label>
                <label className="text-center text-verdeHover" htmlFor="cbox2">
                  <input
                    value="non-binary"
                    type="radio"
                    id="cbox3"
                    name="check"
                    onChange={(e) => handleCheck(e)}
                  />
                  Non-Binary
                </label>
                <label className="text-center text-verdeHover" htmlFor="cbox2">
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
              {/*  ///////////////////////PHOTO////////////////////// */}
              <div className="w-fit flex flex-col my-2 justify-center">
                <label className="text-center text-verdeHover" htmlFor="file">
                  {" "}
                  Photo (.jpg)
                </label>
                <input
                  className="w-full xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro"
                  placeholder=".jpg"
                  type="file"
                  name="file"
                  id="file"
                  accept=".jpg"
                  onChange={(e) => handleFile(e)}
                />
              </div>
              <div className="w-fit flex flex-col my-2 justify-center">
                <label className="text-center text-verdeHover" htmlFor="github">
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
                <label className="text-center text-verdeHover" htmlFor="linkedin">
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
                <label className="text-center text-verdeHover" for="portfolio">
                  PortFolio
                </label>
                <input
                  className="w-full xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro"
                  type="text"
                  name="portfolio"
                  value={input.portfolio}
                  onChange={(e) => handlePortfolio(e)}
                />
              </div>
              {/* /////////////////CV/////////////// */}
              <div className="w-fit flex flex-col my-2 justify-center">
                <label className="text-center text-verdeHover">CV (.pdf)</label>
                <input
                  className="w-full xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro"
                  placeholder=".pdf"
                  type="file"
                  id="file"
                  accept=".pdf"
                  name="file"
                  onChange={(e) => handleCv(e)}
                />
              </div>
            </div>

            <div className="m-9">
              <div className="w-full my-3 flex flex-col m-0 justify-center">
                <label className="text-center text-verdeHover">Technology</label>
                <select
                  className="w-full xl:w-52 rounded-2xl bg-verdeClaro"
                  placeholder="technology"
                  value={input.technologies}
                  name="technology"
                  onChange={(e) => handleSelectTechnology(e)}
                >
                  <option
                    className="rounded-2xl bg-verdeClaro"
                    value=""
                    disabled
                    selected
                  >
                    Tecnologies Selection
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
                <label className="text-center text-verdeHover">Languages</label>
                <select
                  className="w-full xl:w-52 rounded-2xl bg-verdeClaro"
                  placeholder="languages"
                  value={input.languages}
                  name="languages"
                  onChange={(e) => handleLanguage(e)}
                >
                  <option
                    className="rounded-2xl bg-verdeClaro"
                    value=""
                    disabled
                    selected
                  >
                    Languages Selection
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
                <label className="text-center text-verdeHover"> Skill</label>
                <select
                  className="w-full xl:w-52 rounded-2xl bg-verdeClaro"
                  placeholder="skill"
                  value={input.skills}
                  name="skills"
                  onChange={(e) => handleSkill(e)}
                >
                  <option
                    className="rounded-2xl bg-verdeClaro"
                    value=""
                    disabled
                    selected
                  >
                    Skills Selection
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
                  {input.skills?.map((el, i) => (
                    <li
                      className="flex flex-row w-fit list-none m-1 rounded-2xl bg-verdeHover"
                      key={i}
                    >
                      .name                      {el}
                      <button
                        className="rounded-2xl hover:bg-verdeClaro"
                        type="reset"
                        onClick={() => handleDeleteSkills(el)}
                      >
                                                X
                      </button>
                    </li>
                  ))}                </div>
              </div>
              
              <div className="w-full my-3 flex flex-col m-0 justify-center">
                <label className="text-center text-verdeHover">Siniority</label>
                <select
                  className="w-full xl:w-52 rounded-2xl bg-verdeClaro"
                  placeholder="Seniority"
                  value={input.seniority}
                  name="seniority"
                  onChange={(e) => handleSelectSeniority(e)}
                >
                  <option
                    className="rounded-2xl bg-verdeClaro"
                    value=""
                    disabled
                    selected
                  >
                    Seniority Selection
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
                      Name="flex flex-row w-fit list-none m-1 rounded-2xl bg-verdeHover"
                      key={el.id}               >
                      
                      {el}
                      <button
                        className="rounded-2xl hover:bg-verdeClaro"
                        type="reset"
                        ok={() => handleDeleteSeniority(el)}
                      >
                        
                        X
                      </button>
                    </li>
                  ))}
                </div>
              </div>
              <br />

              <div className="w-full my-3 flex flex-col m-0 justify-center">
                <label className="text-center text-verdeHover">Extras</label>
                <textarea
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
                  //onClick={(e)=>fileOnChange(e)}//
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



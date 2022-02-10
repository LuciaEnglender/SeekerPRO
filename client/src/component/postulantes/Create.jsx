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
} from "../../redux/actions/indexP";
import { GrFormClose } from "react-icons/gr";
import validate from "./Validation";
import NavBar from "./NavBar";




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
    photo:{},
    technologies: [],
    languages: [],
    skills: [],
    seniority: [],
    extras: "",
  });
  
  const [myFile,setMyFile]= useState({})

  // const [image,setImage]= useState({})
   const fileOnChange=(e)=>{
     const data= new FormData()
    console.log(e.target.files[0])
    setMyFile(e.target.files[0])
    data.append("photo",myFile)
     console.log(myFile)
    // console.log(e.target.files[0])
   }
  // const sendImage=(e)=>{
    //e.target.files[0]
  //    let formData= new FormData()
  //    formData.append("archivos",image)
  //    createPostulante(formData)
  // }
  

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

  function handleSelectLocation(e) {
    if (input.location.includes(e.target.value)) {
      alert("Already in the list");
    } else {
      setInput({
        ...input,
        location: [...input.location, e.target.value],
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

  /////archivos ////
  /* function onChangeHandle (e){
    setInput({
      ...input,
      [input.photo]: e.target.value,
    })
  } */

  function handleSubmit(e) {
    e.preventDefault();
    alert("Congrats!");

    dispatch(createPostulante(input))
    setInput({
      name: "",
      phone: "",
      location:[],
      gender: "",
      github: "",
      linkedIn: "",
      portfolio: "",
      photo:"",
      CV: "",
      technologies: [],
      languages: [],
      skills: [],
      seniority: [],
      extras: "",
    });
    navigate(-1);
  }
  
  useEffect(() => {
    dispatch(getSkill());
    dispatch(getTechnology());
    dispatch(getLanguage());
    dispatch(getSeniority());
    dispatch(getLocation());
   
  }, []);

  return (
    <div className="bg-verdeOscuro w-screen h-screen ">
      <div>
        <NavBar />
      </div>
      <div className=" flex m-3  rounded-2xl justify-center">
        <div className="w-auto flex  m-0 rounded-2xl justify-center">
          <form 
          action="/postulant" method="post"
          enctype="multipart/form-data"
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
              <br />
              <div className="w-full my-3 flex flex-col m-0 justify-center">
                <label className="text-center">Location</label>
                <select
                  className="w-full xl:w-52 rounded-2xl bg-verdeClaro"
                  placeholder="location"
                  value={input.location}
                  name="location"
                  onChange={(e) => handleSelectLocation(e)}
                >
                  <option
                    className="rounded-2xl bg-verdeClaro"
                    selected="false"
                    disabled
                  >
                    
                    Selecction Location
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
               <div className="w-fit flex flex-col my-2 justify-center">
                <label className="text-center"> Photo</label>
                <input
                  className="w-full xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro"
                  placeholder="photo"
                  type="file"
                  name="photo"
                  onChange={(e)=>fileOnChange(e)}
                />
                {/*<button onClick={sendImage}>Upload</button>*/}
              </div> 
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



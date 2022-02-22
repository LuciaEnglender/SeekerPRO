// /* import React from "react";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   editProfile,
//   getTechnology,
//   getSkill,
//   getLanguage,
//   getSeniority,
//   getLocation,
// } from "../../redux/actions/indexP";
// import { GrFormClose } from "react-icons/gr";
// //import validate from "./Validation";
// import NavBar from "./NavBar";
// import { useAuth0 } from "@auth0/auth0-react";
// import { getUsers } from "../../redux/actions/indexL";

// export default function EditProfile() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const tecno = useSelector((state) => state.rootReducerPostulante.technology);
//   const habilidades = useSelector((state) => state.rootReducerPostulante.skill);
//   const lenguaje = useSelector((state) => state.rootReducerPostulante.language);
//   const experiencia = useSelector(
//     (state) => state.rootReducerPostulante.seniority
//   );
//   const locat = useSelector((state) => state.rootReducerPostulante.location);

//   const profileState = useSelector(
//     (state) => state.rootReducerPostulante.profile[0]
//   );
//   const id = useSelector((state) => state.rootReducerPostulante.profile[0].id);
//   /*  console.log("profile:", profileState) */
//   const { user } = useAuth0();
//   const email = JSON.stringify(user.email);
//   const email2 = email.substring(1, email.length - 1);

//   const [input, setInput] = useState({
//     id: profileState.id,
//     name: profileState.name,
//     phone: profileState.phone,
//     locations: profileState.location,
//     gender: profileState.gender,
//     github: profileState.github,
//     linkedIn: profileState.linkedIn,
//     portfolio: profileState.porfolio,
//     // CV:profileState.cv,
//     // file:profileState.file,
//     technologies: profileState.technologies,
//     languages: profileState.languages,
//     skills: profileState.skills,
//     seniorities: profileState.seniority,
//     extras: profileState.extras,
//     //loginId:id,
//   });

//   function handleChange(e) {
//     setInput({
//       ...input,
//       [e.target.name]: e.target.value,
//     });
//   }
//   const handleFile = (e) => {
//     setInput({
//       ...input,
//       file: e.target.files[0],
//     });
//   };

//   const handleCv = (e) => {
//     setInput({
//       ...input,
//       CV: e.target.files[0],
//     });
//     console.log(e.target.files);
//   };

//   function handleGithub(e) {
//     setInput({
//       ...input,
//       github: e.target.value,
//     });
//   }

//   function handleLinkedIn(e) {
//     setInput({
//       ...input,
//       linkedIn: e.target.value,
//     });
//   }

//   function handlePortfolio(e) {
//     setInput({
//       ...input,
//       portfolio: e.target.value,
//     });
//   }

//   function handleSelectTechnology(e) {
//     if (input.technologies.includes(e.target.value)) {
//       alert("Already in the list");
//     } else {
//       setInput({
//         ...input,
//         technologies: [...input.technologies, e.target.value],
//       });
//     }
//   }

//   function handleLanguage(e) {
//     if (input.languages.includes(e.target.value)) {
//       alert("Already in the list");
//     } else {
//       setInput({
//         ...input,
//         languages: [...input.languages, e.target.value],
//       });
//     }
//   }

//   function handleSkill(e) {
//     if (input.skills.includes(e.target.value)) {
//       alert("Already in the list");
//     } else {
//       setInput({
//         ...input,
//         skills: [...input.skills, e.target.value],
//       });
//     }
//   }

//   function handleSelectSeniority(e) {
//     if (input.seniority.includes(e.target.value)) {
//       alert("Already in the list");
//     } else {
//       setInput({
//         ...input,
//         seniority: [e.target.value],
//       });
//     }
//   }

//   function handleSelectLocation(e) {
//     if (input.location.includes(e.target.value)) {
//       alert("Already in the list");
//     } else {
//       setInput({
//         ...input,
//         location: [e.target.value],
//       });
//     }
//   }

//   function handleExtra(e) {
//     setInput({
//       ...input,
//       [e.target.name]: e.target.value,
//     });
//   }

//   function handleLanguage(e) {
//     if (input.languages.includes(e.target.value)) {
//       alert("Already in the list");
//     } else {
//       setInput({
//         ...input,
//         languages: [...input.languages, e.target.value],
//       });
//     }
//   }

//   const handleDelete = (e) => {
//     setInput({
//       ...input,
//       technologies: input.technologies.filter((el) => el !== e),
//     });
//   };

//   const handleDeleteLanguage = (e) => {
//     setInput({
//       ...input,
//       languages: input.languages.filter((el) => el !== e),
//     });
//   };
//   const handleDeleteSkills = (e) => {
//     setInput({
//       ...input,
//       skills: input.skills.filter((el) => el !== e),
//     });
//   };

//   const handleDeleteSeniority = (e) => {
//     setInput({
//       ...input,
//       seniority: input.seniority.filter((el) => el !== e),
//     });
//   };

//   const handleDeleteLocation = (e) => {
//     setInput({
//       ...input,
//       location: input.location.filter((el) => el !== e),
//     });
//   };

//   function handleCheck(e) {
//     if (e.target.checked) {
//       setInput({
//         ...input,
//         gender: e.target.value,
//       });
//     } else {
//       setInput({
//         ...input,
//         gender: input.gender.filter((g) => g !== e.target.value),
//       });
//     }
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     dispatch(editProfile(id, input));
//     navigate("/homep");
//   }
//   useEffect(() => {
//     dispatch(getSkill());
//     dispatch(getTechnology());
//     dispatch(getLanguage());
//     dispatch(getSeniority());
//     dispatch(getLocation());
//     dispatch(getUsers(email2));
//   }, []);
//   return (
//     <div>
//       <div>
//         <NavBar />
//       </div>
//       <form onSubmit={(e) => handleSubmit(e)}>
//         <input
//           type="text"
//           value={input.name}
//           name="name"
//           onChange={(e) => handleChange(e)}
//         />
//         <label className="text-center"> Phone</label>
//         <input
//           className="w-full xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro"
//           type="number"
//           value={input.phone}
//           name="phone"
//           onChange={(e) => handleChange(e)}
//         />
//         {/*gender*/}
//         <div className="w-44 flex flex-col my-2 justify-center">
//           <label className="text-center">Gender:</label>
//           <label className="text-center">
//             <input
//               className="text-center"
//               value="Femenine"
//               type="radio"
//               id="cbox1"
//               name="check"
//               onChange={(e) => handleCheck(e)}
//             />
//             Feminine
//           </label>
//           <label className="text-center" htmlFor="cbox2">
//             <input
//               value="Masculine"
//               type="radio"
//               id="cbox2"
//               name="check"
//               onChange={(e) => handleCheck(e)}
//             />
//             Masculine
//           </label>
//           <label className="text-center" htmlFor="cbox2">
//             <input
//               value="non-binary"
//               type="radio"
//               id="cbox3"
//               name="check"
//               onChange={(e) => handleCheck(e)}
//             />
//             Non-Binary
//           </label>
//           <label className="text-center" htmlFor="cbox2">
//             <input
//               value="Other"
//               type="radio"
//               name="check"
//               id="cbox4"
//               onChange={(e) => handleCheck(e)}
//             />
//             Other
//           </label>
//         </div>

//         <div className="w-fit flex flex-col my-2 justify-center">
//           <label className="text-center" htmlFor="github">
//             GitHub:
//           </label>
//           <input
//             className="w-full xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro"
//             type="text"
//             value={input.github}
//             name="github"
//             onChange={(e) => handleGithub(e)}
//           />
//         </div>
//         <div className="w-fit flex flex-col my-2 justify-center">
//           <label className="text-center" htmlFor="linkedin">
//             LinkedIn:
//           </label>
//           <input
//             className="w-full xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro"
//             value={input.linkedIn}
//             type="text"
//             name="linkedin"
//             onChange={(e) => handleLinkedIn(e)}
//           />
//         </div>
//         <div className="w-fit flex flex-col my-2 justify-center">
//           <label className="text-center" for="portfolio">
//             PortFolio
//           </label>
//           <input
//             className="w-full xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro"
//             type="text"
//             name="portfolio"
//             value={input.portfolio}
//             onChange={(e) => handlePortfolio(e)}
//           />
//         </div>

//         {/*LANGUAGES*/}

//         {/*BOTON SUBMIT*/}
//         <div className="w-full  my-3 flex m-0 justify-center">
//           <button
//             className=" w-32 shadow-lg shadow-black rounded-2xl text-verdeHover bg-verdeOscuro hover:bg-verdeClaro"
//             type="submit"
//             //onClick={(e)=>fileOnChange(e)}//
//           >
//             Modificar perfil
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
//  */ */*/ */

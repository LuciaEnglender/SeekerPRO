import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FiltroDinamico from "./Assets/FiltroDinamico";
import { getProfile, getVacancy } from "../../redux/actions/indexP";
//import prueba from "../postulantes/Styles/Imagenes/Lenguajes.png";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
//Componentes
import MiPerfil from "./MiPerfil";
import Pagination from "./Paginado";
import Vacancy from "./Vacancy";
import BusinessCard from '../postulantes/FollowBusiness/BusinessCard'
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
import { useAuth0 } from "@auth0/auth0-react";

//import Business from './FollowBusiness/Business'
//import Postulations from "../postulantes/MyPostulations/Postulations";

export default function Home() {
  const dispatch = useDispatch();

  const filtradas = useSelector(
    (state) => state.rootReducerPostulante.filteredVacancy);
  

  //Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const vacancyPerPage = 3;
  const numbersOfLastVac = currentPage * vacancyPerPage;
  const numberOfFirtsVac = numbersOfLastVac - vacancyPerPage;
  const currentVacancy = filtradas.slice(numberOfFirtsVac, numbersOfLastVac);
  const pageMax = filtradas.length / 3

  console.log("current", currentVacancy)
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const perfil = useSelector((state) => state.rootReducerPostulante.profile);
  
  const { user, isAuthenticated } = useAuth0();

  const email = JSON.stringify(user.email);
  const email2 = email.substring(1, email.length - 1);

//Renderizacions todas las vacantes
const handleAll = (e) => {
  dispatch(getVacancy(email2));
  };

  useEffect(() => {
    dispatch(getProfile(email2));   
  }, [dispatch]);


  

  return (
    <div className="absolute bg-gray-300 h-screen w-screen">
      {/* NAVBAR */}
      <div>
        <NavBar />
      </div>

      {/* AREA */}
      <div className="focus:outline-none grid sm:grid-rows-4 grid-cols-4 bg-gray-300  h-auto pt-7">
        {/* MI PERFIL */}
        <div className="bg-gray-300 p-2">
          <div className="bg-verdeMedio rounded-2xl p-2 w-full h-full">        
                <MiPerfil /> 
          </div>
        </div>
        {/* VACAN */}
        <div className="col-span-3 bg-gray-300 p-2">
          <div className=" bg-verdeMedio rounded-2xl p-2 w-full h-full">
            <div className="items-center justify-center grid grid-row-7">
              <div className="grid-span-2 bg-verdeMedio w-fit">
                <div className="flex m-0 justify-center">
                  <h1 className="font-bold text-center text-zinc-400 mb-3"></h1>
                </div>
                {/* SEARCHBAR */}
                <div className=" flex m-0 justify-center">
                  <div className=" flex m-0 justify-center bg-verdeMedio w-fit">
                    <div className="mx-2">
                      <SearchBar />
                    </div>
                  </div>
 </div>
                <FiltroDinamico />
                <div className=" flex m-0 justify-center">           
                       <button
                      className="h-fit  mx-4 px-2 shadow-lg mt-1 shadow-black rounded-2xl text-verdeHover bg-verdeOscuro hover:bg-verdeClaro"
                      onClick={(e) => handleAll(e)}
                    >
                      all vacancies{" "}
                    </button> 
                  </div>

              </div>
              <div className="grid-span-4 h-full">
                 {currentVacancy.length === 0 ? (
                  <p className=" font-bold text-center text-zinc-400 my-4 mb-3">Don't wait for opportunities, go for them!</p>
                ) : (
                  <div>        
                    {currentVacancy[0].cuit? 
                                        currentVacancy?.map((el)=> {
                                          return (
                                            <div className="m-4" key={el.id}>
                                            <BusinessCard
                                              id = {el.id}
                                               name={el.name}
                                              description={el.description}
                                              languages={el.languages}                                                                                                                                                                                                                                                         />
                                          </div>
                                          )
                                        })
                    
                    : 
                    currentVacancy?.map((el) => {
                      return (
                        <div className="m-4" key={el.id}>
                          <Vacancy
                            id = {el.id}
                             name={el.name}
                            description={el.description}
                            languages={el.languages
                              ?.map((l) => l.name)
                              .join(", ")}
                            seniorities={el.seniorities
                              ?.map((s) => s.name)
                              .join(", ")}
                            skills={el.skills?.map((sk) => sk.name).join(", ")}
                            technologies={el.technologies
                              ?.map((t) => t.name)
                              .join(", ")}
                          />
                        </div>
                      );
                    }) 

                    
                    
                    }
                  </div>
                )}
              </div>
              <div className="w-full mt-3 flex justify-center ">
                <button
                  className="m-3 text-zinc-400"
                  onClick={() =>
                    paginado(currentPage === 1 ? currentPage : currentPage - 1)
                  }
                >
                  <AiOutlineArrowLeft />
                </button>
                
                <button
                  className="m-3 text-zinc-400"
                  onClick={() =>
                    paginado( pageMax <= currentPage? currentPage : currentPage + 1)
                  }
                > <AiOutlineArrowRight />
                  
                </button>
                     <h1> 
                      <Pagination
                     vacancyPerPage={vacancyPerPage}
                     filtradas={filtradas}
                     paginado={paginado}
                   />
                   </h1>
                 </div>
             
             
             
             
            </div>
          </div>
        </div>
        {/* CUARTO GRID */}
        {/* <div className="bg-verdeOscuro p-2">
          <div className="bg-verdeMedio rounded-2xl p-2 w-full h-full">
            <h1> Metrics & Trends</h1>
            <div className="flex flex-col m-0 justify-center">
              <img
                className="rounded-xl mt-3 shadow-lg shadow-black"
                src={prueba}
                alt=""
              />
              <p className=" text-center mt-2">Trends in technologies</p>
              <p className=" text-center mt-2">January 2022</p>
            </div>
            <div className="flex flex-col m-0 justify-center">
              <img
                className="rounded-xl mt-3 shadow-lg shadow-black"
                src={prueba}
                alt=""
              />
              <p className=" text-center mt-2">Trends in soft-skills</p>
              <p className=" text-center mt-2">January 2022</p>
            </div>
          </div>
        </div> */}
        {/* SPAN */}
        <div></div>
        <div></div>
      </div>
    </div>
  );
}



/*  const [postulaciones, setPostulaciones] = useState(false);
  function handlePostulations() {
    setPostulaciones(!postulaciones);
  }
  const [empresas, setEmpresas] = useState(false);
  function handleEmpresas() {
    setEmpresas(!empresas);
  }
*/

/*              <div className="flex m-0 justify-center">
              <div>
              {postulaciones === false ? 
                   <> <button 
                    className="h-fit mx-4 px-2  my-2 shadow-lg mt-1 shadow-black rounded-2xl 
                    text-verdeHover bg-verdeOscuro hover:bg-verdeClaro"
                    onClick = {()=> handlePostulations()}> my applies </button>  
                    </> :           
                     <><button 
                  className="h-fit mx-4 px-2  my-2 mt-1 shadow-lg shadow-black rounded-2xl 
                  text-verdeHover bg-verdeOscuro hover:bg-verdeClaro"
                  onClick = {()=>handlePostulations()}>see less</button>   
                <div>  <Postulations/> </div></>}

              </div>
              <div>
              {empresas === false ? 
                   <> <button 
                    className="h-fit mx-4   my-2 px-2  shadow-lg mt-1 shadow-black rounded-2xl 
                    text-verdeHover bg-verdeOscuro hover:bg-verdeClaro"
                    onClick = {()=> handleEmpresas()}> followed business </button>  
                    </> :           
                     <><button 
                  className="h-fit mx-4 my-2 px-2  mt-1 shadow-lg shadow-black rounded-2xl 
                  text-verdeHover bg-verdeOscuro hover:bg-verdeClaro"
                  onClick = {()=>handleEmpresas()}>see less</button>   
                <div>  <Business/> </div></>}
              </div>
              </div>
*/
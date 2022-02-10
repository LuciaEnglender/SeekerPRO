import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FiltroDinamico from "./Assets/FiltroDinamico";
import { getVacancy } from "../../redux/actions/indexP";
//import prueba from "../postulantes/Styles/Imagenes/Lenguajes.png";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
//Componentes
import Postulations from "../postulantes/MyPostulations/Postulations";
import MiPerfil from "./MiPerfil";
import Pagination from "./Paginado";
import Vacancy from "./Vacancy";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
import Business from './FollowBusiness/Business'

export default function Home() {
  const dispatch = useDispatch();

  const filtradas = useSelector(
    (state) => state.rootReducerPostulante.filteredVacancy
  );

  //Renderizacions postulaciones
  const [postulaciones, setPostulaciones] = useState(false);
  function handlePostulations() {
    setPostulaciones(!postulaciones);
  }

  const handleAll = (e) => {
    dispatch(getVacancy());
  };

  //Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const vacancyPerPage = 3;
  const numbersOfLastVac = currentPage * vacancyPerPage;
  const numberOfFirtsVac = numbersOfLastVac - vacancyPerPage;
  const currentVacancy = filtradas.slice(numberOfFirtsVac, numbersOfLastVac);
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    
  }, [dispatch]);

  return (
    <div className="absolute bg-verdeOscuro h-screen w-screen">
      {/* NAVBAR */}
      <div>
        <NavBar />
      </div>

      {/* AREA */}
      <div className="focus:outline-none grid sm:grid-rows-4 grid-cols-4 bg-verdeOscuro  h-auto pt-7">
        {/* MI PERFIL */}
        <div className="bg-verdeOscuro p-2">
          <div className="bg-verdeMedio rounded-2xl p-2 w-full h-full">
            {postulaciones === false ? 
            <> <button 
             className="h-fit  px-2  mt-1 shadow-black rounded-2xl 
             text-verdeHover bg-verdeOscuro hover:bg-verdeClaro"
             onClick = {()=> handlePostulations()}>POSTULATIONS</button> 
             <MiPerfil /> </> :
            <><button 
            className="h-fit  px-2  mt-1 shadow-black rounded-2xl 
            text-verdeHover bg-verdeOscuro hover:bg-verdeClaro"
            onClick = {()=>handlePostulations()}>MY PROFILE</button>   
          <div>  <Postulations/>  <Business/> </div></>}
          </div>
        </div>
        {/* VACAN */}
        <div className="col-span-3 bg-verdeOscuro p-2">
          <div className=" bg-verdeMedio rounded-2xl p-2 w-full h-full">
            <div className="items-center justify-center grid grid-row-7">
              <div className="grid-span-2 bg-verdeMedio w-fit">
                <div className="flex m-0 justify-center">
                  <h1 className="font-bold text-center mb-3">Opportunities!</h1>
                </div>
                {/* SEARCHBAR */}
                <div className=" flex m-0 justify-center">
                  <div className=" flex m-0 justify-center bg-verdeMedio w-fit">
                    <div className="mx-2">
                      <SearchBar />
                    </div>
                    
                    <button
                      className="h-fit  px-2 shadow-lg mt-1 shadow-black rounded-2xl text-verdeHover bg-verdeOscuro hover:bg-verdeClaro"
                      onClick={(e) => handleAll(e)}
                    >
                      all vacancies{" "}
                    </button>
                  </div>
                </div>
                <FiltroDinamico />
              </div>
              <div className="grid-span-4 h-full">
                {currentVacancy.length === 0 ? (
                  <p className=" font-bold text-center mb-3">Don't wait for opportunities, go for them!</p>
                ) : (
                  <div>
                    {currentVacancy?.map((el) => {
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
                    })}
                  </div>
                )}
              </div>
              <div className="w-full mt-3 flex justify-center">
                <button
                  className="m-3"
                  onClick={() =>
                    paginado(currentPage === 1 ? currentPage : currentPage - 1)
                  }
                >
                  <AiOutlineArrowLeft />
                </button>
                <button
                  className="m-3"
                  onClick={() =>
                    paginado(currentPage === 3 ? currentPage : currentPage + 1)
                  }
                >
                  <AiOutlineArrowRight />
                </button>
                <Pagination
                  vacancyPerPage={vacancyPerPage}
                  filtradas={filtradas}
                  paginado={paginado}
                />
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

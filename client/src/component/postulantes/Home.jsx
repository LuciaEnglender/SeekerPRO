import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FiltroDinamico from "./Assets/FiltroDinamico";
import {
  getProfile,
  getBusiness,
  getVacancy,
  clearBusiness,
  getFollowed,
  sort,
} from "../../redux/actions/indexP";
//Componentes
import MiPerfil from "./MiPerfil";
import Pagination from "./Paginado";
import Vacancy from "./Vacancy";
import BusinessCard from "../postulantes/FollowBusiness/BusinessCard";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const dispatch = useDispatch();

  const filtradas = useSelector(
    (state) => state.rootReducerPostulante.filteredVacancy
  );

  //Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const vacancyPerPage = 100;
  const numbersOfLastVac = currentPage * vacancyPerPage;
  const numberOfFirtsVac = numbersOfLastVac - vacancyPerPage;
  const currentVacancy = filtradas.slice(numberOfFirtsVac, numbersOfLastVac);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const perfil = useSelector((state) => state.rootReducerPostulante.profile);

  const { user, isAuthenticated } = useAuth0();

  const email = JSON.stringify(user.email);
  const email2 = email.substring(1, email.length - 1);

  //Renderizacions todas las vacantes
  const handleAll = (e) => {
    dispatch(clearBusiness());
    dispatch(getVacancy());
  };

  //Renderizacion de todas las empresas
  const business = useSelector((state) => state.rootReducerPostulante.business);
  const handleAllBusiness = (e) => {
    e.preventDefault();
    dispatch(getBusiness());
    dispatch(getFollowed);
  };

  useEffect(() => {
    dispatch(getProfile(email2));
  }, []);

  useEffect(() => {
  }, [MiPerfil,perfil]);

  //Ordenamiento de las vacantes
  const [, setOrden] = useState("Default");
  function handleSort(e) {
    e.preventDefault();
    dispatch(sort(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  }
  return (
    <div className="min-h-full bg-verdeOscuro">
      {/* NAVEGACION */}
      <NavBar />
      {/* BODY */}

      <header className=" shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 bg-verdeOscuro sm:px-6 lg:px-8"></div>
      </header>
      <main>
        <div className="bg-verdeOscuro max-w-7xl mx-auto sm:px-6 lg:px-8">
          {/* !!!!!!!!!! DE ACA PARA ABAJO CSS !!!!!!!! */}
          {/* AREA */}
          <div className="focus:outline-none flex bg-verdeOscuro w-full  md:h-full">
            {/* MI PERFIL */}
            <div className="bg-verdeOscuro rounded-2xl px-6 md:p-2 md:w-96">
              <div className="bg-nuevoFondo rounded-2xl  md:p-2 w-full md:h-full">
                <MiPerfil />
              </div>
            </div>
            {/* VACAN */}
            <div className="w-full md:px-2">
              <div className=" bg-nuevoFondo rounded-2xl p-2 w-full h-full">
                <div className="items-center justify-center grid grid-row-7">
                  <div className="grid-span-2 bg-nuevoFondo w-full">
                    {/* SEARCHBAR */}
                    <div className=" flex m-0 justify-center">
                      <div className=" flex m-0 justify-center bg-nuevoFondo w-fit">
                        <div className="mx-2">
                          <SearchBar />
                        </div>
                      </div>
                    </div>
                    <FiltroDinamico />
                    <div className=" flex  flex-wrap m-0 justify-center">
                      <button
                        className="h-fit hover:text-black mx-4 px-2 shadow-lg mt-1 shadow-black rounded-2xl text-white bg-verdeOscuro hover:bg-verdeClaro"
                        onClick={(e) => handleAll(e)}
                      >
                        All vacancies{" "}
                      </button>
                      <button
                        className="h-fit hover:text-black mx-4 px-2 shadow-lg mt-1 shadow-black rounded-2xl text-white bg-verdeOscuro hover:bg-verdeClaro"
                        onClick={(e) => handleAllBusiness(e)}
                      >
                        All business{" "}
                      </button>

                      <select
                        className="h-fit hover:text-black  mx-4 px-2 shadow-lg mt-1 shadow-black rounded-2xl text-white bg-verdeOscuro hover:bg-verdeClaro"
                        onChange={(e) => handleSort(e)}
                      >
                        <option value="default"> Sort by.. </option>
                        <option value="az"> A-Z</option>
                        <option value="za"> Z-A </option>
                        <option value="old"> Older </option>
                        <option value="new"> Recently </option>
                      </select>
                    </div>
                  </div>
                  <div className="grid-span-4 mt-3 border-t-2 border-b-2 border-solid border-slate-900 no-scrollbar overflow-scroll h-96">
                    {currentVacancy.length === 0 ? (
                      <p className=" font-bold text-center text-white my-4 mb-3">
                        Don't wait for opportunities, go for them!
                      </p>
                    ) : (
                      <div>
                        {business.length > 0
                          ? business?.map((el) => {
                              return (
                                <div className="m-4" key={el.id}>
                                  <BusinessCard
                                    id={el.id}
                                    name={el.name}
                                    description={el.description}
                                    location={el.location}
                                  />
                                </div>
                              );
                            })
                          : currentVacancy[0].cuit
                          ? currentVacancy?.map((el) => {
                              return (
                                <div className="m-4" key={el.id}>
                                  <BusinessCard
                                    id={el.id}
                                    name={el.name}
                                    description={el.description}
                                    location={el.location}
                                  />
                                </div>
                              );
                            })
                          : currentVacancy?.map((el) => {
                              return (
                                <div className="m-4" key={el.id}>
                                  <Vacancy
                                    id={el.id}
                                    name={el.name}
                                    description={el.description}
                                    languages={el.languages
                                      ?.map((l) => l.name)
                                      .join(", ")}
                                    seniorities={el.seniorities
                                      ?.map((s) => s.name)
                                      .join(", ")}
                                    skills={el.skills
                                      ?.map((sk) => sk.name)
                                      .join(", ")}
                                    technologies={el.technologies
                                      ?.map((t) => t.name)
                                      .join(", ")}
                                    business={el.businesses[0]?.name}
                                    businessId={el.businessId}
                                    date={
                                      el.createdAt ? el.createdAt : "No Data"
                                    }
                                    vacancies={el.vacancies}
                                  />
                                </div>
                              );
                            })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /End replace */}
        </div>
      </main>
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

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavHomeE from "./modules/NavHomeE";
import { getVacancy, getProfile } from "../../redux/actions";
import CardVacante from "./modules/CardVacante";
import Pagination from "./Pagination";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useAuth0 } from "@auth0/auth0-react";
import { getUsers } from "../../redux/actions/indexL";
import SearcHome from "./modules/SearcHome";
import SideBar from "./modules/SideBar";
import SideBarVacancies from "./modules/SideBarVacancies";

const HomeEmpresa = () => {
  const dispatch = useDispatch();
  const empresa = useSelector((state) => state.rootReducer.business);
  const vacancy = useSelector((state) =>
    state.rootReducer.vacancies.map((v) =>
      v.businessId === empresa[0].id ? v : null
    )
  );
  const { user } = useAuth0();
  const [open, setOpen] = useState(false);
  const [isopen, setisOpen] = useState(false);

  const [openVac, setOpenVac] = useState(false);
  const [isopenVac, setisOpenVac] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const vacancyPerPage = 10;
  const numbersOfLastVac = currentPage * vacancyPerPage;
  const numberOfFirtsVac = numbersOfLastVac - vacancyPerPage;
  const currentVacancy = vacancy.slice(numberOfFirtsVac, numbersOfLastVac);
  const pageMax = vacancy.length / 10;

  const email = JSON.stringify(user.email);
  const email2 = email.substring(1, email.length - 1);

  useEffect(() => {
    dispatch(getProfile(email2));
    dispatch(getVacancy(email2));
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVacancy(email2));
  }

  return (
    <div className="min-h-full">
      {/* NAVEGACsION */}
      <NavHomeE />
      {/* BODY */}
      <header className="bg-verdeOscuro shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">{empresa[0]?.name}</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto bg-verdeOscuro sm:px-6 lg:px-8">
          {/* !!!!!!!!!! CSS DE ACA PARA ABAJO !!!!!!!!!!!!! */}
          <div className="focus:outline-none grid  grid-cols-3 bg-verdeOscuro h-auto ">
            {/* AREA DE CREACION */}
            {/* AREA DE VACANTES */}
            <div className="col-span-4  bg-verdeOscuro p-2 mr-16">
              <div className=" bg-nuevoFondo rounded-2xl p-2 w-full h-full ">
                <div className=" items-center justify-center ">
                  <h1 className=" font-bold text-center text-white pt-2 mb-4">
                    Vacancies
                  </h1>
                  <hr />
                  <div className="flex m-0 justify-center">
                    <button
                      className=" w-32 shadow-lg shadow-black rounded-2xl text-grisBoton bg-gray-300 hover:bg-verdeClaro m-2 px-2"
                      onClick={() => {
                        setOpen(true);
                        setisOpen(true);
                      }}
                    >
                      Filters
                    </button>
                    {isopen && <SideBar open={open} setOpen={setOpen} />}
                    <button
                      className=" w-32 shadow-lg shadow-black rounded-2xl text-grisBoton font-semibold bg-gray-300 hover:bg-verdeClaro m-2 px-2"
                      onClick={() => {
                        setOpenVac(true);
                        setisOpenVac(true);
                      }}
                    >
                      Post vacancy
                    </button>
                    {isopenVac && (
                      <SideBarVacancies
                        openVac={openVac}
                        setOpenVac={setOpenVac}
                      />
                    )}

                    <button
                      className=" w-32 shadow-lg shadow-black rounded-2xl text-grisBoton bg-gray-300 hover:bg-verdeClaro m-2 px-2 "
                      onClick={(e) => handleClick(e)}
                    >
                      All Vacancies
                    </button>
                  </div>
                  <div className="no-scrollbar h-50- overflow-scroll mt-4">
                    {currentVacancy ? (
                      currentVacancy.map((el) => {
                        if (el !== null) {
                          return (
                            <Link to={`/vacancy/${el.id}`}>
                              <CardVacante
                                name={el.name}
                                description={el.description}
                                technologies={el.technologies}
                                seniorities={el.seniorities}
                                languages={el.languages}
                                vacancies={el.vacancies}
                                createdAt={el.createdAt}
                                business={el.businesses[0].name}
                              />
                            </Link>
                          );
                        }
                      })
                    ) : (
                      <h1>Create your own vacancy</h1>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /End replace */}
           {empresa?[0].pro === true && 
        <a href='https://wa.me/5492236826974' target="_blank">       
         <svg
            class="flex justify-end w-10 h-10 text-green-400 fill-current "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512">
          <path
            d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
          ></path>
        </svg> 
        </a>:
        <p>JSeekers</p>
        }
        </div>
       
      </main>
    </div>
  );
};

export default HomeEmpresa;

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
                      className=" w-32 shadow-lg shadow-black rounded-2xl text-grisBoton bg-gray-300 hover:bg-verdeClaro m-2 px-2"
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
        </div>
      </main>
    </div>
  );
};

export default HomeEmpresa;

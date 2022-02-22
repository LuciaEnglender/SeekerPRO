import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavHomeE from "./modules/NavHomeE";
import { getVacancy , getProfile } from "../../redux/actions";
import CardVacante from "./modules/CardVacante";
import Pagination from "./Pagination";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useAuth0 } from "@auth0/auth0-react";
import { getUsers } from "../../redux/actions/indexL";
import SearcHome from "./modules/SearcHome";

const HomeEmpresa = () => {
  const dispatch = useDispatch();
  const empresa = useSelector((state) => state.rootReducer.business);
  console.log(empresa)
  const vacancy = useSelector((state) => state.rootReducer.vacancies.map(v => v.businessId === empresa[0].id? v : null));
  console.log('soy el home', vacancy);
  const { user } = useAuth0();

  const [currentPage, setCurrentPage] = useState(1);
  const vacancyPerPage = 10;
  const numbersOfLastVac = currentPage * vacancyPerPage;
  const numberOfFirtsVac = numbersOfLastVac - vacancyPerPage;
  const currentVacancy = vacancy.slice(numberOfFirtsVac, numbersOfLastVac);
  const pageMax = vacancy.length / 10;

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const email = JSON.stringify(user.email);
  const email2 = email.substring(1, email.length - 1);


  useEffect(() => {
    dispatch(getProfile(email2))
    dispatch(getVacancy(email2));
  }, [dispatch]);

  return (
    <div className="min-h-full">
      {/* NAVEGACION */}
      <NavHomeE />
      {/* BODY */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Home</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* !!!!!!!!!! CSS DE ACA PARA ABAJO !!!!!!!!!!!!! */}
          <div className="focus:outline-none grid sm:grid-rows-4 grid-cols-3 bg-gray-300 h-auto pt-7">
            {/* AREA DE CREACION */}
            <div className="ml-16">
              <SearcHome />
            </div>
            {/* AREA DE VACANTES */}
            <div className="col-span-2 bg-gray-300 p-2 mr-16">
              <div className=" bg-verdeMedio rounded-2xl p-2 w-full h-full ">
                <div className="lg:grid items-center justify-center ">
                  <h1 className=" font-bold text-center mb-3 pt-2">
                    Vacancys:
                  </h1>
                  <hr />
                  <div className="flex m-0 justify-center">
                    <Link to="/homee/vacante">
                      <button className=" w-32 shadow-lg shadow-black rounded-2xl text-grisBoton bg-gray-300 hover:bg-verdeClaro mt-2">
                        Add Vacancy
                      </button>
                    </Link>
                  </div>
                  <div className="mt-5">
                    {currentVacancy ? (
                      currentVacancy.map((el) => {
                        if(el !== null) {
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
                        );}
                      })
                    ) : (
                      <h1>Crea tu vacante</h1>
                    )}
                  </div>
                </div>
                <div className="w-full mt-3 flex justify-center">
                  <button
                    className="m-3"
                    onClick={() =>
                      paginado(
                        currentPage === 1 ? currentPage : <> {currentPage - 1   }<AiOutlineArrowLeft
                        /> </> 
                      )
                    }
                  >
                    
                  </button>


                  <button
                    className="m-3"
                    onClick={() =>
                      paginado(
                         pageMax <= currentPage ? currentPage : <> {currentPage + 1}  <AiOutlineArrowRight /> </> 
                      )
                    }
                  >
                   
                  </button>
                  <Pagination
                    vacancyPerPage={vacancyPerPage}
                    vacancy={vacancy}
                    paginado={paginado}
                  />
                </div>
              </div>
            </div>
            <div></div>
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
};

export default HomeEmpresa;

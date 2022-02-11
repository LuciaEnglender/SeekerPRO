import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavHomeE from "./modules/NavHomeE";
import { getVacancy } from "../../redux/actions";
import CardVacante from "./modules/CardVacante";
import FormVacancy from "./modules/FormVacancy";
import Pagination from "./Pagination";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useAuth0 } from "@auth0/auth0-react";
import { getUsers } from "../../redux/actions/indexL";

const HomeEmpresa = () => {
  const dispatch = useDispatch();
  const vacancy = useSelector((state) => state.rootReducer.vacancies);
  console.log(vacancy)
  const { user } = useAuth0();

  const [currentPage, setCurrentPage] = useState(1);
  const vacancyPerPage = 3;
  const numbersOfLastVac = currentPage * vacancyPerPage;
  const numberOfFirtsVac = numbersOfLastVac - vacancyPerPage;
  const currentVacancy = vacancy.slice(numberOfFirtsVac, numbersOfLastVac);
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const profileState = useSelector(
    (state) => state.rootReducerLanding.perfiles
  );
  const email = JSON.stringify(user.email);
  const email2 = email.substring(1, email.length - 1);

  useEffect(() => {
    dispatch(getVacancy(email2));
  }, [dispatch, email2]);

  return (
    <div className="bg-verdeOscuro w-screen h-screen">
      <div>
        {/* NAVEGACION */}
        <NavHomeE titulo={"Home"} />
      </div>
      {/* BODY */}
      <div className="focus:outline-none grid sm:grid-rows-4 grid-cols-4 bg-verdeOscuro  h-auto pt-7">
        {/* AREA DE CREACION */}
        <div className="bg-verdeOscuro p-2">
          <div className="bg-verdeMedio rounded-2xl p-2 w-full h-full">
            <h1 className=" font-bold  text-center mb-3">Filtros:</h1>
            <h1 className=" font-bold  text-center mb-3">(in work)</h1>
            <div>
              <div className="w-full flex flex-col m-0 justify-center">
                <label> Buscar:</label>
                <input
                  className="w-full xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro"
                  type="text"
                />
              </div>
              <div className="w-full my-3 flex flex-col m-0 justify-center">
                <label> Tecnologias:</label>
                <select className="w-full xl:w-52 rounded-2xl bg-verdeClaro">
                  <option
                    className="rounded-2xl bg-verdeClaro"
                    selected="false"
                  >
                    -
                  </option>
                </select>
              </div>
              <div className="w-full my-3 flex flex-col m-0 justify-center">
                <label> Lenguaje:</label>
                <select className="w-full xl:w-52 rounded-2xl bg-verdeClaro">
                  <option selected="false">-</option>
                </select>
              </div>
              <div className="w-full my-3 flex flex-col m-0 justify-center">
                <label> Seniority:</label>
                <select className="w-full xl:w-52 rounded-2xl bg-verdeClaro">
                  <option selected="false">-</option>
                </select>
              </div>
              <div className="w-full  my-3 flex m-0 justify-center">
                <button className=" w-32 shadow-lg shadow-black rounded-2xl text-verdeHover bg-verdeOscuro hover:bg-verdeClaro">
                  -
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* AREA DE VACANTES */}
        <div className="col-span-2 bg-verdeOscuro p-2">
          <div className=" bg-verdeMedio rounded-2xl p-2 w-full h-full">
            <div className="lg:grid items-center justify-center">
              <h1 className=" font-bold text-center mb-3">Vacantes:</h1>
              {currentVacancy ? (
                currentVacancy.map((el) => {
                  return (
                    <Link to={`/vacancy/${el.id}`}>
                      <CardVacante
                        name={el.name}
                        description={el.description}
                        technologies={el.technologies}
                        seniorities={el.seniorities}
                        languages={el.languages}
                      />
                    </Link>
                  );
                })
              ) : (
                <h1>Crea tu vacante</h1>
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
                vacancy={vacancy}
                paginado={paginado}
              />
            </div>
          </div>
        </div>
        {/* AREA DE DATA CUENTA */}
        <div className="bg-verdeOscuro p-2">
          <div className="bg-verdeMedio rounded-2xl p-2 w-full h-full">
            <h1 className=" font-bold  text-center mb-3">Crear:</h1>
            <FormVacancy></FormVacancy>
          </div>
        </div>
        {/* DIV PARA GRID 2BLE */}
        <div></div>
      </div>
    </div>
  );
};

export default HomeEmpresa;

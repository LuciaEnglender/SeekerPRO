import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavHomeE from "./modules/NavHomeE";
import { getVacancy } from "../../redux/actions";
import CardVacante from "./modules/CardVacante";
import Pagination from "./Pagination";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useAuth0 } from "@auth0/auth0-react";
import { getUsers } from "../../redux/actions/indexL";
import SearcHome from "./modules/SearcHome";
import Sidebar from "./modules/Sidebar";
import FormVacancy from "./modules/FormVacancy";

const HomeEmpresa = () => {
  const dispatch = useDispatch();
  const vacancy = useSelector((state) => state.rootReducer.vacancies);
  console.log(vacancy);
  const { user } = useAuth0();

  const [currentPage, setCurrentPage] = useState(1);
  const vacancyPerPage = 3;
  const numbersOfLastVac = currentPage * vacancyPerPage;
  const numberOfFirtsVac = numbersOfLastVac - vacancyPerPage;
  const currentVacancy = vacancy.slice(numberOfFirtsVac, numbersOfLastVac);
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const email = JSON.stringify(user.email);
  const email2 = email.substring(1, email.length - 1);

  useEffect(() => {
    dispatch(getVacancy(email2));
  }, [dispatch]);

  return (
    <div className="flex h-screen">
      {/* BODY */}
      <Sidebar />
      <div className="flex flex-col h-full shadow-2xl w-full ">
        <div className="shadow-2xl drop-shadow-xl">
          <NavHomeE />
        </div>
        {/* AREA DE CREACION */}
        <div className="grid grid-cols-3 h-full w-full p-4 gap-5">
          <div className="grid col-span-2 grid-rows-5 p-4 rounded-xl shadow-2xl drop-shadow-xl bg-colorFondo1">
            <div className=" h-32">
              <SearcHome />
            </div>
            {/* AREA DE VACANTES */}
            <div className="row-span-4 scroll-smooth h-95% rounded-xl no-scrollbar overflow-y-auto bg-colorGris  p-2 ">
              {vacancy ? (
                vacancy.map((el) => {
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
                <h1>No vacancies</h1>
              )}
            </div>
          </div>
          <FormVacancy />
        </div>
      </div>
    </div>
  );
};

export default HomeEmpresa;

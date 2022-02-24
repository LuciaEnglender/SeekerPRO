import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSeeLater } from "../../../redux/actions/indexP";
import SeeLaterCard from "./SeeLaterCard";
import NavBar from "../NavBar";

function SeeLaterVacancies() {
  const postulanteId = useSelector(
    (state) => state.rootReducerPostulante.profile[0].id
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSeeLater(postulanteId));
  }, [dispatch]);
  const pending = useSelector((state) => state.rootReducerPostulante.pending);
  console.log(pending);

  return (
    <div className="min-h-full">
      {/* NAVEGACION */}
      <NavBar />
      {/* BODYsss */}

      <header className="bg-verdeOscuro shadow">
        <div className="max-w-7xl mx-auto bg-verdeOscuro py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold bg-verdeOscuro text-white">
          Saved Vacancies
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="flex flex-col m-0 justify-center p-10 px-20">
            {pending.length === 0 ? (
              <p className=" font-bold text-center my-4 mb-3">There are no vacancies saved yet...</p>
            ) : (
              <div>
                {pending?.map((el) => {
                  return (
                    <div className="m-4" key={el.id}>
                      <SeeLaterCard
                        id={el.id}
                        name={el.name}
                        description={el.description}
                        languages={el.languages?.map((l) => l.name).join(", ")}
                        seniorities={el.seniorities
                          ?.map((s) => s.name)
                          .join(", ")}
                        skills={el.skills?.map((sk) => sk.name).join(", ")}
                        technologies={el.technologies
                          ?.map((t) => t.name)
                          .join(", ")}
                        business={el.businesses[0].name}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
}

export default SeeLaterVacancies;

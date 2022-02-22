import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPostulations } from "../../../redux/actions/indexP";
import PostCard from "../MyPostulations/PostCard";
import NavBar from "../NavBar";

function Postulations() {
  const dispatch = useDispatch();
  const postulations = useSelector((state) => state.rootReducerPostulante.postulations);
  console.log(postulations.vacancies);

  const postulanteId = useSelector(
    (state) => state.rootReducerPostulante.profile[0].id
  );
  // console.log("postulante id", postulanteId)

  useEffect(() => {
    dispatch(getMyPostulations(postulanteId));
  }, []);

  return (
    <div className="min-h-full">
      {/* NAVEGACION */}
      <NavBar />
      {/* BODYsss */}

      <header className="bg-verdeOscuro shadow">
        <div className="max-w-7xl mx-auto bg-verdeOscuro py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold bg-verdeOscuro text-white">
            My applications
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto  py-6 sm:px-6 lg:px-8">
          {/*!!!!!!! DE ACA PARA ABAJO CSS !!!!!!!! */}
          <div className="no-scrollbar overflow-scroll border-y-2 border-gray-700 border-solid h-96">
            {postulations.length === 0 ? (
              <p className=" font-bold text-center mb-3">
                No applies? Search know!
              </p>
            ) : (
              <div className="focus:outline-none bg-verdeOscuro  ">
                {postulations.vacancies?.map((el) => {
                  return (
                    <div className="m-4" key={el.id}>
                      <PostCard
                        id={el.id}
                        name={el.name}
                        business={el.businesses[0].name}
                        description={el.description}
                        languages={el.languages?.map((l) => l.name).join(", ")}
                        seniorities={el.seniorities
                          ?.map((s) => s.name)
                          .join(", ")}
                        technologies={el.technologies
                          ?.map((t) => t.name)
                          .join(", ")}
                          date= {el.createdAt}
                        status={el.status}
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

export default Postulations;

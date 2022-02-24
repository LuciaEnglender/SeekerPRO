import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness, getFollowed } from "../../../redux/actions/indexP";
//import { follow} from '../../../redux/actions/indexP'
import BusinessCard from "./BusinessCard";
import FollowedCard from "./FollowedCard";
import NavBar from "../NavBar";

function Business() {
  const followedBusiness = useSelector(
    (state) => state.rootReducerPostulante.followedBusiness
  );
  //console.log(followedBusiness)
  const business = useSelector((state) => state.rootReducerPostulante.business);
  console.log(business);
  const postulanteId = useSelector(
    (state) => state.rootReducerPostulante.profile[0].id
  );

  const dispatch = useDispatch();

  const handleAllBusiness = (e) => {
    e.preventDefault();
    dispatch(getBusiness());
  };

  useEffect(() => {
    dispatch(getFollowed(postulanteId));
  }, [dispatch]);

  return (
    <div className="min-h-full">
      {/* NAVEGACION */}
      <NavBar />
      {/* BODYsss */}

      <header className="bg-verdeOscuro shadow">
        <div className="max-w-7xl mx-auto bg-verdeOscuro py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold bg-verdeOscuro text-white">
            Bussines Follow
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* !!!!!!!!!! DE ACA PARA ABAJO CSS !!!!!!!! */}
          <div className="no-scrollbar overflow-scroll border-y-2 border-gray-700 border-solid h-96">
            <div className="flex flex-col m-0 justify-center">
              <div>
                {followedBusiness.length === 0 ? (
                  <div>
                    {" "}
                    <p className=" font-bold text-center text-zinc-300 mb-3">
                      In this moment you are not following business. Dont loose
                      time, search now!
                      <button
                        className="h-fit  mx-4 px-2 shadow-lg mt-1 shadow-black rounded-2xl text-verdeHover bg-verdeOscuro hover:bg-verdeClaro"
                        onClick={(e) => handleAllBusiness(e)}
                      >
                        all business{" "}
                      </button>
                    </p>
                    <div className="flex flex-col no-scrollbar overflow-scroll m-0 justify-center">
                      {business.length === 0 ? (
                        <p> No hay empresas disponibles </p>
                      ) : (
                        business?.map((el) => {
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
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    {followedBusiness?.map((el) => {
                      return (
                        <div className="m-4" key={el.id}>
                          <FollowedCard
                            id={el.business_postulant.businessId}
                            name={el.name}
                            description={el.description}
                            location={el.location}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
}

export default Business;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import CardProfile from "./modules/CardProfile";

function PostulantesVacancy({id}) {
  const dispatch = useDispatch();
  const postulados = useSelector((state) => state.rootReducer.postulados);
  const { user } = useAuth0()
  //const { id } = useParams()

  useEffect(() => {
    dispatch(getPostulados(id));
  }, [dispatch]);

  return (
    <div>
      PostulantesVacancy
      <div>
                {postulados ? (
                  postulados.map((el) => {
                    return (
                      <Link to={`/vacancy/${el.id}`}>
                        <CardProfile
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
      </div>
  )
}

export default PostulantesVacancy
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import CardPerfiles from "./modules/CardPerfiles";
import { useAuth0 } from "@auth0/auth0-react";
import {getPostulados} from "../../redux/actions/index"

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
                        <CardPerfiles
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